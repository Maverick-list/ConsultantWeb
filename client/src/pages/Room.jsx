import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoRoom from '../components/Video/VideoRoom';
import ChatInterface from '../components/Consultation/ChatInterface'; // Reusing chat for now, ideally separate logic for P2P
import { io } from 'socket.io-client';

const Room = () => {
    const { bookingId } = useParams();

    return (
        <div className="h-screen p-4 flex gap-4">
            <div className="flex-grow flex flex-col">
                <VideoRoom />
            </div>

            <div className="w-[350px] hidden lg:block bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <h3 className="text-white font-bold mb-4">Session Chat</h3>
                <div className="h-full pb-10">
                    {/* Reusing Chat Interface, simplified. In real app, pass socket room ID */}
                    <div className="h-full overflow-hidden rounded-xl">
                        <iframe
                            srcDoc={`<html><body style="color:white; font-family:sans-serif; text-align:center; padding-top:50px;">Real-time text chat initialized for room: ${bookingId}</body></html>`}
                            className="w-full h-full bg-transparent"
                            title="chat-placeholder"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
