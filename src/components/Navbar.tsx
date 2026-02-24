"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Determine if we are scrolled past the top area
        if (latest > 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        if (latest > previous && latest > 150) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    });

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={isVisible ? "visible" : "hidden"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
                    ? "bg-neutral-950/70 backdrop-blur-xl border-white/5 py-4"
                    : "bg-transparent border-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">

                    {/* Logo using LayoutTextFlip */}
                    <Link href="/" className="flex items-center gap-0 z-50 mix-blend-difference">
                        <img
                            src="/images/logo.icon.png"
                            alt="Logo"
                            className="h-10 md:h-10 w-auto object-contain"
                        />
                        <LayoutTextFlip
                            text="BIGTOP"
                            words={["SOCIAL", "TECH", "CREATIVE", "BRANDING"]}
                            className="text-[25px] md:text-4xl font-black tracking-tighter text-white tracking-[0.03em]"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-12">
                        {[
                            { label: "About", href: "/about" },
                            { label: "Work", href: "/work" },
                            { label: "Clients", href: "/clients" },
                            { label: "Solutions", href: "/solutions" }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-300 hover:text-white transition-colors duration-300"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        {/* Simple 'Contact' Text Link for minimalism */}
                        <Link
                            href="/contact"
                            className="hidden lg:block text-[11px] font-bold uppercase tracking-[0.2em] text-white border border-white/20 px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Get in Touch
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden text-white focus:outline-none p-1 mix-blend-difference"
                        >
                            <div className="space-y-1.5">
                                <span className="block w-6 h-[2px] bg-white"></span>
                                <span className="block w-6 h-[2px] bg-white"></span>
                            </div>
                        </button>
                    </div>

                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[60] bg-[#151515] text-white flex flex-col"
                    >
                        {/* Header with Close Button */}
                        <div className="container mx-auto px-6 py-6 flex justify-between items-center border-b border-white/10 -mt-2">
                            <Link href="/" className="flex items-center gap-1">
                                <LayoutTextFlip
                                    text="BIGTOP"
                                    words={["SOCIAL", "AGENCY", "CREATIVE", "STUDIO"]}
                                    className="text-2xl md:text-4xl font-black tracking-tighter text-white"
                                />
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Menu Content Grid */}
                        <div className="container mx-auto px-6 flex-1 py-10 flex flex-col justify-center items-center">
                            <div className="flex flex-col items-center space-y-8 text-center">
                                {[

                                    { label: "ABOUT", href: "/about" },
                                    { label: "WORK", href: "/work" },
                                    { label: "SOLUTIONS", href: "/solutions" },
                                    { label: "CLIENTS", href: "/clients" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.05) }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-4xl md:text-5xl font-display font-light uppercase tracking-widest hover:text-neutral-400 transition-colors block"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer / Socials inside Mobile Menu */}
                            <div className="mt-20 flex flex-wrap justify-center gap-8 text-[10px] text-neutral-500 uppercase tracking-[0.25em] font-bold">
                                <Link href="https://www.linkedin.com/company/bigtopsocial" className="hover:text-white transition-colors">LinkedIn</Link>
                                <Link href="https://www.instagram.com/bigtopsocial.official/" className="hover:text-white transition-colors">Instagram</Link>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
