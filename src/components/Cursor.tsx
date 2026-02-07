"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function Cursor() {
    const [isHovered, setIsHovered] = useState(false);

    // Use MotionValues for high-performance updates without re-renders
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            // Directly update motion values - ZERO latency
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches("a, button, input, textarea, .cursor-hover") || target.closest("a, button, input, textarea, .cursor-hover")) {
                setIsHovered(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches("a, button, input, textarea, .cursor-hover") || target.closest("a, button, input, textarea, .cursor-hover")) {
                setIsHovered(false);
            }
        };

        // Add event listeners
        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });
        window.addEventListener("mouseout", handleMouseOut, { passive: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="hidden md:block fixed top-0 left-0 w-4 h-4 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorX, // Direct mapping, no spring physics
                y: cursorY, // Direct mapping, no spring physics
                translateX: "-50%", // Center the div on the cursor
                translateY: "-50%",
            }}
            animate={{
                scale: isHovered ? 3.5 : 1, // Keep the scale animation for hover feedback
                backgroundColor: isHovered ? "white" : "transparent",
                borderWidth: isHovered ? "0px" : "1px",
            }}
            // Only animate the visual properties (scale, color), NOT the position
            transition={{
                scale: { type: "spring", stiffness: 300, damping: 20 },
                default: { duration: 0.1 }
            }}
        />
    );
}
