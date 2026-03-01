import React from 'react';
import AdminAnalytics from '../components/Admin/AdminAnalytics';
import BookingManagement from '../components/Admin/BookingManagement';
import { FaUserShield } from 'react-icons/fa';

const AdminDashboard = () => {
    return (
        <div className="p-10 max-w-7xl mx-auto">
            <header className="mb-12 flex justify-between items-end border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-5xl font-bold text-white flex items-center gap-4 mb-2">
                        <FaUserShield className="text-indigo-500" />
                        Admin Command Center
                    </h1>
                    <p className="text-gray-400 font-inter max-w-xl">
                        Real-time analytics, global booking management, and consultant oversight system.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold font-teko uppercase tracking-wider transition-all">
                        Refresh Data
                    </button>
                </div>
            </header>

            <AdminAnalytics />

            <div className="mt-4">
                <BookingManagement />
            </div>
        </div>
    );
};

export default AdminDashboard;
