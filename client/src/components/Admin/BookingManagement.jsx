import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaCheck, FaTimes } from 'react-icons/fa';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const res = await axios.get('http://localhost:5001/api/admin/bookings', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(res.data);
            } catch (err) {
                console.error("Failed to load bookings. Ensure you are logged in as admin/consultant.", err);
            }
        };
        fetchBookings();
    }, []);

    const isSessionActive = (date) => {
        const today = new Date().toISOString().split('T')[0];
        return date === today;
    };

    const handleJoin = (id) => {
        navigate(`/room/${id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl"
        >
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold tracking-wider text-white">Live Consultation Schedule</h3>
                <div className="flex gap-2 text-xs font-inter">
                    <span className="flex items-center gap-1 text-green-400"><span className="w-2 h-2 rounded-full bg-green-400"></span> Confirmed</span>
                    <span className="flex items-center gap-1 text-yellow-400 ml-4"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Pending</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left font-inter">
                    <thead>
                        <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">
                            <th className="pb-4 px-2">Student Profile</th>
                            <th className="pb-4 px-2">Destination</th>
                            <th className="pb-4 px-2 text-center">Date</th>
                            <th className="pb-4 px-2 text-center">Session Status</th>
                            <th className="pb-4 px-2 text-right">Access</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-5 px-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center font-bold text-indigo-400 font-teko">
                                            {((booking.studentName || 'Anon').split(' ').map(n => n[0]).join(''))}
                                        </div>
                                        <div>
                                            <div className="text-white font-bold">{booking.studentName || 'Anonymous'}</div>
                                            <div className="text-gray-400 text-xs">ID-2026-{booking.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-5 px-2">
                                    <div className="text-sm font-medium text-white">{booking.university}</div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <span>{booking.country}</span>
                                    </div>
                                </td>
                                <td className="py-5 px-2 text-center text-sm font-mono text-indigo-300">
                                    {booking.date}
                                </td>
                                <td className="py-5 px-2 text-center">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-5 px-2 text-right">
                                    <button
                                        onClick={() => handleJoin(booking.id)}
                                        disabled={!isSessionActive(booking.date)}
                                        className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${isSessionActive(booking.date)
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                                            : 'bg-white/5 text-gray-500 cursor-not-allowed opacity-50'
                                            }`}
                                    >
                                        <FaVideo /> Join Virtual Room
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default BookingManagement;
