import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import ConsultantStatus from '../3D/ConsultantStatus';

const VideoRoom = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);
    const [peers, setPeers] = useState({});
    const [connectionStatus, setConnectionStatus] = useState("Connecting...");
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    const userVideo = useRef();
    const remoteVideo = useRef();
    const socketRef = useRef();
    const peerRef = useRef();
    const roomId = bookingId || 'general-room';

    const streamRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:5001');

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
            setStream(currentStream);
            streamRef.current = currentStream;
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }

            socketRef.current.emit('join_room', roomId);
            setConnectionStatus("Waiting for consultant...");

            socketRef.current.on('user_connected', (userId) => {
                console.log("User connected: " + userId);
                setConnectionStatus("Consultant connected!");
                callPeer(userId, currentStream);
            });

            socketRef.current.on('offer', async (offer) => {
                setConnectionStatus("Receiving call...");
                answerPeer(offer, currentStream);
            });

            socketRef.current.on('answer', (answer) => {
                if (peerRef.current) {
                    peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
                }
            });

            socketRef.current.on('ice_candidate', (candidate) => {
                if (peerRef.current) {
                    peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                }
            });
        });

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [roomId]);

    const callPeer = (id, stream) => {
        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });

        stream.getTracks().forEach(track => peer.addTrack(track, stream));

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('ice_candidate', { candidate: event.candidate, roomId });
            }
        };

        peer.ontrack = (event) => {
            if (remoteVideo.current) {
                remoteVideo.current.srcObject = event.streams[0];
            }
        };

        peer.createOffer().then(offer => {
            peer.setLocalDescription(offer);
            socketRef.current.emit('offer', { offer, roomId });
        });

        peerRef.current = peer;
    };

    const answerPeer = (offer, stream) => {
        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });

        stream.getTracks().forEach(track => peer.addTrack(track, stream));

        peer.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('ice_candidate', { candidate: event.candidate, roomId });
            }
        };

        peer.ontrack = (event) => {
            if (remoteVideo.current) {
                remoteVideo.current.srcObject = event.streams[0];
            }
        };

        peer.setRemoteDescription(new RTCSessionDescription(offer));
        peer.createAnswer().then(answer => {
            peer.setLocalDescription(answer);
            socketRef.current.emit('answer', { answer, roomId });
        });

        peerRef.current = peer;
    };

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
            setIsMuted(!stream.getAudioTracks()[0].enabled);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
            setIsVideoOff(!stream.getVideoTracks()[0].enabled);
        }
    };

    const leaveCall = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        navigate('/');
    };

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${connectionStatus.includes("connected") ? "bg-green-500" : "bg-yellow-500"}`}></span>
                    {connectionStatus}
                </h2>
                <div className="flex items-center gap-4">
                    <span className="text-gray-300 text-sm">Consultant Status:</span>
                    <ConsultantStatus status={connectionStatus.includes("connected") ? 'online' : 'offline'} />
                </div>
            </div>

            <div className="flex-1 flex gap-4 relative">
                {/* Remote Video (Main) */}
                <div className="flex-1 bg-black/50 rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
                    <video ref={remoteVideo} autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded-lg">
                        Consultant
                    </div>
                </div>

                {/* Local Video (Floating) */}
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-black/80 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl">
                    <video ref={userVideo} muted autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-0.5 rounded">
                        You
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 py-4">
                <button onClick={toggleMute} className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-all shadow-lg`}>
                    {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
                <button onClick={toggleVideo} className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-all shadow-lg`}>
                    {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                </button>
                <button onClick={leaveCall} className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg">
                    <FaPhoneSlash />
                </button>
            </div>
        </div>
    );
};

export default VideoRoom;
