import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaFileUpload, FaBriefcase } from 'react-icons/fa';

const ConsultantOnboarding = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        specialization: '',
        yearsExperience: '',
        bio: ''
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const token = localStorage.getItem('auth_token');
        if (!token) {
            alert('Please login first to apply.');
            setStatus('idle');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/consultants/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    specialization: formData.specialization,
                    yearsExperience: parseInt(formData.yearsExperience)
                })
            });

            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Failed to submit application');
            }
        } catch (error) {
            console.error(error);
            alert('Submission failed. Make sure you are logged in.');
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 text-center">
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl max-w-md">
                    <h2 className="text-2xl font-bold text-green-400 mb-4">Application Received!</h2>
                    <p className="text-gray-300">Your application to join StudentPro as a consultant is under review. We will contact you shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 flex justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-purple-600 rounded-xl">
                        <FaUserTie className="text-2xl text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">Consultant Registration</h2>
                        <p className="text-gray-400">Join our elite network of academic experts</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-purple-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-purple-500 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Specialization</label>
                        <select
                            name="specialization"
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-purple-500 outline-none"
                            required
                        >
                            <option value="">Select Domain</option>
                            <option value="STEM">STEM (Science, Tech, Engineering)</option>
                            <option value="Arts">Arts & Humanities</option>
                            <option value="Business">Business & Finance</option>
                            <option value="Scholarships">Scholarship Specialist</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Years of Experience</label>
                        <div className="relative">
                            <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="number"
                                name="yearsExperience"
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 px-4 text-white focus:border-purple-500 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Upload CV (PDF)</label>
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:bg-white/5 transition-colors">
                            <FaFileUpload className="mx-auto text-3xl text-gray-500 mb-2" />
                            <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-purple-500/30 transition-all transform active:scale-[0.98]"
                    >
                        {status === 'submitting' ? 'Submitting Application...' : 'Submit Agent Application'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ConsultantOnboarding;
