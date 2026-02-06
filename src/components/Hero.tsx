"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    mass: 1.2,
    restDelta: 0.001
  });

  // Animation values
  // On mobile start video higher (30vh) to reduce gap, desktop (120vh - offscreen bottom)
  const initialY = isMobile ? "30vh" : "120vh";
  const midY = isMobile ? "20vh" : "80vh"; // Heavy Lift-off point

  // Revised Animation: "Fast Fit" Reveal
  // 0 -> 0.25: Text stays visible, video waits offscreen/low
  // 0.25 -> 0.6: Video rapidly rises and scales up to fill screen (The "Fast Fit")
  const videoY = useTransform(smoothProgress, [0.2, 0.6], [initialY, "0vh"]);
  const scale = useTransform(smoothProgress, [0.2, 0.6], [0.6, 1]);
  // Keep border radius consistent/static on desktop for that "floating card" feel even when full width
  const borderRadius = useTransform(smoothProgress, [0.2, 0.6], ["2.5rem", "2.5rem"]);

  // Text fades out as video approaches
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.3], [0, -100]);

  return (
    <div ref={containerRef} className={`relative bg-neutral-950 ${isMobile ? "h-screen" : "h-[250vh]"}`}>

      {/* Sticky Container */}
      <div className={`w-full overflow-hidden flex flex-col items-center justify-center ${isMobile ? "relative h-full" : "sticky top-0 h-screen"
        }`}>

        {/* Add background ripple, pushed behind everything */}
        <div className="absolute inset-0 z-0">
          <BackgroundRippleEffect
            // Increase grid density for larger desktop screens
            rows={isMobile ? 20 : 12}
            cols={isMobile ? 12 : 35}
            cellSize={isMobile ? 40 : 60}
          />
        </div>

        {/* Heading Section */}
        <motion.div
          style={isMobile ? {} : { opacity: textOpacity, y: textY }}
          className={`absolute left-0 w-full z-10 flex flex-col items-center justify-center pointer-events-none px-4 ${isMobile ? "top-0 h-[55vh]" : "inset-0 h-full"
            }`}
        >
          {/* Badge */}
          <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-white/70">
              Creative & Tech Transformation
            </span>
          </div>

          {/* Massive Typography */}
          <div className="flex flex-col items-center leading-[0.85] select-none">
            <h1 className="text-[18vw] md:text-[12vw] font-display font-medium text-transparent stroke-text tracking-tight uppercase">
              Elevating
            </h1>
            <h1 className="text-[17vw] md:text-[12vw] font-display font-bold italic text-white tracking-tighter uppercase mt-[-1vw] md:mt-[-1.5vw]">
              Brands
            </h1>
          </div>

          {/* Subtext */}
          <p className="mt-8 text-sm md:text-lg font-light text-neutral-400 max-w-xs md:max-w-xl text-center leading-relaxed">
            We engineer emotions, curate chaos, and build digital cathedrals for the bold.
          </p>

        </motion.div>

        {/* Video Section */}
        <motion.div
          className={`absolute w-full overflow-hidden z-20 ${isMobile
            ? "bottom-0 h-[40vh] rounded-t-[2.5rem] mb-20" // Mobile: Static at bottom with rounded top
            : "top-0 h-full flex items-center justify-center" // Desktop: Fullscreen centered
            }`}
          style={isMobile ? {} : { y: videoY, scale, borderRadius }}
        >
          <div className="relative w-full h-full bg-black">
            <video
              src="/IMG_0011.MP4"
              className="w-full h-full object-cover opacity-90"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onEnded={(e) => e.currentTarget.play()}
            />
            {/* Overlay Gradient to blend video edges if needed, or keeping it raw for "pop" */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
