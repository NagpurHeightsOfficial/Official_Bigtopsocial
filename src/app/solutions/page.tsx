"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Utilities ---
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const solutions = [
    {
        id: "01",
        title: "Brand Architecture",
        subtitle: "Identity & Strategy",
        image: "/services/1.png", // Add your image path here
        description: "We don't just design logos; we build belief systems. Your brand is a living entity, and we define its soul, voice, and visual language to command attention in a crowded void.",
        deliverables: ["Visual Identity System", "Brand Voice/Tone", "Market Positioning", "Rebranding Strategy"],
        align: "right"
    },
    {
        id: "02",
        title: "Performance Media",
        subtitle: "Paid Acquisition",
        image: "/services/2.png", // Add your image path here
        description: "Art meets algorithm. We deploy capital with surgical precision, turning ad spend into revenue. No vanity metrics—just cold, hard ROI across Meta, Google, and TikTok.",
        deliverables: ["Campaign Strategy", "Creative Production", "A/B Testing", "Conversion Optimization"],
        align: "left"
    },
    {
        id: "03",
        title: "Content Production",
        subtitle: "Film & Photo",
        image: "/services/3.png", // Add your image path here
        description: "Cinematic storytelling that stops the scroll. From high-gloss commercial productions to raw social-first content, we capture the shots that others miss.",
        deliverables: ["TVC & Commercials", "Social Content Reels", "Product Photography", "Art Direction"],
        align: "right"
    },
    {
        id: "04",
        title: "Digital Ecosystems",
        subtitle: "Web & Tech",
        image: "/services/4.png", // Add your image path here
        description: "Websites that feel like worlds. We craft immersive digital experiences that merge aesthetic perfection with seamless functionality and SEO dominance.",
        deliverables: ["Web Design (UX/UI)", "Full Stack Development", "SEO & Analytics", "eCommerce Solutions"],
        align: "left"
    },
];

const SolutionSection = ({ item, index }: { item: typeof solutions[0]; index: number }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effects
    const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
    // const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]); // Replaced by Reveal

    const isLeft = item.align === "left";

    return (
        <section ref={ref} className="min-h-screen relative flex items-center py-20 overflow-hidden border-t border-white/5">
            {/* Animated Separator Line */}
            <motion.div
                className="absolute top-0 left-0 h-px bg-white/10 z-20"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Background Big Number */}
            <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} opacity-[0.03] select-none pointer-events-none z-0`}>
                <Reveal delay={0.1}>
                    <span className="text-[40vw] font-display font-bold leading-none tracking-tighter">
                        {item.id}
                    </span>
                </Reveal>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className={`flex flex-col md:flex-row ${isLeft ? 'md:flex-row-reverse' : ''} items-center gap-12 md:gap-24`}>

                    {/* Visual / Decor Column */}
                    <div className="w-full md:w-1/2 ">
                        <motion.div
                            // style={{ opacity }} // Opacity handled by Reveal / entrance
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative aspect-[4/5] md:aspect-square w-full h-full border border-white/10 p-4 md:p-8"
                        >
                            <div className="w-full h-full bg-neutral-900/50 relative overflow-hidden group">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                                    />
                                ) : (
                                    <>
                                        {/* Abstract animated lines (fallback if no image) */}
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[gradient_15s_linear_infinite]" />
                                    </>
                                )}
                                <div className="absolute bottom-4 left-4 text-xs font-mono text-neutral-500 z-10">
                                    // {item.subtitle.toUpperCase()}
                                </div>
                                <div className={`absolute w-32 h-32 bg-white/5 blur-[80px] rounded-full ${isLeft ? 'top-0 right-0' : 'bottom-0 left-0'}`} />
                            </div>

                            {/* Corner marks */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
                        </motion.div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full md:w-1/2">
                        <motion.div style={{ y: yText }}>
                            <Reveal delay={0.1}>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="h-px w-12 bg-blue-500"></span>
                                    <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
                                        0{index + 1} / {item.subtitle}
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8 uppercase">
                                    {item.title}
                                </h2>
                            </Reveal>

                            <Reveal delay={0.3}>
                                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed mb-10 max-w-lg">
                                    {item.description}
                                </p>
                            </Reveal>

                            {/* Deliverables Grid */}
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 border-t border-white/10 pt-8">
                                {item.deliverables.map((d, i) => (
                                    <Reveal key={i} delay={0.4 + (i * 0.1)} className="flex items-start gap-2 group cursor-default">
                                        <div className="flex items-center gap-2">
                                            <span className="text-neutral-600 group-hover:text-blue-500 transition-colors">↗</span>
                                            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                                                {d}
                                            </span>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default function SolutionsPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <Navbar />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50 mix-blend-difference"
                style={{ scaleX }}
            />

            <main className="bg-[#0a0a0a] text-white overflow-hidden">

                {/* Hero Section */}
                <section className="h-[80vh] flex flex-col justify-center relative px-6 border-b border-white/10">
                    <div className="container mx-auto">
                        <Reveal>
                            <h1 className="text-[14vw] leading-[0.8] font-display font-medium tracking-tighter uppercase">
                                Total <br />
                                <span className="stroke-text pl-[10vw]">Solutions</span>
                            </h1>
                        </Reveal>

                        <div className="flex flex-col md:flex-row justify-between items-end mt-12 md:mt-0">
                            <Reveal delay={0.2}>
                                <p className="text-neutral-400 max-w-md mt-8 md:mt-0 font-light text-lg">
                                    We architect the infrastructure of your brand&apos;s digital existence.
                                    Full-spectrum dominance from strategy to execution.
                                </p>
                            </Reveal>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-white/20 animate-spin-slow"
                            >
                                <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="relative">
                    <div className="fixed top-0 left-0 w-px h-full bg-white/5 z-0" />
                    <div className="fixed top-0 right-0 w-px h-full bg-white/5 z-0" />

                    {solutions.map((item, i) => (
                        <SolutionSection key={item.id} item={item} index={i} />
                    ))}
                </div>

                {/* Final Call to Action */}
                <section className="py-40 bg-white text-black relative">
                    <div className="container mx-auto px-6 text-center">
                        <Reveal>
                            <h2 className="text-6xl md:text-9xl font-display font-bold leading-none mb-12">
                                LET&apos;S <br /> BUILD
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <a
                                href="/contact"
                                className="inline-block px-12 py-5 bg-black text-white rounded-full text-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300"
                            >
                                Start Project
                            </a>
                        </Reveal>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
