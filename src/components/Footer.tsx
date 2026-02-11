"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="h-[55vh] md:h-[75vh] w-full bg-white flex flex-col justify-center items-center relative z-10 overflow-hidden">
            {/* Massive Text with Borders */}
            <div className="w-full border-y border-black/5 py-8 md:py-12 mb-12 md:mb-16 flex justify-center items-center">
                <h1 className="text-[14vw] md:text-[16vw] font-black tracking-tighter leading-[0.8] text-black select-none text-center">
                    BigTopSocial
                </h1>
            </div>

            {/* Bottom Bar */}
            <div className="w-full px-6 md:px-12 mt-8 md:mt-12">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">

                    {/* Left: Socials */}
                    <div className="flex items-center gap-4">
                        {/* Dot / Logo Mark */}
                        <div className="w-2 h-2 rounded-full bg-black mr-2"></div>

                        <a href="https://www.linkedin.com/company/bigtopsocial" target="_blank" rel="noopener noreferrer" className="bg-neutral-100 hover:bg-black hover:text-white transition-colors p-2 rounded-full">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                        </a>
                        <a href="https://www.instagram.com/bigtopsocial.official/" target="_blank" rel="noopener noreferrer" className="bg-neutral-100 hover:bg-black hover:text-white transition-colors p-2 rounded-full">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="#" className="bg-neutral-100 hover:bg-black hover:text-white transition-colors p-2 rounded-full">
                            {/* YouTube placeholder */}
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                        </a>
                        <a href="#" className="bg-neutral-100 hover:bg-black hover:text-white transition-colors p-2 rounded-full">
                            {/* Facebook placeholder */}
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </a>
                    </div>

                    {/* Center: Links */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs md:text-sm font-medium tracking-wide text-black/60">
                        <Link href="/about" className="hover:text-black transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                        <Link href="/work" className="hover:text-black transition-colors">Clients</Link>
                        <Link href="#" className="hover:text-black transition-colors">Blog</Link>
                        <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
                    </div>

                    {/* Right: Credits */}
                    <div className="text-right text-[10px] md:text-xs text-neutral-500 leading-tight">
                        <a href="tel:9096076177" className="hover:text-black transition-colors block mb-1">Contact No: 90960 76177</a>
                        <p>Copyright © 2025 BigTopSocial. All rights reserved.</p>
                    </div>

                </div>
            </div>
        </footer>
    );
}
