"use client";

import { motion } from "framer-motion";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function ContactSection() {
    return (
        <section className="relative min-h-screen bg-neutral-950 text-white overflow-hidden flex flex-col justify-center py-20 w-full dark">

            <div className="absolute inset-0 z-0">
                <BackgroundRippleEffect
                    rows={30}
                    cols={35}
                    cellSize={60}
                />
            </div>


            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-0">

                {/* Left: Heading */}
                <div className="space-y-6 pt-12 lg:pt-0">
                    <h1 className="text-4xl md:text-7xl font-display font-medium tracking-tight leading-[1.1]">
                        Let's make <br />
                        <span className="text-white/70">something happen</span> <br />
                        together.
                    </h1>
                    <p className="text-base md:text-lg text-white/60 max-w-md font-light">
                        Ready to elevate your brand? Drop us a line and let's start the conversation.
                    </p>
                </div>

                {/* Right: Deconstructed Form */}
                <div className="relative pb-24 lg:pb-0">
                    <form className="space-y-8 md:space-y-12">

                        <div className="group">
                            <label className="block text-xs md:text-sm font-bold text-white mb-2 tracking-widest uppercase">Your Name</label>
                            <input
                                type="text"
                                placeholder="WHAT'S YOUR NAME?"
                                className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-4 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:outline-none focus:border-white transition-all placeholder:text-white/50"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs md:text-sm font-bold text-white mb-2 tracking-widest uppercase">Email Address</label>
                            <input
                                type="email"
                                placeholder="YOUR EMAIL ADDRESS"
                                className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-4 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:outline-none focus:border-white transition-all placeholder:text-white/50"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs md:text-sm font-bold text-white mb-2 tracking-widest uppercase">Project Details</label>
                            <textarea
                                rows={1}
                                placeholder="YOUR MESSAGE"
                                className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-4 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:outline-none focus:border-white transition-all placeholder:text-white/50 resize-none"
                            />
                        </div>

                        <div className="pt-4 md:pt-8 text-center md:text-left">
                            <button className="w-full md:w-auto px-8 md:px-12 bg-white text-black font-display font-black text-lg md:text-xl uppercase tracking-widest py-4 md:py-6 hover:bg-[#40bbff] hover:text-white transition-all duration-300">
                                Send Request
                            </button>
                        </div>

                    </form>
                </div>

            </div>

            {/* Footer Marquee */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden py-4 border-t border-white/10 bg-black/40 backdrop-blur-md z-20">
                <motion.div
                    className="flex whitespace-nowrap text-xl md:text-3xl font-mono text-white/80"
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center mx-4 md:mx-8">
                            <span>bigtopsocial@gmail.com</span>
                            <span className="mx-4 md:mx-8 text-blue-500">✖</span>
                            <span>bigtopsocial.com</span>
                            <span className="mx-4 md:mx-8 text-blue-500">✖</span>
                        </div>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
