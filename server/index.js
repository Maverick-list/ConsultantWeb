const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const Booking = require('./models/Booking');
const PendingConsultant = require('./models/PendingConsultant');
const User = require('./models/User');
const sequelize = require('./config/db_mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { auth, isAdmin } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Sync Database
sequelize.sync({ alter: true })
    .then(() => console.log('Database connected and synced (SQLite)'))
    .catch((err) => console.log('Error syncing database:', err));

// Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join Room
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room ${roomId}`);
        socket.to(roomId).emit('user_connected', socket.id);
    });

    // WebRTC Signaling
    socket.on('offer', (data) => {
        socket.to(data.roomId).emit('offer', data.offer);
    });

    socket.on('answer', (data) => {
        socket.to(data.roomId).emit('answer', data.answer);
    });

    socket.on('ice_candidate', (data) => {
        socket.to(data.roomId).emit('ice_candidate', data.candidate);
    });

    // Chat in Video Room
    socket.on('send_message', (data) => {
        io.to(data.roomId).emit('receive_message', data);
    });

    // Status
    socket.on('consultant_status_change', (status) => {
        io.emit('status_update', status);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ email, password: hashedPassword, name, role: role || 'student' });
        const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET || 'secret');
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).send('User not found');
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');
        const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET || 'secret');
        res.send({ user, token });
    } catch (e) {
        res.status(500).send();
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const { studentName, university, major, country, date } = req.body;
        const newBooking = await Booking.create({
            studentName: studentName || 'Anonymous Student',
            university,
            major,
            country,
            date
        });

        // Real-time Notification to Admin
        io.emit('new_booking', {
            message: `New booking for ${university} (${country})`,
            data: newBooking
        });

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Admin Routes (Secured)
app.get('/api/admin/analytics', auth, isAdmin, async (req, res) => {
    // Return dummy data for now
    res.send({
        traffic: [400, 300, 550, 800],
        regions: { USA: 40, UK: 30, Australia: 20, Domestic: 60 }
    });
});

app.get('/api/admin/bookings', auth, isAdmin, async (req, res) => {
    const bookings = await Booking.findAll();
    res.send(bookings);
});

// Consultant Approvals
app.get('/api/admin/pending-consultants', auth, isAdmin, async (req, res) => {
    try {
        const pending = await PendingConsultant.findAll();
        res.send(pending);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.post('/api/admin/approve-consultant/:id', auth, isAdmin, async (req, res) => {
    try {
        const pending = await PendingConsultant.findByPk(req.params.id);
        if (!pending) return res.status(404).send('Not found');

        // Update user role in database
        const user = await User.findOne({ where: { email: pending.email } });
        if (user) {
            user.role = 'consultant';
            await user.save();
        }

        await pending.destroy();
        res.send({ message: 'Consultant approved successfully' });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Public/Student routes for onboarding
app.post('/api/consultants/apply', auth, async (req, res) => {
    try {
        const { specialization, yearsExperience } = req.body;
        const application = await PendingConsultant.create({
            fullName: req.user.name,
            email: req.user.email,
            specialization,
            yearsExperience,
            status: 'pending'
        });
        res.status(201).send(application);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
