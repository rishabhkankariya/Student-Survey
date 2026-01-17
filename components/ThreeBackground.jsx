'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Dots() {
    const ref = useRef();

    // Create particles
    const particlesCount = 3000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
        }
        return pos;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        ref.current.rotation.y = time * 0.03;
        ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#00f5a0"
                transparent
                opacity={0.3}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function FloatingBlobs() {
    const mesh1 = useRef();
    const mesh2 = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        mesh1.current.position.y = Math.sin(time * 0.5) * 2 + 5;
        mesh1.current.position.x = Math.cos(time * 0.3) * 2 - 15;

        mesh2.current.position.y = Math.cos(time * 0.4) * 3 - 8;
        mesh2.current.position.x = Math.sin(time * 0.6) * 3 + 15;
    });

    return (
        <group>
            <mesh ref={mesh1} position={[-15, 5, -15]}>
                <sphereGeometry args={[12, 64, 64]} />
                <meshStandardMaterial color="#00f5a0" transparent opacity={0.03} roughness={1} metalness={0} />
            </mesh>
            <mesh ref={mesh2} position={[15, -8, -10]}>
                <sphereGeometry args={[15, 64, 64]} />
                <meshStandardMaterial color="#00d9ff" transparent opacity={0.02} roughness={1} metalness={0} />
            </mesh>
        </group>
    )
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 30] }}>
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={5} color="#00f5a0" />
                <Dots />
                <FloatingBlobs />
            </Canvas>
        </div>
    );
}
