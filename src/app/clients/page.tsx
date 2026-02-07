"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const logos = [
    { name: "SWADESHI DRIP", src: "/clientlogo/1.jpg" },
    { name: "NAGPUR HEIGHTS", src: "/clientlogo/2.jpg" },
    { name: "HOME OF CREATIVITY", src: "/clientlogo/3.jpg" },
    { name: "KAT EXPERT", src: "/clientlogo/4.jpg" },
    { name: "Nikhilesh Tabhane Skates World", src: "/clientlogo/5.jpg" },
    { name: "Hridayam Paints", src: "/clientlogo/6.jpg" },
    { name: "ARTYNEX", src: "/clientlogo/7.jpg" },
    { name: "NISARGA LAKE VIEW RESORT", src: "/clientlogo/8.jpg" },
    { name: "ELKEM", src: "/clientlogo/9.jpg" },
    { name: "CHROMATICS", src: "/clientlogo/10.jpg" },
    { name: "NTX", src: "/clientlogo/11.jpg" },
    { name: "The Hitavada", src: "/clientlogo/12.jpg" },
    { name: "ICTRD", src: "/clientlogo/13.jpg" },
];

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

export default function ClientsPage() {
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

            <main className="bg-[#050505] text-white min-h-screen relative overflow-hidden">

                {/* Hero Section */}
                <section className="relative h-[60vh] flex flex-col justify-end pb-20 px-6 overflow-hidden">
                    <div className="container mx-auto relative z-10">
                        <Reveal>
                            <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-display font-medium uppercase tracking-tight">
                                Our <br />
                                <span className="stroke-text text-transparent ml-[5vw] md:ml-[10vw]">Partners</span>
                            </h1>
                        </Reveal>

                        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                            <Reveal delay={0.2}>
                                <p className="text-neutral-400 max-w-xl text-lg md:text-xl font-light">
                                    Collaborating with industry leaders to shape <br className="hidden md:block" />
                                    the future of digital narratives.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* Logo Box Grid Section */}
                <section className="py-24 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
                            {logos.map((logo, index) => (
                                <Reveal key={index} delay={index * 0.05} className="group relative border-r border-b border-white/10 aspect-[1.2/1] md:aspect-square flex flex-col justify-between p-8 transition-colors duration-500 hover:bg-white/5">

                                    {/* Top: Number & Arrow */}
                                    <div className="flex justify-between items-start w-full relative z-20">
                                        <span className="text-xs font-mono text-neutral-500">0{index + 1}</span>
                                        <span className="text-white opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">↗</span>
                                    </div>

                                    {/* Middle: Logo (Reveals/Brightens on Hover) */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
                                        <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
                                            <img
                                                src={logo.src}
                                                alt={logo.name}
                                                className="max-w-[70%] max-h-[50%] object-contain grayscale brightness-150 contrast-50 opacity-20 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100 transition-all duration-500"
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
                                        </div>
                                    </div>

                                    {/* Bottom: Client Name */}
                                    <div className="relative z-20">
                                        <h3 className="text-xl md:text-2xl font-display font-medium text-neutral-400 group-hover:text-white transition-colors duration-300">
                                            {logo.name}
                                        </h3>
                                    </div>

                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
