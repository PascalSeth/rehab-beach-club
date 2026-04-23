"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sandTexture from "@/assets/sand-texture.jpg";
import splatter1 from "@/assets/splatter-texture-1.png";
import { HeroSequence } from "./HeroSequence";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-sequence-container",
          start: "top top",
          end: "+=400%", // Matches the canvas pinning duration perfectly
          scrub: 1.5,
        }
      });

      // ─── Phase 1: Escape the Ordinary (0% - 40% of scroll) ───
      tl.fromTo(phase1Ref.current,
        { filter: "blur(20px)", opacity: 0, scale: 0.95, y: 20 },
        { filter: "blur(0px)", opacity: 0.7, scale: 1, y: 0, duration: 2, ease: "power2.out" }
        , 0)
        .to(phase1Ref.current, {
          filter: "blur(30px)", opacity: 0, scale: 1.1, y: -40, duration: 2, ease: "power2.in"
        }, 2);

      // ─── Phase 2: Coastal Sanctuary (50% - 90% of scroll) ───
      tl.fromTo(phase2Ref.current,
        { filter: "blur(20px)", opacity: 0, scale: 0.95, y: 40 },
        { filter: "blur(0px)", opacity: 0.6, scale: 1, y: 0, duration: 2, ease: "power2.out" }
        , 5)
        .to(phase2Ref.current, {
          filter: "blur(15px)", opacity: 0, scale: 1.1, y: -40, duration: 2, ease: "power2.in"
        }, 8);

      // ─── Decorative elements parallax ───
      tl.to(".hero-corner-tl", { x: -30, y: -20, opacity: 0, duration: 10, ease: "none" }, 0);
      tl.to(".hero-corner-br", { x: 30, y: 20, opacity: 0, duration: 10, ease: "none" }, 0);
      tl.to(".hero-vignette", { opacity: 0, duration: 5, ease: "none" }, 5);
      tl.to(".hero-center-logo", { opacity: 0, scale: 1.15, filter: "blur(10px)", duration: 3, ease: "power2.in" }, 0);

    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef} className="relative w-full h-full">
      <HeroSequence className="hero-sequence-container">
      {/* ─── SUBSURFACE BRANDING - Extreme subtlety ─── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none grayscale"
        style={{ backgroundImage: `url(${sandTexture.src})`, backgroundSize: "cover" }}
      />
      <img
        src={splatter1.src}
        alt=""
        className="absolute top-0 left-0 w-full h-auto z-[1] opacity-[0.03] pointer-events-none mix-blend-multiply"
      />

      {/* ─── CINEMATIC VIGNETTE ─── */}
      <div className="hero-vignette absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* ─── CORNER ACCENT LINES ─── These drift away as you scroll */}
      {/* Top-Left */}
      <div className="hero-corner-tl absolute top-8 left-8 md:top-12 md:left-12 z-[15] pointer-events-none opacity-30">
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-accent/60 to-transparent mb-3" />
        <div className="h-16 md:h-24 w-px bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
      {/* Bottom-Right */}
      <div className="hero-corner-br absolute bottom-8 right-8 md:bottom-12 md:right-12 z-[15] pointer-events-none opacity-30 flex flex-col items-end">
        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-accent/60 to-transparent mb-3" />
        <div className="h-16 md:h-24 w-px bg-gradient-to-t from-accent/60 to-transparent self-end" />
      </div>

      {/* ─── THIN FRAME BORDER ─── Cinematic letterbox feel */}
      <div className="absolute inset-4 md:inset-8 z-[12] border border-white/[0.07] rounded-lg pointer-events-none" />

      {/* ─── CENTERED LOGO ─── Brand anchor */}
      <div className="hero-center-logo absolute inset-0 z-[14] flex items-center justify-center pointer-events-none">
        <img
          src="/logo.png"
          alt="REHAB Beach Club"
          className="w-32 md:w-48 lg:w-56 h-auto object-contain opacity-60 drop-shadow-lg"
        />
      </div>

      {/* ─── NARRATIVE CONTAINER ─── */}
      <div className="relative z-20 w-full h-full pointer-events-none overflow-hidden">

        {/* Phase 1: Escape the Ordinary (Top-Left Corner) */}
        <div ref={phase1Ref} className="absolute top-[25%] left-[5%] md:left-[8%] text-left px-4 md:px-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 md:w-14 h-px bg-gradient-to-r from-[#00f2fe] to-[#4facfe]" />
            <span className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-white/40">
              Chapter I
            </span>
          </div>
          <p className="font-display text-lg md:text-2xl tracking-[0.4em] uppercase italic leading-tight drop-shadow-sm bg-gradient-to-br from-[#00f2fe] to-[#4facfe] text-transparent bg-clip-text">
            Escape the <br className="md:hidden" /> Ordinary
          </p>
        </div>

        {/* Phase 2: Coastal Sanctuary (Bottom-Right Corner) */}
        <div ref={phase2Ref} className="absolute bottom-[12%] right-[5%] md:right-[8%] text-right px-4 md:px-0">
          <p className="font-body text-base md:text-xl uppercase tracking-[0.4em] font-light drop-shadow-sm bg-gradient-to-br from-[#f6d365] to-[#fda085] text-transparent bg-clip-text">
            Your Coastal <br className="md:hidden" /> Sanctuary
          </p>
          <div className="flex items-center justify-end gap-4 mt-4">
            <span className="font-body text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-white/40">
              Chapter II
            </span>
            <div className="w-8 md:w-14 h-px bg-gradient-to-l from-[#f6d365] to-[#fda085]" />
          </div>
        </div>

      </div>

      {/* ─── SCROLL GUIDE with "Scroll" label ─── */}
      <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40">
        <span className="font-body text-[8px] uppercase tracking-[0.5em] text-white/50">Scroll</span>
        <div className="w-px h-10 md:h-14 bg-gradient-to-b from-accent/50 to-transparent animate-pulse" />
      </div>
    </HeroSequence>
    </div>
  );
};
