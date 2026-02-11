"use client";

import { motion } from "framer-motion";

const logos = [
    { name: "The Hindu", src: "./clientlogo/1.jpg" },
    { name: "BuzzInContent", src: "./clientlogo/2.jpg" },
    { name: "afaqs!", src: "./clientlogo/3.jpg" },
    { name: "Forbes", src: "./clientlogo/4.jpg" },
    { name: "e4m", src: "./clientlogo/5.jpg" },
    { name: "YourStory", src: "./clientlogo/6.jpg" },
    { name: "Storyboard18", src: "./clientlogo/7.jpg" },
    { name: "DNA", src: "./clientlogo/8.jpg" },
    { name: "Logo 9", src: "./clientlogo/9.jpg" },
    { name: "Logo 10", src: "./clientlogo/10.jpg" },
    { name: "Logo 11", src: "./clientlogo/11.jpg" },
    { name: "Logo 12", src: "./clientlogo/12.jpg" },
    { name: "Logo 13", src: "./clientlogo/13.jpg" },
];

const MarqueeRow = ({ items, direction = "left", speed = 10 }: { items: typeof logos, direction?: "left" | "right", speed?: number }) => {
    return (
        <div className="flex overflow-hidden relative w-full py-4 md:py-8">
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-100%" }}
                animate={{ x: direction === "left" ? "-100%" : 0 }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="flex items-center flex-shrink-0"
            >
                {[...items, ...items, ...items].map((logo, index) => (
                    <div key={index} className="mx-6 md:mx-12 group relative w-40 md:w-80 aspect-[3/2] flex items-center justify-center">
                        <img
                            src={logo.src}
                            alt={logo.name}
                            className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                ))}
            </motion.div>
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-100%" }}
                animate={{ x: direction === "left" ? "-100%" : 0 }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="flex items-center flex-shrink-0"
            >
                {[...items, ...items, ...items].map((logo, index) => (
                    <div key={index} className="mx-6 md:mx-12 group relative w-40 md:w-80 aspect-[3/2] flex items-center justify-center">
                        <img
                            src={logo.src}
                            alt={logo.name}
                            className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function ClientsSection() {
    // Split logos into two rows
    const row1 = logos.slice(0, 7);
    const row2 = logos.slice(7);

    return (
        <section className="py-8 md:py-24 bg-white relative overflow-hidden">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 w-16 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="container mx-auto px-6 mb-4 md:mb-12 text-center">
                <span className="text-gray-400 font-medium tracking-widest text-xs md:text-sm uppercase block mb-4">Partners</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-black">
                    Featured In
                </h2>
            </div>

            <div className="flex flex-col gap-0 md:gap-1">
                <MarqueeRow items={row1} direction="left" speed={80} />
                <MarqueeRow items={row2} direction="right" speed={90} />
            </div>
        </section>
    );
}
