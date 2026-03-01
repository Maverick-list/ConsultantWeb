import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

const GlobeMesh = () => {
    const mesh = useRef();

    useFrame(() => {
        mesh.current.rotation.y += 0.002;
    });

    return (
        <group>
            {/* Main Globe */}
            <Sphere ref={mesh} args={[1, 64, 64]} scale={2}>
                <meshStandardMaterial
                    color="#1e1b4b"
                    wireframe={true}
                    transparent={true}
                    opacity={0.3}
                    emissive="#4f46e5"
                    emissiveIntensity={0.5}
                />
            </Sphere>

            {/* Core Glow */}
            <Sphere args={[0.9, 32, 32]} scale={2}>
                <meshBasicMaterial color="#000000" />
            </Sphere>

            {/* Points of Interest - Simulated Cities */}
            <group rotation={[0, 0, Math.PI / 6]}>
                <mesh position={[2, 0, 0]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color="#00ff00" />
                </mesh>
                <mesh position={[-1.8, 0.5, 0.5]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color="#00ff00" />
                </mesh>
                <mesh position={[0.5, 1.8, -0.5]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshBasicMaterial color="#ff00ff" />
                </mesh>
            </group>
        </group>
    );
};

const Globe = () => {
    return (
        <div className="w-full h-full relative z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <GlobeMesh />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
};

export default Globe;
