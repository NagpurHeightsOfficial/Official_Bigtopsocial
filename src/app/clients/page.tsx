"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const logos = [
    { name: "SWADESHI DRIP", src: "/clientlogo/1.jpg", category: "Fashion" },
    { name: "NAGPUR HEIGHTS", src: "/clientlogo/2.jpg", category: "Real Estate" },
    { name: "HOME OF CREATIVITY", src: "/clientlogo/3.jpg", category: "Design" },
    { name: "KAT EXPERT", src: "/clientlogo/4.jpg", category: "Consulting" },
    { name: "Nikhilesh Tabhane", src: "/clientlogo/5.jpg", category: "Sports" },
    { name: "Hridayam Paints", src: "/clientlogo/6.jpg", category: "Industrial" },
    { name: "ARTYNEX", src: "/clientlogo/7.jpg", category: "Technology" },
    { name: "NISARGA LAKE VIEW", src: "/clientlogo/8.jpg", category: "Hospitality" },
    { name: "ELKEM", src: "/clientlogo/9.jpg", category: "Manufacturing" },
    { name: "CHROMATICS", src: "/clientlogo/10.jpg", category: "Media" },
    { name: "NTX", src: "/clientlogo/11.jpg", category: "Logistics" },
    { name: "The Hitavada", src: "/clientlogo/12.jpg", category: "News" },
    { name: "ICTRD", src: "/clientlogo/13.jpg", category: "Research" },
    // Duplicate for density if needed
    { name: "Logo 14", src: "/clientlogo/1.jpg", category: "Tech" },
    { name: "Logo 15", src: "/clientlogo/2.jpg", category: "Retail" },
];

const ParallaxColumn = ({ images, y, className }: { images: typeof logos, y: any, className?: string }) => {
    return (
        <motion.div style={{ y }} className={`flex flex-col gap-8 md:gap-12 w-full ${className}`}>
            {images.map((logo, i) => (
                <LogoCard key={i} logo={logo} />
            ))}
        </motion.div>
    );
};

const LogoCard = ({ logo }: { logo: typeof logos[0] }) => {
    // Mouse Tilt Effect
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) / 10);
        y.set((e.clientY - centerY) / 10);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: y, rotateY: x }}
            className="group relative w-full aspect-[4/5] perspective-1000"
        >
            <div className="w-full h-full rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-sm overflow-hidden relative shadow-2xl transition-colors duration-500 hover:bg-neutral-800/60 hover:border-white/20">
                {/* Inner Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Logo Container */}
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                    <motion.img
                        src={logo.src}
                        alt={logo.name}
                        className="w-full h-full object-contain filter grayscale brightness-125 opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                        style={{ filter: "drop-shadow(0px 0px 20px rgba(255,255,255,0.1))" }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                </div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] md:text-xs font-mono text-[#03D3F0] mb-2 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {logo.category}
                    </p>
                    <h3 className="text-lg md:text-2xl font-display font-medium text-white opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        {logo.name}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
};

export default function ClientsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax Transforms
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -800]); // Moves faster
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -350]);

    // Distribute logos into 3 columns
    const col1 = logos.filter((_, i) => i % 3 === 0);
    const col2 = logos.filter((_, i) => i % 3 === 1);
    const col3 = logos.filter((_, i) => i % 3 === 2);

    return (
        <div ref={containerRef} className="bg-[#050505] min-h-[250vh] relative text-white selection:bg-[#03D3F0] selection:text-black">
            <Navbar />

            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("/noise.png")' }}></div>

            {/* Hero Header */}
            <section className="h-[60vh] flex flex-col justify-end items-center px-6 pb-20 relative z-10">
                <div className="text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs text-neutral-400 font-mono tracking-widest uppercase mb-6"
                    >
                        Success Stories
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[12vw] md:text-[8vw] font-display font-medium leading-[0.8] tracking-tight text-white uppercase"
                    >
                        <span className="text-transparent stroke-text">OUR</span> <span className="font-bold italic">CLIENTS</span>
                    </motion.h1>
                </div>
            </section>

            {/* Parallax Gallery */}
            <section className="container mx-auto px-4 md:px-8 relative z-20 pb-40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
                    <ParallaxColumn images={col1} y={y1} className="pt-0" />
                    <ParallaxColumn images={col2} y={y2} className="pt-20 md:pt-40" />
                    <ParallaxColumn images={col3} y={y3} className="pt-10 md:pt-20" />
                </div>
            </section>

            <section className="py-40 flex flex-col justify-center items-center relative z-10 bg-gradient-to-b from-transparent to-[#050505]">
                <div className="text-center max-w-2xl px-6">
                    <h2 className="text-3xl md:text-5xl font-display font-medium mb-8">Ready to join the list?</h2>
                    <p className="text-neutral-400 mb-10 text-lg">We build digital experiences that matter. Let's create something extraordinary together.</p>
                    <a href="/contact" className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#03D3F0] hover:scale-105 transition-all duration-300">
                        Start a Project
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
