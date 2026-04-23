"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const moveCursor = (e: MouseEvent) => {
      // Ring follows with spring delay
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
      // Dot follows instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const handleHover = () => {
      gsap.to(cursor, { scale: 1.5, borderColor: "hsl(197, 45%, 42%)", duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(cursor, { scale: 1, borderColor: "hsl(24, 70%, 55%)", duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    // Attach to all interactive elements
    const interactiveEls = document.querySelectorAll("a, button, [data-magnetic]");
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Ring cursor — hidden on mobile */}
      <div
        ref={cursorRef}
        className="magnetic-cursor hidden md:block"
        style={{ top: 0, left: 0 }}
      />
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "hsl(24, 70%, 55%)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};
