"use client";

import { motion } from "framer-motion";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { useState, useEffect } from "react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactnumber: "",
        interest: "General Inquiry",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [gridDims, setGridDims] = useState({ rows: 16, cols: 35 });

    useEffect(() => {
        const CELL_SIZE = 60;
        const update = () => {
            setGridDims({
                cols: Math.ceil(window.innerWidth / CELL_SIZE) + 2,
                rows: Math.ceil(window.innerHeight / CELL_SIZE) + 2,
            });
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus("success");
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    contactnumber: "",
                    interest: "General Inquiry",
                    message: ""
                });
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Something went wrong");
            }
        } catch {
            setSubmitStatus("error");
            setErrorMessage("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="relative min-h-screen bg-neutral-950 text-white overflow-hidden flex flex-col justify-center py-20 w-full dark">

            <div className="absolute inset-0 z-0 overflow-hidden">
                <BackgroundRippleEffect
                    rows={gridDims.rows}
                    cols={gridDims.cols}
                    cellSize={60}
                />
            </div>


            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-0">

                {/* Left: Heading */}
                <div className="space-y-6 pt-12 lg:pt-0">
                    <h1 className="text-4xl md:text-7xl font-display font-medium tracking-tight leading-[1.1]">
                        Let&apos;s make <br />
                        <span className="text-white/70">something happen</span> <br />
                        together.
                    </h1>
                    <p className="text-base md:text-lg text-white/60 max-w-md font-light">
                        Ready to elevate your brand? Drop us a line and let&apos;s start the conversation.
                    </p>
                </div>

                {/* Right: Form */}
                <div className="relative pb-24 lg:pb-0">
                    <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">

                        <div className="group">
                            <label className="block text-xs md:text-sm font-bold text-white mb-2 tracking-widest uppercase">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="WHAT'S YOUR NAME?"
                                className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-4 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:outline-none focus:border-white transition-all placeholder:text-white/50"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs md:text-sm font-bold text-white mb-2 tracking-widest uppercase">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="YOUR EMAIL ADDRESS"
                                className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-4 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:outline-none focus:border-white transition-all placeholder:text-white/50"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs md:text-sm font-bold text-white mb-2 tracking-widest uppercase">Contact Number</label>
                            <input
                                type="tel"
                                name="contactnumber"
                                value={formData.contactnumber}
                                onChange={handleChange}
                                required
                                placeholder="YOUR PHONE NUMBER"
                                className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-4 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:outline-none focus:border-white transition-all placeholder:text-white/50"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs md:text-sm font-bold text-white mb-2 tracking-widest uppercase">Project Details</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={1}
                                placeholder="YOUR MESSAGE"
                                className="w-full bg-transparent border-b-2 border-white/20 py-2 md:py-4 text-xl md:text-4xl font-display font-bold uppercase tracking-tight focus:outline-none focus:border-white transition-all placeholder:text-white/50 resize-none"
                            />
                        </div>

                        {/* Status Messages */}
                        {submitStatus === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
                            >
                                <p className="text-green-400 font-bold">✓ Message sent successfully! We&apos;ll get back to you soon.</p>
                            </motion.div>
                        )}

                        {submitStatus === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
                            >
                                <p className="text-red-400 font-bold">✗ {errorMessage}</p>
                            </motion.div>
                        )}

                        <div className="pt-4 md:pt-8 text-center md:text-left">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto px-8 md:px-12 bg-white text-black font-display font-black text-lg md:text-xl uppercase tracking-widest py-4 md:py-6 hover:bg-[#40bbff] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Sending..." : "Send Request"}
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
