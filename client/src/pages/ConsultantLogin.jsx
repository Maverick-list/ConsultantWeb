import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ConsultantLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            if (response.ok) {
                const data = await response.json();
                if (data.user.role === 'admin' || data.user.role === 'consultant') {
                    localStorage.setItem('auth_token', data.token);
                    localStorage.setItem('user_role', data.user.role);
                    localStorage.setItem('user_name', data.user.name);
                    navigate('/admin');
                } else {
                    alert('Access Denied: Not a consultant or admin account.');
                }
            } else {
                const errText = await response.text();
                alert(errText || 'Authentication failed.');
            }
        } catch (error) {
            console.error(error);
            alert('Server error connecting to backend.');
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg bg-slate-900 border border-indigo-500/30 p-10 rounded-[2rem] shadow-[0_0_50px_rgba(79,70,229,0.2)]"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20 shadow-inner">
                        <FaShieldAlt className="text-4xl text-indigo-400" />
                    </div>
                    <h2 className="text-4xl font-bold font-teko tracking-widest text-white uppercase">
                        Consultant Access
                    </h2>
                    <p className="text-gray-500 font-inter mt-2 uppercase text-xs tracking-[0.3em]">
                        Secure Portal Implementation v2.0
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Terminal Identity</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="email"
                                required
                                placeholder="authorized@studentpro.com"
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-sm"
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest ml-1">Access Protocol</label>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-sm"
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-teko text-xl tracking-widest uppercase shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-3 group">
                        Authorize Session <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-800 text-center">
                    <button
                        onClick={() => navigate('/auth')}
                        className="text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors font-bold"
                    >
                        Return to Student Gateway
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ConsultantLogin;
