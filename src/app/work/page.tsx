"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Project Data ---
interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    year: string;
    role: string;
    services: string[];
    location: string;
    images: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "ELkem",
        category: "Branding",
        description: "A new-generation design language shaping the future brand direction. We crafted a corporate gifting experience that bridges industrial legacy with modern minimalism.",
        year: "2025",
        role: "Visual Identity",
        services: ["Brochure Design", "Art Direction", "Print Production"],
        location: "Norway",
        images: ["/workimages/1.1.webp"]
    },
    {
        id: 2,
        title: "NeoBank",
        category: "Product Design",
        description: "Redefining digital banking for the next billion users. A frictionless mobile experience that turns complex financial data into intuitive, actionable insights.",
        year: "2024",
        role: "UI/UX Design",
        services: ["App Interface", "Design System", "Prototyping"],
        location: "London",
        images: ["https://picsum.photos/seed/finance/1600/1200"]
    },
    {
        id: 3,
        title: "Future Tech",
        category: "Identity",
        description: "Visualizing the invisible. A brand identity system for an AI research lab, bridging the gap between human intuition and machine intelligence.",
        year: "2024",
        role: "Brand Identity",
        services: ["Logo Design", "Motion Graphics", "3D Rendering"],
        location: "San Francisco",
        images: ["https://picsum.photos/seed/tech/1600/1200"]
    },
    {
        id: 4,
        title: "Logos Chain",
        category: "Web Platform",
        description: "Streamlining global supply chain data into a single source of truth. A high-performance dashboard empowering operators with real-time visibility.",
        year: "2023",
        role: "Web Development",
        services: ["Frontend Dev", "Data Visualization", "API Integration"],
        location: "Singapore",
        images: ["https://picsum.photos/seed/logistics/1600/1200"]
    },
    {
        id: 5,
        title: "Eco Energy",
        category: "Marketing",
        description: "A global campaign raising awareness for sustainable energy. Impactful visual storytelling that drove 200% engagement across social channels.",
        year: "2023",
        role: "Campaign Strategy",
        services: ["Social Media", "Video Production", "Copywriting"],
        location: "Berlin",
        images: ["https://picsum.photos/seed/energy/1600/1200"]
    },
];

// --- Utilities & Components ---

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

const ProjectSection = ({ project, index }: { project: Project; index: number }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    // Parallax Effects (Keep the structural parallax, but remove opacity control to let Reveal take over)
    const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]); // Adjusted to be subtle
    const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

    // Smooth line reveal
    const isLineInView = useInView(container, { once: true, margin: "-20%" });

    // Alternating Layout
    const isEven = index % 2 === 0;

    return (
        <section ref={container} className="min-h-screen relative py-20 md:py-32 overflow-hidden">

            {/* Animated Separator Line */}
            <motion.div
                className="absolute top-0 left-0 h-px bg-white/10 z-20"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Background Big Number */}
            <div className={`absolute top-20 ${isEven ? 'right-0' : 'left-0'} opacity-[0.02] select-none pointer-events-none z-0`}>
                <Reveal delay={0.2}>
                    <span className="text-[30vw] font-display font-bold leading-none tracking-tighter">
                        0{project.id}
                    </span>
                </Reveal>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>

                    {/* Project Image (Parallax Window) */}
                    <div className="w-full md:w-3/5 h-[50vh] md:h-[70vh] relative overflow-hidden group rounded-sm">
                        <motion.div
                            style={{ scale: scaleImage }}
                            className="w-full h-full relative"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 1.1 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2 }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-opacity duration-700 opacity-80 group-hover:opacity-100" // Slight dim by default, bright on hover
                                />
                            </motion.div>
                        </motion.div>

                        {/* Overlay Decor */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                <span className="text-white text-sm font-bold uppercase tracking-widest">View</span>
                            </div>
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="w-full md:w-2/5">
                        <motion.div style={{ y: yContent }} className="relative">

                            <Reveal delay={0.1}>
                                <div className="flex items-center gap-4 mb-6 md:mb-8">
                                    <span className={`h-px w-10 ${isEven ? 'bg-rose-500' : 'bg-blue-500'}`} />
                                    <span className="text-sm font-mono tracking-widest text-neutral-400 uppercase">
                                        {project.category} — {project.year}
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={0.2}>
                                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] text-white mb-8">
                                    {project.title}
                                </h2>
                            </Reveal>

                            <Reveal delay={0.3}>
                                <p className="text-lg text-neutral-400 font-light leading-relaxed mb-8 md:mb-12 max-w-md">
                                    {project.description}
                                </p>
                            </Reveal>

                            <div className="space-y-6 border-t border-white/10 pt-8">
                                <Reveal delay={0.4}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Role</h4>
                                            <p className="text-sm text-white">{project.role}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Location</h4>
                                            <p className="text-sm text-white">{project.location}</p>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal delay={0.5}>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Services</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.services.map((service, i) => (
                                                <span key={i} className="px-3 py-1 border border-white/10 text-xs text-neutral-300 rounded-full">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Reveal>
                            </div>

                            <Reveal delay={0.6}>
                                <Link href={`/work/${project.id}`} className="inline-flex items-center gap-3 mt-12 text-white group cursor-pointer">
                                    <span className="text-lg font-bold uppercase tracking-widest group-hover:text-neutral-300 transition-colors">See Case Study</span>
                                    <span className="text-xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                                </Link>
                            </Reveal>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default function WorkPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <Navbar />

            {/* Top Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50 mix-blend-difference"
                style={{ scaleX }}
            />

            <main className="bg-[#050505] text-white min-h-screen">

                {/* Hero Section */}
                <section className="h-[70vh] flex flex-col justify-end pb-24 px-6 relative">
                    <div className="container mx-auto">
                        <Reveal delay={0.1}>
                            <h1 className="text-[12vw] md:text-[10vw] leading-[0.85] font-display font-medium uppercase tracking-tight">
                                Selected <br />
                                <span className="stroke-text text-transparent ml-[5vw] md:ml-[10vw]">Works</span>
                            </h1>
                        </Reveal>

                        <div className="flex flex-col md:flex-row justify-between items-end mt-12 border-t border-white/10 pt-8">
                            <Reveal delay={0.3}>
                                <p className="text-neutral-400 max-w-xl text-lg md:text-xl font-light">
                                    A curated showcase of digital transformation. <br className="hidden md:block" />
                                    Where strategy meets aesthetic precision.
                                </p>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div className="text-sm font-mono text-neutral-500 mt-8 md:mt-0 uppercase tracking-widest">
                                    (2023 — Present)
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* Projects List */}
                <div className="relative">
                    {projects.map((project, index) => (
                        <ProjectSection key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* Footer CTA */}
                <section className="py-40 flex items-center justify-center bg-white text-black">
                    <div className="text-center px-4">
                        <Reveal>
                            <h2 className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8">
                                Have an Idea?
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <Link href="/contact" className="inline-block border-b-2 border-black text-2xl md:text-3xl font-bold uppercase tracking-widest pb-1 hover:text-neutral-600 hover:border-neutral-600 transition-colors">
                                Let&apos;s Talk Business
                            </Link>
                        </Reveal>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}

// Ensure the .stroke-text class is defined in global css for the outline effect
