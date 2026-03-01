import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ClientLayout = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false,
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] text-white flex font-inter">
            <Sidebar />
            <main className="flex-1 ml-64 min-h-screen relative overflow-x-hidden">
                {/* Background ambient lighting - Refined */}
                <div className="fixed top-[-10%] left-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
                <div className="fixed bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
                <div className="fixed top-[40%] left-[40%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none z-0" />

                <div className="relative z-10 p-10 min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default ClientLayout;
