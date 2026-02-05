"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const services = [
    {
        id: 1,
        title: "Photography & Videography",
        subtitle: "Scalable Infrastructure",
        description: "Capturing moments that tell stories. From high-end product shoots to cinematic brand films, we bring your vision to life.",
        theme: "bg-rose-700 text-white",
        image: "/images/1.jpg"
    },
    {
        id: 2,
        title: "Performance Marketing",
        subtitle: "Strategic Reach",
        description: "Data-backed ad placement that puts your brand in front of the right eyes at the exact right moment.",
        theme: "bg-indigo-800 text-white",
        image: "/images/1.jpg"
    },
    {
        id: 3,
        title: "Search Engine Optimization",
        subtitle: "Consumer Insights",
        description: "Decoding market trends and human behavior to turn raw data into actionable business intelligence.",
        theme: "bg-yellow-400 text-white",
        image: "/images/1.jpg"
    },
    {
        id: 4,
        title: "Social Media Marketing",
        subtitle: "Brand Identity",
        description: "Visual stories that stick. We craft identities and campaigns that refuse to be ignored.",
        theme: "bg-teal-600 text-white",
        image: "/images/1.jpg"
    },
];

export default function ServicesSection() {
    const [activeId, setActiveId] = useState<number | null>(2); // Default open second item

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 mb-12">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-black mb-4">
                    Our Expertise
                </h2>
                <div className="h-1 w-20 bg-black" />
            </div>

            {/* Interactive Strip Container */}
            <div className="h-[600px] md:h-[700px] flex flex-col md:flex-row w-full overflow-hidden">
                {services.map((service) => {
                    const isActive = activeId === service.id;

                    return (
                        <motion.div
                            key={service.id}
                            onClick={() => setActiveId(service.id)}
                            onHoverStart={() => setActiveId(service.id)}
                            layout
                            className={`relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
                ${isActive ? "flex-[4]" : "flex-[1]"} 
                ${service.theme}
                overflow-hidden group
              `}
                        >

                            {/* Flex Content */}
                            <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-between">

                                {/* Header Area */}
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-bold tracking-widest uppercase opacity-70">
                                        0{service.id}
                                    </span>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300
                        ${isActive ? "rotate-45 border-current bg-current/10" : "border-current/30"}
                    `}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19L19 5M19 5H9M19 5V15" /></svg>
                                    </div>
                                </div>

                                {/* Collapsed Vertical Text (Desktop Only) */}
                                {!isActive && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                                        <h3 className="text-4xl font-display font-bold rotate-[-90deg] whitespace-nowrap tracking-wide mb-[5px]">
                                            {service.title}
                                        </h3>
                                    </div>
                                )}

                                {/* Collapsed Horizontal Text (Mobile Only) */}
                                {!isActive && (
                                    <div className="-mt-5 md:hidden ">
                                        <h3 className="text-2xl font-display font-bold">
                                            {service.title}
                                        </h3>
                                    </div>
                                )}

                                {/* Expanded Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className={`mt-auto ${!isActive && "hidden"}`} // Hide completely when collapsed to prevent overlap
                                >
                                    <h3 className="text-4xl md:text-7xl font-display font-bold mb-4 md:mb-6 leading-none">
                                        {service.title}
                                    </h3>
                                    <p className="text-lg md:text-2xl font-light opacity-90 max-w-xl leading-relaxed mb-8">
                                        {service.description}
                                    </p>
                                    <button className="underline underline-offset-8 decoration-2 font-bold text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                                        Explore {service.subtitle}
                                    </button>
                                </motion.div>

                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
