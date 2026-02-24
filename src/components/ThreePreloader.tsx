"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";

// --- Configuration ---
const PRELOADER_DURATION = 2.0; // Loop duration in seconds
const ANIM_SPEED = 1.0;
const COLOR_BRAND = "#4CA9FF"; // Reference Blue

// --- Geometry ---
function ChevronShape() {
    return useMemo(() => {
        const shape = new THREE.Shape();
        // Metric parameters for a sharp, balanced chevron
        const width = 1.0;
        const thickness = 0.38;
        const height = 0.8;

        // Draw from top apex clockwise
        shape.moveTo(0, height);                     // Top Apex
        shape.lineTo(width, 0);                      // Right Outer Corner
        shape.lineTo(width, -thickness);             // Right Tip Bottom (Horizontal cut)
        shape.lineTo(0, height - thickness * 1.4);   // Inner Apex (slightly higher to maintain visual stroke)
        shape.lineTo(-width, -thickness);            // Left Tip Bottom
        shape.lineTo(-width, 0);                     // Left Outer Corner
        shape.lineTo(0, height);                     // Close loop

        return shape;
    }, []);
}

const extrudeSettings = {
    depth: 0.25,        // Subtle depth, not bulky
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,   // Low poly bevel for sharpness + performance
};

// --- Components ---

function AnimatedLogo() {
    const topRef = useRef<THREE.Mesh>(null!);
    const bottomRef = useRef<THREE.Mesh>(null!);

    const shape = ChevronShape();

    // Animation State
    useFrame((state) => {
        const t = (state.clock.elapsedTime * ANIM_SPEED) % PRELOADER_DURATION;
        const progress = t / PRELOADER_DURATION;

        // --- Phase Logic ---
        // 0.0 - 0.5: Rise & Align (Momentum)
        // 0.5 - 0.7: Lock & Pulse (Activation)
        // 0.7 - 1.0: Hold & Reset (Transition)

        // Vertical Positions (Target: Top at 0.4, Bottom at -0.4)
        // Start: Lower is much lower, Upper is slightly lower

        const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

        // Phase 1: Rise and Lock
        let riseProgress = Math.min(progress / 0.5, 1);
        riseProgress = easeOutExpo(riseProgress);

        // Initial offset positions
        const startY_Top = -1.0;
        const startY_Bot = -2.5;

        // Target lock positions
        const targetY_Top = 0.45;
        const targetY_Bot = -0.45;

        // Apply movement
        // Bottom chevron moves faster/longer to catch up
        if (progress < 0.8) {
            topRef.current.position.y = THREE.MathUtils.lerp(startY_Top, targetY_Top, riseProgress);
            bottomRef.current.position.y = THREE.MathUtils.lerp(startY_Bot, targetY_Bot, riseProgress);
        } else {
            // Reset smoothly or snap? Reference says "Resets seamlessly".
            // Usually requires fading out or moving up out of frame. 
            // Let's fade upward slightly and scale down for loop reset illusion
            const exitProgress = (progress - 0.8) / 0.2; // 0 to 1
            topRef.current.position.y = THREE.MathUtils.lerp(targetY_Top, targetY_Top + 0.5, exitProgress);
            bottomRef.current.position.y = THREE.MathUtils.lerp(targetY_Bot, targetY_Bot + 0.5, exitProgress);

            const fadeScale = 1 - exitProgress;
            topRef.current.scale.setScalar(fadeScale);
            bottomRef.current.scale.setScalar(fadeScale);

            // Reset scales for next loop start
            if (exitProgress > 0.95) {
                topRef.current.scale.setScalar(1);
                bottomRef.current.scale.setScalar(1);
            }
        }

        // Scale Pulse at Lock Moment (approx 0.5)
        if (progress > 0.4 && progress < 0.7) {
            const pulseP = (progress - 0.4) / 0.3; // 0 to 1
            // Sine wave pulse: 1 -> 1.1 -> 1
            const scale = 1 + Math.sin(pulseP * Math.PI) * 0.05;
            topRef.current.scale.setScalar(scale);
            bottomRef.current.scale.setScalar(scale);
        } else if (progress <= 0.4) {
            topRef.current.scale.setScalar(1);
            bottomRef.current.scale.setScalar(1);
        } // else handled by exit phase logic above
    });

    return (
        <Center>
            <group>
                {/* Top Chevron */}
                <mesh ref={topRef} position={[0, 0.45, 0]}>
                    <extrudeGeometry args={[shape, extrudeSettings]} />
                    <meshStandardMaterial
                        color={COLOR_BRAND}
                        roughness={0.4}
                        metalness={0.2}
                        emissive={COLOR_BRAND}
                        emissiveIntensity={0.1}
                    />
                </mesh>

                {/* Bottom Chevron */}
                <mesh ref={bottomRef} position={[0, -0.45, 0]}>
                    <extrudeGeometry args={[shape, extrudeSettings]} />
                    <meshStandardMaterial
                        color={COLOR_BRAND}
                        roughness={0.4}
                        metalness={0.2}
                        emissive={COLOR_BRAND}
                        emissiveIntensity={0.1}
                    />
                </mesh>
            </group>
        </Center>
    );
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />

            {/* Lighting Setup: Key + Rim, No Shadows */}
            {/* Key Light (Soft Top-Front) */}
            <directionalLight position={[2, 5, 5]} intensity={1.5} color="#ffffff" />

            {/* Fill/Ambient (Subtle global visibility) */}
            <ambientLight intensity={0.2} />

            {/* Rim Light (Back-Side to separate from black bg) */}
            <spotLight position={[-5, 2, -5]} intensity={2.0} color={COLOR_BRAND} distance={20} angle={0.5} />

            <AnimatedLogo />
        </>
    );
}

export default function ThreePreloader() {
    const [complete, setComplete] = useState(false);
    // Real loading simulation logic
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 3000;
        let startTime: number | null = null;
        let rafId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            setProgress(progress);

            if (elapsed < duration) {
                rafId = requestAnimationFrame(animate);
            } else {
                setTimeout(() => setComplete(true), 500);
            }
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
                >
                    <div className="w-full h-[60vh]">
                        <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
                            <color attach="background" args={["#000000"]} />
                            <Scene />
                        </Canvas>
                    </div>

                    {/* Minimal Agency Progress Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-15 font-sans text-white/70 text-xl tracking-[0.3em] font-medium"
                    >
                        LOADING {Math.round(progress)}%
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
