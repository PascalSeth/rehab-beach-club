"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;
const FRAME_PATH = (i: number) => `/gif2/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

export const HeroSequence = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pre-load all 160 frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Canvas rendering & GSAP ScrollTrigger
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Proxy object for GSAP to animate the frame index
    const seq = { frame: 0 };

    // Set canvas dimensions to window size with High-DPI support
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      
      // CSS size
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Internal high-resolution drawing buffer
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      renderFrame(seq.frame); 
    };

    const renderFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img || !context) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let xOffset = 0;
      let yOffset = 0;

      // Cover logic to maintain aspect ratio
      if (imgRatio > canvasRatio) {
        drawWidth = canvas.height * imgRatio;
        xOffset = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imgRatio;
        yOffset = (canvas.height - drawHeight) / 2;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);
    };

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%", // 400vh for a fluid 160 frame scroll
        scrub: 0.5,     // Adds leading/lagging feel for a "liquid" transitions
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(seq, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => renderFrame(seq.frame),
    });

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isLoaded, images]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-screen overflow-hidden bg-white", className)}>
      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] mb-4 text-muted-foreground animate-pulse">
            Loading "Quantum Float" {loadingProgress}%
          </p>
          <div className="w-64 h-px bg-border overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* The Canvas - Custom Blend Mode to remove white background */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block md:mix-blend-multiply transition-opacity duration-1000 z-[1]"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Layered Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {children}
      </div>
    </div>
  );
};
