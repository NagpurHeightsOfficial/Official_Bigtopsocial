"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, memo } from "react";

// Memoized Thickness Layers to avoid re-computation on every render
const ThicknessLayers = memo(() => (
    <>
        {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className="absolute inset-0 w-full h-full bg-[#FD7A30] rounded-[50px] backface-visible border border-[#FD7A30]/30"
                style={{
                    transform: `translateZ(${-14 + i * 3.5}px)`,
                }}
            />
        ))}
    </>
));
ThicknessLayers.displayName = "ThicknessLayers";

// Memoized Phone Mockup Component
const PhoneMockup = memo(({ src, videoSrc, backImage, delay }: { src?: string; videoSrc?: string; backImage?: string; delay: number }) => {
    return (
        <div className="relative w-[300px] h-[600px] [perspective:1000px]">
            <motion.div
                initial={{ rotateY: 0 }}
                whileInView={{ rotateY: 180 }}
                // Smoother spring transition for a premium "mechanical" feel
                transition={{
                    duration: 1.2,
                    delay,
                    type: "spring",
                    stiffness: 40,
                    damping: 10,
                    mass: 0.8
                }}
                viewport={{ once: true, amount: 0.5 }}
                className="w-full h-full relative will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* --- 3D THICKNESS/LAYERS (Spine) --- */}
                <ThicknessLayers />

                {/* --- FRONT FACE (iPhone Back - Initially Visible) --- */}
                <div
                    className="absolute inset-0 w-full h-full bg-neutral-900 rounded-[50px] shadow-2xl flex flex-col items-center justify-center p-0 backface-hidden overflow-hidden border border-neutral-800"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg) translateZ(15px)" }}
                >
                    {backImage ? (
                        <div className="relative w-full h-full">
                            <img
                                src={backImage}
                                alt="Phone Back"
                                className="w-full h-full object-cover scale-x-140 scale-y-123"
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full bg-neutral-900">
                            {/* Fallback pattern */}
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
                                preload="none"
                            />
                        ) : (
                            <img src={src} alt="Portfolio Work" className="w-full h-full object-cover" loading="lazy" />
                        )}

                        {/* Fake UI Overlay */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full"></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
});
PhoneMockup.displayName = "PhoneMockup";

export default function ProductionSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Optimize parallax: Ensure it relies on GPU-only properties (which y is)
    const textY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    // Define mock data to keep JSX clean
    const phones = useMemo(() => [
        {
            id: 1,
            videoSrc: "/9.mp4",
            src: "https://picsum.photos/seed/mobile1/400/800",
            backImage: "/images/ChatGPT Image Feb 5, 2026, 02_45_12 PM.png",
            delay: 0.1
        },
        {
            id: 2,
            videoSrc: "/8.mp4",
            src: "https://picsum.photos/seed/mobile2/400/800",
            backImage: "/images/ChatGPT Image Feb 5, 2026, 02_45_12 PM.png",
            delay: 0.3
        },
        {
            id: 3,
            videoSrc: "/6.mp4",
            src: "https://picsum.photos/seed/mobile3/400/800",
            backImage: "/images/ChatGPT Image Feb 5, 2026, 02_45_12 PM.png",
            delay: 0.5
        }
    ], []);

    return (
        <section ref={containerRef} className="py-32 bg-gray-50 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">

                {/* Header content */}
                <div className="text-center mb-24 relative">
                    <span className="text-gray-500 uppercase tracking-widest text-sm mb-16 md:mb-2 block font-medium">(Portfolio)</span>

                    {/* Parallax Giant Text */}
                    <div className="relative w-full">
                        <motion.h2
                            className="leading-none font-display font-bold text-gray-400/50 select-none will-change-transform text-center w-full"
                            style={{ y: textY, fontSize: "clamp(3rem, 12vw, 12rem)" }}
                        >
                            Production
                        </motion.h2>
                    </div>
                </div>

                {/* Phones Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-18 -mt-10 md:-mt-40 z-20 perspective-1000">
                    {phones.map((phone) => (
                        <PhoneMockup
                            key={phone.id}
                            videoSrc={phone.videoSrc}
                            src={phone.src}
                            backImage={phone.backImage}
                            delay={phone.delay}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
