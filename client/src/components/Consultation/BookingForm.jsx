import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaCalendarAlt, FaUniversity, FaGlobeAmericas, FaBook } from 'react-icons/fa';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        university: '',
        major: '',
        country: '',
        date: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const userName = localStorage.getItem('user_name') || 'Guest User';
            const payload = { ...formData, studentName: userName };
            await axios.post('http://localhost:5001/api/bookings', payload);
            setStatus('success');
            // Reset after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
        >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FaCalendarAlt className="text-purple-500" />
                Book Consultation
            </h3>

            {status === 'success' ? (
                <div className="text-center p-8 bg-green-500/20 border border-green-500/50 rounded-xl">
                    <h4 className="text-xl font-bold text-green-400 mb-2">Booking Confirmed!</h4>
                    <p className="text-gray-300">We have sent a confirmation email. A consultant will contact you shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm ml-1">Destination Country</label>
                        <div className="relative">
                            <FaGlobeAmericas className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            >
                                <option value="" className="bg-gray-900">Select Country</option>
                                <option value="USA" className="bg-gray-900">United States</option>
                                <option value="UK" className="bg-gray-900">United Kingdom</option>
                                <option value="Australia" className="bg-gray-900">Australia</option>
                                <option value="Indonesia" className="bg-gray-900">Indonesia</option>
                                <option value="Japan" className="bg-gray-900">Japan</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm ml-1">Target University</label>
                        <div className="relative">
                            <FaUniversity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <select
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            >
                                <option value="" className="bg-gray-900">Select University</option>
                                <option value="Harvard" className="bg-gray-900">Harvard University</option>
                                <option value="Oxford" className="bg-gray-900">University of Oxford</option>
                                <option value="MIT" className="bg-gray-900">MIT</option>
                                <option value="UI" className="bg-gray-900">Universitas Indonesia</option>
                                <option value="ITB" className="bg-gray-900">ITB</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm ml-1">Interest Major</label>
                        <div className="relative">
                            <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <select
                                name="major"
                                value={formData.major}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            >
                                <option value="" className="bg-gray-900">Select Major</option>
                                <option value="cs" className="bg-gray-900">Computer Science</option>
                                <option value="business" className="bg-gray-900">Business & Management</option>
                                <option value="engineering" className="bg-gray-900">Engineering</option>
                                <option value="arts" className="bg-gray-900">Arts & Design</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-gray-400 text-sm ml-1">Preferred Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-4 pr-4 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
                    </button>
                </form>
            )}
        </motion.div>
    );
};

export default BookingForm;
