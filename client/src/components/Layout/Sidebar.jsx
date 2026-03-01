import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaUserTie, FaUser, FaHistory, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

const Sidebar = () => {
    const menuItems = [
        { path: '/', name: 'Home', icon: <FaHome /> },
        { path: '/consult', name: 'Consult', icon: <FaUserTie /> },
        { path: '/profile', name: 'Profile', icon: <FaUser /> },
        { path: '/history', name: 'History', icon: <FaHistory /> },
    ];

    return (
        <div className="h-screen w-64 bg-slate-900/50 backdrop-blur-2xl border-r border-white/5 flex flex-col fixed left-0 top-0 z-50 text-white shadow-2xl transition-all duration-300">
            <div className="p-8 text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-teko tracking-wider">
                STUDENT PRO
            </div>

            <nav className="flex-1 mt-6 px-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink to={item.path} className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative group
                                ${isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`
                            }>
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeGlow"
                                                className="absolute inset-0 border border-indigo-500/30 rounded-xl"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-white'}`}>
                                            {item.icon}
                                        </span>
                                        <span className="font-teko uppercase tracking-widest text-lg">{item.name}</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-8 border-t border-white/5">
                <button className="flex items-center gap-3 text-gray-500 hover:text-red-400 transition-all duration-300 group">
                    <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-teko uppercase tracking-widest text-lg">Exit System</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
