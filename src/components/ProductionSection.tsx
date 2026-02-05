"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PhoneMockup = ({ src, videoSrc, backImage, delay }: { src?: string; videoSrc?: string; backImage?: string; delay: number }) => {
    return (
        <div className="relative w-[300px] h-[600px] [perspective:1000px]">
            <motion.div
                initial={{ rotateY: 0 }}
                whileInView={{ rotateY: 180 }}
                transition={{ duration: 0.8, delay, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* --- 3D THICKNESS/LAYERS (Spine) --- */}
                {/* Stack many dark layers to simulate the phone's side thickness (approx 30px total scale) */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 w-full h-full bg-[#FD7A30] rounded-[50px] backface-visible border border-[#FD7A30]/30"
                        style={{
                            // Spread layers from -14px to +14px to fill the 30px gap
                            transform: `translateZ(${-14 + i * 2}px)`,
                        }}
                    />
                ))}

                {/* --- FRONT FACE (iPhone Back - Initially Visible) --- */}
                <div
                    className="absolute inset-0 w-full h-full bg-neutral-900 rounded-[50px] shadow-2xl flex flex-col items-center justify-center p-0 backface-hidden overflow-hidden border border-neutral-800"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg) translateZ(15px)" }}
                >
                    {backImage ? (
                        <div className="relative w-full h-full">
                            <img src={backImage} alt="Phone Back" className="w-full h-full object-cover scale-x-140 scale-y-123" />
                            {/* Optional: Add a subtle camera bump overlay even on custom images if desired, or keep it clean */}
                        </div>
                    ) : (
                        /* Default CSS Back */
                        <div className="flex flex-col items-center justify-center w-full h-full bg-neutral-900">
                            {/* ... (Kept simple for brevity if fallback is used, though user has backImage) ... */}
                            <div className="w-16 h-16 opacity-30">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.8-1.31.02-2.3-1.23-3.14-2.47-1.71-2.47-3.03-7-1.26-10.09C5.64 8.7 7.15 7.85 8.6 7.82c1.26-.03 2.45.85 3.22.85.76 0 2.18-.85 3.66-.75 2.49.19 4.38 1.68 5.43 3.23-2.73 1.63-2.27 6.64 1.8 7.37zM13 3.5c.67-1.74 2.87-2.67 4.7-2.5C18.06 2.86 16.5 5.25 13 3.5z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- BACK FACE (Screen/Reel - Revealed on Flip) --- */}
                <div
                    className="absolute inset-0 w-full h-full bg-black rounded-[50px] shadow-2xl border-[8px] border-gray-900 overflow-hidden backface-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(15px)" }}
                >
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-black rounded-full z-20 flex items-center justify-end pr-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-900/50 ring-1 ring-white/10"></div>
                    </div>

                    {/* Screen Content */}
                    <div className="relative w-full h-full bg-gray-800 rounded-[38px] overflow-hidden">
                        {videoSrc ? (
                            <video
                                src={videoSrc}
                                poster={src}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img src={src} alt="Portfolio Work" className="w-full h-full object-cover" />
                        )}

                        {/* Fake UI Overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full"></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ProductionSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const textY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={containerRef} className="py-32 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* Header content */}
                <div className="text-center mb-24 relative">
                    <span className="text-gray-500 uppercase tracking-widest text-sm mb-2 block font-medium">(Portfolio)</span>

                    {/* Parallax Giant Text */}
                    <div className="relative">
                        <motion.h2
                            style={{ y: textY }}
                            className="text-[12vw] md:text-[15vw] leading-none font-display font-bold text-gray-200 select-none whitespace-nowrap"
                        >
                            Production
                        </motion.h2>
                    </div>
                </div>

                {/* Phones Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-18 -mt-10 md:-mt-40 z-20 perspective-1000">
                    <PhoneMockup
                        videoSrc="/9.mp4"
                        src="https://picsum.photos/seed/mobile1/400/800"

                        backImage="/images/ChatGPT Image Feb 5, 2026, 02_45_12 PM.png"
                        delay={0.1}
                    />
                    <PhoneMockup
                        videoSrc="/8.mp4"
                        src="https://picsum.photos/seed/mobile2/400/800"
                        backImage="/images/ChatGPT Image Feb 5, 2026, 02_45_12 PM.png"
                        delay={0.3}
                    />
                    <PhoneMockup
                        videoSrc="/1.mp4"
                        src="https://picsum.photos/seed/mobile3/400/800"
                        backImage="/images/ChatGPT Image Feb 5, 2026, 02_45_12 PM.png"
                        delay={0.5}
                    />

                </div>

            </div>
        </section>
    );
}
