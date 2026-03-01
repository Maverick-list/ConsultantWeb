import React from 'react';
import { motion } from 'framer-motion';
import Globe from '../components/3D/Globe';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div className="h-full flex flex-col justify-center">
            <Helmet>
                <title>StudentPro | AI-Powered Study Consultant</title>
                <meta name="description" content="Connect with expert consultants and AI advisors to plan your academic journey. Study in Indonesia or Abroad with confidence." />
                <meta property="og:title" content="StudentPro - Your Academic Future" />
                <meta property="og:description" content="AI Consultants, 3D Interactive Tools, and Expert Advice." />
            </Helmet>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-aos="fade-down"
                className="text-8xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-teko leading-[0.9] tracking-tight uppercase"
            >
                Unleash Your <br /> Academic Future
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-xl text-gray-400 max-w-2xl mb-10 font-inter leading-relaxed"
            >
                The world's most advanced AI-powered platform for global education. Connect with elite mentors, leverage predictive analytics, and conquer your goals with <span className="text-white font-bold">StudentPro</span>.
            </motion.p>

            <div data-aos="zoom-in" data-aos-delay="400">
                <button
                    onClick={() => window.location.href = '/consult'}
                    className="btn-premium px-12 py-5"
                >
                    Initialize Consultation
                </button>
            </div>

            {/* 3D Globe Section */}
            <div
                className="mt-12 h-[500px] w-full glass-card overflow-hidden relative group"
                data-aos="fade-up"
                data-aos-delay="600"
            >
                <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity">
                    <React.Suspense fallback={<div className="text-center pt-20">Loading 3D Globe...</div>}>
                        <Globe />
                    </React.Suspense>
                </div>
                <div className="absolute bottom-6 left-6 z-10 p-5 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 max-w-sm transform transition-transform group-hover:scale-105">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Global Network
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Connecting you to over 500+ top universities worldwide across USA, UK, Australia, and Asia.
                    </p>
                </div>
            </div>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-20">
                {[
                    {
                        title: "AI Analysis",
                        desc: "Get instant recommendations based on your profile and goals using our advanced AI consultant.",
                        icon: "🤖"
                    },
                    {
                        title: "3D Visualization",
                        desc: "Explore campuses and global opportunities through immersive 3D interactive experiences.",
                        icon: "🌐"
                    },
                    {
                        title: "Expert Mentors",
                        desc: "Schedule calls with real students and consultants currently at your dream universities.",
                        icon: "🎓"
                    }
                ].map((f, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -10 }}
                        className="glass-card p-8 text-left"
                        data-aos="fade-up"
                        data-aos-delay={200 * i}
                    >
                        <div className="text-4xl mb-4">{f.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </section>
        </div>
    );
};

export default Home;
