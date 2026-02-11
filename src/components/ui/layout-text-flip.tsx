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
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    useEffect(() => {
        startAnimation();
    }, [words]);

    const startAnimation = () => {
        const word = words[words.indexOf(currentWord) + 1] || words[0];
        setCurrentWord(word);
        setIsAnimating(true);
    };

    useEffect(() => {
        if (!isAnimating) {
            setTimeout(() => {
                startAnimation();
            }, duration);
        }
    }, [isAnimating]);

    return (
        <div className={cn("flex flex-row items-center leading-none", className)}>
            {text && <span className="text-white font-black">{text}</span>}
            <div className="relative flex items-center overflow-hidden h-[1em]">
                <AnimatePresence
                    mode="popLayout"
                    onExitComplete={() => {
                        setIsAnimating(false);
                    }}
                >
                    <motion.div
                        key={currentWord}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                            position: "absolute",
                            filter: "blur(8px)",
                            scale: 1.5,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10,
                        }}
                        className="inline-block relative text-left text-[#40bbff] font-black"
                    >
                        {currentWord.split("").map((letter, index) => (
                            <motion.span
                                key={currentWord + index}
                                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{
                                    delay: index * 0.08,
                                    duration: 0.4,
                                }}
                                className="inline-block"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
