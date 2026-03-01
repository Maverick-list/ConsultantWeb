import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
    const user = {
        name: localStorage.getItem('user_name') || 'Demo Student',
        email: 'student@demo.pro',
        location: 'Jakarta, Indonesia',
        bio: 'Aspiring Computer Science student looking for top universities in USA.',
        avatar: null
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-white">Student Profile</h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 rounded-3xl relative overflow-hidden"
            >
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-5xl shadow-xl border-4 border-white/20">
                        <FaUserCircle className="text-white" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                                <p className="text-indigo-400 font-medium mb-4">Student Account</p>
                            </div>
                            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors text-sm font-semibold border border-white/10">
                                <FaEdit /> Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-3 text-gray-300">
                                <FaEnvelope className="text-indigo-400" />
                                {user.email}
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <FaMapMarkerAlt className="text-indigo-400" />
                                {user.location}
                            </div>
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6">
                            <h3 className="text-lg font-bold text-white mb-2">Short Bio</h3>
                            <p className="text-gray-400 leading-relaxed font-inter">
                                {user.bio}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative background circle */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                    { label: 'Applications', value: '12', color: 'text-blue-400' },
                    { label: 'Consultations', value: '5', color: 'text-purple-400' },
                    { label: 'Study Plans', value: '3', color: 'text-pink-400' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 text-center"
                    >
                        <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
