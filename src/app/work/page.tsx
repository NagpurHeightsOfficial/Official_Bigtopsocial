"use client";

import { motion, useTransform, useScroll, useSpring, MotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        description: "A new-generation design language shaping the future brand direction, brought to life through a festive corporate gifting brochure crafted for large-scale distribution.",
        year: "2025",
        role: "Print Media Service",
        services: ["Brochure Design", "Flyer Design", "Menu Design", "Poster Design"],
        location: "Norway",
        images: [
            "/workimages/1.1.webp",
            "/workimages/1.2.webp",
            "/workimages/1.3.webp",
        ],
    },
    {
        id: 2,
        title: "NeoBank App",
        category: "Product Design",
        description: "Redefining digital banking with a focus on user-centric design patterns and seamless transactional flows for the next billion users.",
        year: "2024",
        role: "UI/UX Design",
        services: ["App Interface", "User Research", "Prototyping", "Design System"],
        location: "London",
        images: [
            "https://picsum.photos/seed/finance/1600/900",
            "https://picsum.photos/seed/finance2/1600/900",
            "https://picsum.photos/seed/finance3/1600/900",
        ]
    },
    {
        id: 3,
        title: "Future Tech",
        category: "Identity",
        description: "Crafting a visual identity that bridges the gap between human intuition and artificial intelligence, creating a brand that feels both futuristic and familiar.",
        year: "2024",
        role: "Brand Identity",
        services: ["Logo Design", "Brand Guidelines", "Visual Assets", "Motion Design"],
        location: "San Francisco",
        images: [
            "https://picsum.photos/seed/tech/1600/900",
            "https://picsum.photos/seed/tech2/1600/900",
            "https://picsum.photos/seed/tech3/1600/900",
        ]
    },
    {
        id: 4,
        title: "Global Logistics",
        category: "Web Platform",
        description: "Streamlining complex supply chain data into an intuitive dashboard interface, empowering operators with real-time visibility and control.",
        year: "2023",
        role: "Web Development",
        services: ["Frontend Dev", "Dashboard UI", "Data Viz", "API Integration"],
        location: "Singapore",
        images: [
            "https://picsum.photos/seed/logistics/1600/900",
            "https://picsum.photos/seed/logistics2/1600/900",
            "https://picsum.photos/seed/logistics3/1600/900",
        ]
    },
    {
        id: 5,
        title: "Eco Campaign",
        category: "Marketing",
        description: "A global campaign designed to raise awareness about sustainable energy practices through impactful visual storytelling and digital engagement.",
        year: "2023",
        role: "Campaign Strategy",
        services: ["Social Media", "Content Creation", "Art Direction", "Copywriting"],
        location: "Berlin",
        images: [
            "https://picsum.photos/seed/energy/1600/900",
            "https://picsum.photos/seed/energy2/1600/900",
            "https://picsum.photos/seed/energy3/1600/900",
        ]
    },
];

const ProjectCard = ({ project, index, progress, total }: { project: Project, index: number, progress: MotionValue<number>, total: number }) => {
    const visualIndex = index + 1;
    const step = 1 / total;
    const center = visualIndex * step;

    // Minimalist animations: Smooth Fade & Scale
    // Image scales up slightly when in focus (0.9 -> 1.0)
    const scale = useTransform(progress, [center - step, center, center + step], [0.9, 1, 0.9]);
    // Content fades in/out cleanly
    const opacity = useTransform(progress, [center - step * 0.6, center, center + step * 0.6], [0, 1, 0]);
    // Subtle x-axis shift for parallax feeling without being overwhelming
    const x = useTransform(progress, [center - step, center + step], ["5%", "-5%"]);

    // Slideshow State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [project.images.length]);

    return (
        <div className="h-screen w-screen flex-shrink-0 flex items-center justify-center relative overflow-hidden bg-neutral-950">
            <motion.div
                style={{ opacity }}
                className="w-[90vw] max-w-[1600px] h-[85vh] md:h-[80vh] flex flex-col md:grid md:grid-cols-12 gap-0 md:gap-8 items-center relative"
            >

                {/* --- Image Column (Mobile: Top 35% / Desktop: Right 7 Cols) --- */}
                <div className="order-1 md:order-2 relative w-full h-[35vh] md:h-full md:col-span-7 overflow-hidden bg-neutral-900 z-10">
                    {/* Image Frame */}
                    <motion.div
                        style={{ scale, x }}
                        className="relative w-full h-full md:h-[90%] md:ml-[-5%] overflow-hidden bg-neutral-900 md:mt-12"
                    >
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                {/* No tints, no overlays, just the pure image */}
                                <Image
                                    src={project.images[currentImageIndex]}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-100 transition-opacity duration-500"
                                    priority={index < 2}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Minimal Pagination Dots on Image */}
                        <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                            {project.images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`transition-all duration-300 ${idx === currentImageIndex ? 'w-2 h-2 bg-white' : 'w-2 h-2 border border-white/50'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* --- Left Column: Typography & Grid (Mobile: Bottom 65% / Desktop: Left 5 Cols) --- */}
                <div className="order-2 md:order-1 col-span-1 md:col-span-5 flex flex-col justify-between h-[55vh] md:h-full py-6 md:py-12 z-20 bg-neutral-950 md:bg-transparent pl-0 md:pl-0 w-full relative">

                    {/* Massive Background Index Number for Mobile Depth */}
                    <div className="absolute top-0 right-0 text-[10rem] font-display font-bold text-neutral-800/20 leading-none -mt-4 mr-4 md:hidden pointer-events-none select-none">
                        0{index + 1}
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-4 text-white/50 border-b border-white/10 pb-4 w-full md:w-2/3">
                        <span className="font-mono text-sm">0{index + 1}</span>
                        <span className="h-[1px] flex-1 bg-white/20" />
                        <span className="font-mono text-sm">0{total}</span>
                    </div>

                    {/* Title */}
                    <div className="py-4 md:py-12">
                        <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-medium text-white tracking-tighter leading-[0.9] md:leading-[0.85] -ml-1">
                            {project.title}
                        </h2>
                        <p className="mt-4 md:mt-8 text-sm md:text-lg text-neutral-400 max-w-sm leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                            {project.description}
                        </p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-y-4 md:gap-y-8 gap-x-4 border-t border-white/10 pt-4 md:pt-8 w-full md:w-3/4">
                        <div>
                            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1 md:mb-2">Category</h4>
                            <p className="text-sm md:text-base text-white font-medium">{project.category}</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1 md:mb-2">Year</h4>
                            <p className="text-sm md:text-base text-white font-medium">{project.year}</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1 md:mb-2">Services</h4>
                            <div className="flex flex-wrap gap-2 text-[10px] md:text-sm text-neutral-300">
                                {project.services.slice(0, 2).join(", ")}
                            </div>
                        </div>
                        <div>
                            <Link href={`/work/${project.id}`} className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors group">
                                <span className="uppercase tracking-widest text-[10px] md:text-sm font-bold border-b border-white group-hover:border-neutral-300 pb-0.5">Explore</span>
                                <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">→</span>
                            </Link>
                        </div>
                    </div>

                </div>

            </motion.div>
        </div>
    )
}

const TitleCard = () => {
    // Triple the projects list to ensure smooth infinite scrolling
    const broadcastProjects = [...projects, ...projects, ...projects];

    return (
        <div className="h-screen w-screen flex-shrink-0 p-2 md:p-4 flex items-center justify-center">
            <div className="w-[90vw] h-[100vh] relative bg-neutral-950 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-neutral-900">

                {/* Left Column: Typography & Manifesto */}
                <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20 relative bg-neutral-950 md:bg-transparent">

                    <div className="mb-8">
                        <h2 className="text-7xl md:text-9xl font-display font-medium text-white tracking-tighter leading-[0.9]">
                            Visuals <br />
                            <span className="italic text-neutral-500 font-light">That</span> <br />
                            Speak.
                        </h2>
                    </div>

                    <div className="flex flex-col gap-6 max-w-sm">
                        <p className="text-lg text-neutral-400 font-light leading-relaxed">
                            We don&apos;t just design. We engineer emotions, curate chaos, and build digital cathedrals for the bold.
                        </p>

                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-white/30" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white/50">Since 2024</span>
                        </div>
                    </div>

                    {/* Bottom Scroll Indicator */}
                    <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 flex items-center gap-4 animate-pulse">
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                            <span className="text-white text-xl">↓</span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/30">Scroll to Explore</span>
                    </div>
                </div>

                {/* Right Column: Kinetic Gallery (Marquee) */}
                <div className="hidden md:flex flex-1 relative h-full overflow-hidden mask-gradient-b">
                    {/* Overlay Gradient for smooth fade top/bottom */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />

                    {/* Column 1: Speed Up */}
                    <div className="w-1/2 h-full relative overflow-hidden">
                        <motion.div
                            animate={{ y: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                            className="w-full flex flex-col gap-4 py-4"
                        >
                            {broadcastProjects.map((p, i) => (
                                <div key={`${p.id}-col1-${i}`} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 scale-95 hover:scale-100">
                                    <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Column 2: Speed Down */}
                    <div className="w-1/2 h-full relative overflow-hidden pt-12">
                        <motion.div
                            animate={{ y: ["-50%", "0%"] }}
                            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                            className="w-full flex flex-col gap-4 py-4"
                        >
                            {[...broadcastProjects].reverse().map((p, i) => (
                                <div key={`${p.id}-col2-${i}`} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 scale-95 hover:scale-100">
                                    <Image src={p.images[1] || p.images[0]} alt={p.title} fill className="object-cover" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default function WorkSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 30,
        damping: 20,
        mass: 1.2,
        restDelta: 0.001
    });

    const totalItems = projects.length + 1;
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-83.33%"]);

    return (
        <>
            <Navbar />
            <section ref={targetRef} className="relative h-[600vh] bg-neutral-950">
                <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex">
                        <TitleCard />
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                progress={smoothProgress}
                                total={totalItems - 1} // max index
                            />
                        ))}
                    </motion.div>
                </div>
            </section>
            <Footer />
        </>
    );
}
