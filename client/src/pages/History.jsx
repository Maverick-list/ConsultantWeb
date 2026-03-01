import React from 'react';
import { motion } from 'framer-motion';
import { FaHistory, FaCheckCircle, FaClock, FaVideo } from 'react-icons/fa';

const History = () => {
    const historyData = [
        { id: 1, type: 'Video Call', title: 'Consultation with Oxford Mentor', date: 'Feb 1, 2026', status: 'Completed', duration: '45 mins' },
        { id: 2, type: 'AI Chat', title: 'Major Recommendation Session', date: 'Jan 28, 2026', status: 'Completed', duration: '12 mins' },
        { id: 3, type: 'Document Review', title: 'Harvard Essay Feedback', date: 'Jan 22, 2026', status: 'Pending', duration: '-' },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-white flex items-center gap-4">
                <FaHistory className="text-indigo-400" />
                Activities History
            </h1>

            <div className="space-y-4">
                {historyData.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-indigo-500/30 transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-6 flex-1">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                                {item.type === 'Video Call' ? <FaVideo /> : <FaClock />}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400 font-inter">
                                    <span>{item.type}</span>
                                    <span>•</span>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <div className="text-sm text-gray-400 font-inter">Duration</div>
                                <div className="font-bold text-white">{item.duration}</div>
                            </div>

                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${item.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                                }`}>
                                {item.status === 'Completed' ? <FaCheckCircle /> : <FaClock />}
                                {item.status}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {historyData.length === 0 && (
                <div className="text-center py-20 glass-panel rounded-3xl mt-8">
                    <p className="text-gray-400 text-lg">No history available yet.</p>
                </div>
            )}
        </div>
    );
};

export default History;
