"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import splatter1 from "@/assets/splatter-texture-1.png";
import splatter2 from "@/assets/splatter-texture-2.png";
import paintCoral from "@/assets/paint-stroke-coral.png";
import paintTeal from "@/assets/paint-stroke-teal.png";

gsap.registerPlugin(ScrollTrigger);

export const PaintSplatters = () => {
  const refs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;

      // Parallax drift on full-page scroll
      gsap.to(el, {
        yPercent: -30 + i * 10,
        rotation: (i % 2 === 0 ? 1 : -1) * 8,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Subtle breathing scale (continuous)
      gsap.to(el, {
        scale: 1.05 + Math.random() * 0.05,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => { 
      ScrollTrigger.getAll().forEach((t) => t.kill()); 
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Large splatter top-left */}
      <img
        ref={(el) => { if (el) refs.current[0] = el; }}
        src={splatter1.src}
        alt=""
        className="absolute -top-20 -left-20 w-[70vw] opacity-15"
        style={{ transform: "rotate(-15deg)" }}
      />
      {/* Splatter mid-right */}
      <img
        ref={(el) => { if (el) refs.current[1] = el; }}
        src={splatter2.src}
        alt=""
        className="absolute top-[40vh] -right-32 w-[60vw] opacity-20"
        style={{ transform: "rotate(10deg) scaleX(-1)" }}
      />
      {/* Coral paint stroke bottom-left */}
      <img
        ref={(el) => { if (el) refs.current[2] = el; }}
        src={paintCoral.src}
        alt=""
        className="absolute bottom-[20vh] -left-16 w-[35vw] opacity-25"
        style={{ transform: "rotate(-5deg)" }}
      />
      {/* Teal paint stroke top-right */}
      <img
        ref={(el) => { if (el) refs.current[3] = el; }}
        src={paintTeal.src}
        alt=""
        className="absolute top-[15vh] right-10 w-[25vw] opacity-20"
        style={{ transform: "rotate(12deg)" }}
      />
      {/* Extra splatter bottom */}
      <img
        ref={(el) => { if (el) refs.current[4] = el; }}
        src={splatter1.src}
        alt=""
        className="absolute -bottom-32 left-[30vw] w-[50vw] opacity-10"
        style={{ transform: "rotate(180deg) scaleY(-1)" }}
      />
    </div>
  );
};
