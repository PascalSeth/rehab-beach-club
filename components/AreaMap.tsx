"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, useIsomorphicLayoutEffect } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const areas = [
  {
    id: "vvip",
    name: "The Pantheon",
    tagline: "VVIP Elevated Deck",
    perks: ["Private Butler Service", "Vintage Spirits Menu", "Panoramic Ocean Views"],
    image: "https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=2000&auto=format&fit=crop",
    coords: "top-[15%] left-[15%]",
  },
  {
    id: "poolside",
    name: "Liquid Oasis",
    tagline: "Poolside Cabanas",
    perks: ["Swim-up Mixology", "Misted Sunbeds", "Front-row DJ access"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2000&auto=format&fit=crop",
    coords: "top-[25%] left-[60%]",
  },
  {
    id: "stage",
    name: "The Sonic Heart",
    tagline: "Main Stage & Dancefloor",
    perks: ["Void Acoustics System", "Visual Art Projection", "Energy Center"],
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2000&auto=format&fit=crop",
    coords: "top-[65%] left-[35%]",
  },
  {
    id: "beach",
    name: "Driftwood Lounge",
    tagline: "Barefoot Luxury",
    perks: ["Bonfire Evenings", "Sunset Rituals", "Sand-side Service"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop",
    coords: "bottom-[15%] left-[55%]",
  },
];

export const AreaMap = () => {
  const [active, setActive] = useState(areas[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.from(".map-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // 2. Background Wave Animation
      gsap.to(".wave-path", {
        strokeDashoffset: 0,
        duration: 10,
        repeat: -1,
        ease: "none"
      });

      // 3. Image Transition Logic (Triggered on state change)
      gsap.fromTo(".detail-img",
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1, ease: "power4.out" }
      );

      gsap.from(".detail-text", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [active]); // Re-run animations when active area changes

  return (
    <section
      ref={containerRef}
      id="areas"
      className="relative min-h-screen bg-[#F2EFE9] py-24 md:py-40 overflow-hidden"
    >
      {/* --- BACKGROUND LAYERS --- */}

      {/* 1. Kinetic Sand Grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')]" />

      {/* 2. Animated Water Caustics (Light Reflection Effect) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/20 via-transparent to-amber-100/20 animate-pulse" />
      </div>

      {/* 3. Topographic Ripple Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <svg
          ref={waveRef}
          viewBox="0 0 1000 1000"
          className="w-[150%] h-[150%] opacity-10"
        >
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx="500" cy="500" r={100 + i * 100}
              fill="none"
              stroke="#968B72"
              strokeWidth="1"
              strokeDasharray="5 15"
              className="wave-path"
              style={{ transformOrigin: "center" }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="map-header max-w-2xl mb-20 md:mb-32">
          <span className="font-sans text-[10px] uppercase tracking-[0.8em] text-amber-900/40 font-bold block mb-4">
            The Layout
          </span>
          <h2 className="font-serif text-6xl md:text-8xl text-neutral-900 leading-[0.85]">
            Choose your <br /> <span className="italic">Vibration.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* --- LEFT: THE ARTISTIC MAP --- */}
          <div className="lg:col-span-7 relative aspect-square w-full max-w-[600px] mx-auto">
            {/* The Map Container */}
            <div className="absolute inset-0 rounded-full border border-amber-900/5 bg-white/10 backdrop-blur-[2px]" />

            {/* Area Markers */}
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActive(area)}
                className={cn(
                  "absolute flex flex-col items-center group transition-all duration-700",
                  area.coords
                )}
              >
                {/* The Pebble Marker */}
                <div className={cn(
                  "w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 relative",
                  active.id === area.id
                    ? "bg-amber-800 scale-150 shadow-[0_0_30px_rgba(146,64,14,0.6)]"
                    : "bg-neutral-300 group-hover:bg-amber-600"
                )}>
                  {active.id === area.id && (
                    <div className="absolute inset-0 rounded-full bg-amber-800 animate-ping opacity-20" />
                  )}
                </div>

                {/* Label (Floating) */}
                <span className={cn(
                  "mt-4 font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] transition-all duration-500 whitespace-nowrap",
                  active.id === area.id ? "text-amber-900 font-bold opacity-100" : "text-neutral-400 opacity-40 group-hover:opacity-100"
                )}>
                  {area.name}
                </span>
              </button>
            ))}

            {/* Central Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] select-none text-center">
              <h3 className="font-serif text-[15vw] leading-none uppercase">REHAB</h3>
            </div>
          </div>

          {/* --- RIGHT: THE IMMERSIVE DETAIL PANEL --- */}
          <div ref={detailRef} className="lg:col-span-5 w-full space-y-10">

            {/* Arched Detail Image */}
            <div className="detail-img relative aspect-[4/5] w-full rounded-t-full overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] bg-neutral-200">
              <img
                src={active.image}
                alt={active.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-amber-900/5 mix-blend-multiply" />
            </div>

            {/* Content Detail */}
            <div className="space-y-8">
              <div className="detail-text">
                <span className="font-serif italic text-amber-800/60 text-sm block mb-2">{active.tagline}</span>
                <h3 className="font-serif text-4xl md:text-5xl text-neutral-900">{active.name}</h3>
              </div>

              <ul className="detail-text space-y-4">
                {active.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    <div className="w-1.5 h-[1px] bg-amber-800" />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="detail-text pt-4">
                <button className="w-full py-6 bg-neutral-900 text-white font-sans text-[11px] uppercase tracking-[0.4em] hover:bg-amber-800 transition-all duration-500 shadow-2xl">
                  Secure The Space
                </button>
                <p className="mt-4 text-center font-serif italic text-neutral-400 text-xs">
                  *Minimum spend may apply for this area.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Navigation Aid */}
      <div className="absolute bottom-10 right-10 flex items-center gap-4 opacity-20 pointer-events-none">
        <span className="font-sans text-[9px] uppercase tracking-widest text-neutral-900">Scroll to Explore Rituals</span>
        <div className="w-12 h-px bg-neutral-900" />
      </div>
    </section>
  );
};

