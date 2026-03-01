const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findByPk(decoded._id);

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

const isAdmin = async (req, res, next) => {
    if (req.user.role !== 'consultant' && req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Access denied. Consultants only.' });
    }
    next();
};

module.exports = { auth, isAdmin };
