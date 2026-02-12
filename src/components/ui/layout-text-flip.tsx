"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
    text,
    words,
    duration = 3000,
    className,
}: {
    text?: string;
    words: string[];
    duration?: number;
    className?: string;
}) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, duration);

        return () => clearInterval(interval);
    }, [words, duration]);

    const currentWord = words[index];

    return (
        <div className={cn("flex flex-row items-center leading-none", className)}>
            {text && <span className="text-white font-black">{text}</span>}
            <div className="relative flex items-center overflow-hidden h-[1em] perspective-[1000px]">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentWord}
                        className="inline-block relative text-left text-[#40bbff] font-black whitespace-nowrap"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {currentWord.split("").map((letter, i) => (
                            <motion.span
                                key={`${currentWord}-${i}`}
                                variants={{
                                    initial: { y: 20, opacity: 0, rotateX: 90 },
                                    animate: { y: 0, opacity: 1, rotateX: 0 },
                                    exit: { y: -20, opacity: 0, rotateX: -90 },
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: i * 0.05,
                                }}
                                className="inline-block origin-center preserve-3d"
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
