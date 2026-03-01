import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const PulsingSphere = ({ status }) => {
    const mesh = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (status === 'online') {
            mesh.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
        }
    });

    const color = status === 'online' ? '#10B981' : '#4B5563'; // Green vs Gray

    return (
        <Sphere ref={mesh} args={[1, 32, 32]} scale={1}>
            <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.3}
                speed={2}
                roughness={0.4}
                metalness={0.1}
            />
        </Sphere>
    );
};

const ConsultantStatus = ({ status }) => {
    return (
        <div className="w-[100px] h-[100px]">
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <PulsingSphere status={status} />
            </Canvas>
        </div>
    );
};

export default ConsultantStatus;
