"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
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

const manifestos = [
    {
        id: "01",
        title: "Digital Alchemy",
        description: "We don't just write code; we transmute logic into emotion. Turning raw data into gold standard experiences.",
        gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
        id: "02",
        title: "Chaos Theory",
        description: "Finding the perfect pattern in the noise. We break the rules to rewrite the playbook.",
        gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
        id: "03",
        title: "Future Crafted",
        description: "Stop predicting the future. We build it, pixel by pixel, frame by frame.",
        gradient: "from-amber-500/20 to-orange-500/20",
    },
];

const GridItem = ({ item, index }: { item: typeof manifestos[0]; index: number }) => {
    // Reveal handles the entrance animation now, so we can simplify this component
    // We'll wrap the inner content in Reveals for a staggered effect

    return (
        <div className="group relative border-t border-white/10 p-8 md:p-12 lg:p-16 flex flex-col justify-between hover:bg-white/5 transition-colors duration-500 h-full">

            {/* Hover Gradient Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />

            <div className="mb-12">
                <Reveal delay={0.1}>
                    <span className="text-xs font-mono text-neutral-500 mb-4 block tracking-widest">
                        {item.id} / CONCEPT
                    </span>
                </Reveal>
                <Reveal delay={0.2}>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                    </h3>
                </Reveal>
            </div>

            <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-neutral-400 font-light max-w-md leading-relaxed group-hover:text-white transition-colors duration-300">
                    {item.description}
                </p>
            </Reveal>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-px h-16 bg-white/10 group-hover:h-full group-hover:bg-blue-500/50 transition-all duration-700 delay-100" />
            <div className="absolute bottom-0 left-0 w-16 h-px bg-white/10 group-hover:w-full group-hover:bg-blue-500/50 transition-all duration-700 delay-100" />
        </div>
    );
};

export default function AboutSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <>
            <Navbar />
            <section ref={containerRef} className="relative bg-neutral-950 py-32 overflow-hidden">

                {/* Background Grid Lines (Subtle) */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-y-0 left-1/4 w-px bg-white/5" />
                    <div className="absolute inset-y-0 right-1/4 w-px bg-white/5" />
                </div>

                {/* Massive Scrolling Typography (WorkSection Style) */}
                <div className="w-full overflow-hidden mb-24 border-y border-white/7 py-8 relative z-0 flex justify-center items-center">
                    <motion.div className="whitespace-nowrap">
                        <h2 className="text-[12vw] leading-[0.8] font-display font-medium text-transparent uppercase select-none opacity-60 text-center" style={{ WebkitTextStroke: "1px rgba(100, 100, 100, 0.5)" }}>
                            CREATIVE CULT
                        </h2>
                    </motion.div>
                </div>

                <div className="container mx-auto px-4 z-10 relative">

                    {/* Header Statement */}
                    <div className="mb-32 md:mb-48 pl-4 md:pl-12 border-l border-white/10">
                        <Reveal>
                            <h2 className="text-[12vw] md:text-[8vw] font-display font-medium leading-[0.8] tracking-tight text-white uppercase">
                                We Are <br />
                                <span className="text-transparent stroke-text">The Vibe</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="mt-8 text-xl md:text-2xl text-neutral-400 max-w-2xl font-light">
                                Bigtop isn&apos;t an agency. It&apos;s a cult of creativity. We operate in the shadows of convention to shed light on what&apos;s possible.
                            </p>
                        </Reveal>
                    </div>

                    {/* The Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-white/10">
                        {manifestos.map((item, i) => (
                            <div key={i} className="h-full">
                                <GridItem item={item} index={i} />
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            <Footer />
        </>
    );
}
