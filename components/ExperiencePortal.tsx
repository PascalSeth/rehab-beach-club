"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const portals = [
  {
    title: "The Shoreline",
    tagline: "Atlantic Solitude",
    desc: "Private cabanas where the Accra breeze meets curated luxury. A sanctuary for those who seek the rhythm of the tide in absolute privacy.",
    image: "/rehab/building.png"
  },
  {
    title: "Pulse Bar",
    tagline: "Liquid Alchemy",
    desc: "Botanical cocktails and sunset infusions crafted for the high-energy coastal soul. Where mixology becomes a ritual.",
    image: "/rehab/barare.png"
  },
  {
    title: "Atlantic Eatery",
    tagline: "Coastal Gastronomy",
    desc: "The freshest catch from the Gulf of Guinea, served with a modern Ghanaian twist under the canopy of the stars.",
    image: "/rehab/eatery.png"
  },
  {
    title: "Sunset Sanctuary",
    tagline: "The Golden Shift",
    desc: "A seamless transition of energy as day rituals turn into electric nights. Witness the horizon ignite as the beats take over.",
    image: "/rehab/eatery2.webp"
  },
  {
    title: "The Jetty",
    tagline: "Endless Horizons",
    desc: "An uninterrupted, panoramic view of the Atlantic from our most exclusive deck. Floating between the sky and the sea.",
    image: "/rehab/eatery3.png"
  },
  {
    title: "Salt-Air Lounge",
    tagline: "Pure Immersion",
    desc: "Soft linens, warm sand, and the scent of the ocean. A space designed for the ultimate sensory reset and deep relaxation.",
    image: "/rehab/eatery.png"
  },
];

export const ExperiencePortal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Wave Line Animation
      gsap.fromTo(".shore-line",
        { strokeDashoffset: 1500, strokeDasharray: 1500 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
          }
        }
      );

      // 2. Individual Item Reveal (Parallax + Text Reveal)
      gsap.utils.toArray(".portal-block").forEach((block: any) => {
        const textElements = block.querySelectorAll(".reveal-text > *");
        
        gsap.from(textElements, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Parallax for the block itself
        gsap.to(block, {
          y: -100,
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#F5F2EA] py-32 md:py-56 overflow-hidden"
    >
      {/* --- BACKGROUND ART --- */}

      {/* Kinetic Sand Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')]" />

      {/* Animated Nautical Squiggle */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
        <svg viewBox="0 0 1000 6000" fill="none" className="h-full w-[800px] opacity-20">
          <path
            className="shore-line"
            d="M500 0 C 700 500, 300 1000, 500 1500 S 700 2500, 500 3000 S 300 4000, 500 4500 S 700 5500, 500 6000"
            stroke="#A59B84"
            strokeWidth="2"
            strokeDasharray="15 15"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Editorial Header */}
        <div className="max-w-4xl mb-40 md:mb-72">
          <span className="font-sans text-[10px] uppercase tracking-[0.8em] text-amber-900/40 font-bold block mb-6">
            Coastal Fragments
          </span>
          <h2 className="font-serif text-6xl md:text-[9vw] leading-[0.85] text-neutral-900 tracking-tighter">
            Where the <br /> <span className="italic">Atlantic</span> <br /> Meets the Soul.
          </h2>
          <p className="mt-12 font-sans text-sm md:text-base text-neutral-500 max-w-sm leading-relaxed uppercase tracking-widest">
            Rehab Beach Club isn’t a destination; it’s a sensory retreat. A curation of sound, taste, and salt-air atmosphere.
          </p>
        </div>

        {/* --- UNIFIED STAGGERED BLOCKS --- */}
        <div className="flex flex-col gap-32 md:gap-64">
          {portals.map((portal, i) => (
            <div
              key={i}
              className={cn(
                "portal-block flex flex-col md:flex-row items-center gap-16 md:gap-32",
                i % 2 !== 0 ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Image Column */}
              <div className="w-full md:w-6/12 flex justify-center">
                <div
                  className={cn(
                    "relative overflow-hidden w-3/4 max-w-[280px] md:max-w-[450px] md:w-full aspect-[4/5] transition-all duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] shadow-2xl group cursor-pointer",
                    i % 2 === 0 ? "rounded-t-full" : "rounded-full"
                  )}
                >
                  <img
                    src={portal.image}
                    alt={portal.title}
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-[2s] scale-110 group-hover:scale-100"
                  />
                  {/* Subtle Overlay on Hover */}
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </div>
              </div>

              {/* Text Column */}
              <div className={cn(
                "w-full md:w-5/12 text-center md:text-left mt-12 md:mt-0",
                i % 2 !== 0 ? "md:text-right" : ""
              )}>
                <div className="reveal-text">
                  <span className="font-serif italic text-xs md:text-sm text-amber-800/50 mb-4 block tracking-wider">
                    {portal.tagline}
                  </span>
                  <h4 className="font-serif text-4xl md:text-7xl text-neutral-900 mb-8 tracking-tighter leading-none">
                    {portal.title}
                  </h4>
                  <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed max-w-xs md:max-w-sm mx-auto md:mx-0 tracking-wide">
                    {portal.desc}
                  </p>
                  
                  <div className={cn(
                    "mt-12 flex items-center gap-6 group cursor-pointer",
                    i % 2 !== 0 ? "justify-end" : "justify-start"
                  )}>
                    <div className="h-px w-12 bg-neutral-900/20 group-hover:w-20 group-hover:bg-accent transition-all duration-700" />
                    <span className="text-[11px] uppercase tracking-[0.4em] text-neutral-400 group-hover:text-neutral-900 transition-colors">
                      Explore Ritual
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-80 flex flex-col items-center justify-center relative z-20">
          <div className="w-px h-24 bg-neutral-900/20 mb-12" />
          <h3 className="font-serif text-5xl md:text-8xl text-neutral-900 mb-16 italic text-center tracking-tighter">
            Your ritual <br /> starts here.
          </h3>
          <button className="group relative px-16 py-6 bg-neutral-900 text-white font-sans text-xs uppercase tracking-[0.5em] overflow-hidden transition-all duration-700 hover:bg-amber-900">
            <span className="relative z-10">Book Your Cabana</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
          </button>
        </div>

      </div>

      {/* Massive Faded Text */}
      <div className="absolute bottom-20 left-10 md:left-20 opacity-[0.03] pointer-events-none select-none z-0">
        <h2 className="font-serif text-[35vw] leading-none uppercase tracking-tighter mix-blend-multiply">Accra</h2>
      </div>
    </section>
  );
};