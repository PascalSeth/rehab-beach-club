"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import crowd1 from "@/assets/crowd-1.jpg";
import cocktail1 from "@/assets/cocktail-1.jpg";
import poolside from "@/assets/poolside.jpg";
import vipArea from "@/assets/vip-area.jpg";
import oceanWaves from "@/assets/ocean-waves.jpg";
import paintCoral from "@/assets/paint-stroke-coral.png";
import paintTeal from "@/assets/paint-stroke-teal.png";
import { WaveLines } from "./WaveLines";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { src: crowd1, alt: "The Guests", speed: 0.3, x: "3%", y: "5%", w: "38%", rotate: -2 },
  { src: cocktail1, alt: "Cocktails", speed: 0.6, x: "52%", y: "8%", w: "30%", rotate: 3 },
  { src: poolside, alt: "Poolside", speed: 0.2, x: "12%", y: "42%", w: "42%", rotate: -1 },
  { src: vipArea, alt: "Cabanas", speed: 0.5, x: "58%", y: "48%", w: "34%", rotate: 2 },
  { src: oceanWaves, alt: "The Ocean", speed: 0.4, x: "30%", y: "78%", w: "35%", rotate: -1 },
];

export const FloatingGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paintRef1 = useRef<HTMLImageElement>(null);
  const paintRef2 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Paint stroke parallax
    [paintRef1.current, paintRef2.current].forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        yPercent: -40 + i * 20,
        rotation: i === 0 ? 5 : -5,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 2 },
      });
    });

    // Per-item parallax (different speeds create depth)
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      const speed = galleryItems[i].speed;

      // Scroll parallax
      gsap.to(item, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // Reveal animation
      gsap.from(item, {
        opacity: 0, scale: 1.15, y: 60, duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none reverse" },
      });
    });

    // Mouse-reactive drift
    const handleMouseMove = (e: MouseEvent) => {
      const xRatio = e.clientX / window.innerWidth - 0.5;
      const yRatio = e.clientY / window.innerHeight - 0.5;
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        const speed = galleryItems[i].speed * 30;
        gsap.to(item, { x: xRatio * speed, y: yRatio * speed * 0.5, duration: 1, ease: "power2.out" });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative min-h-[130vh] section-padding overflow-hidden">
      {/* Paint stroke decorations */}
      <img ref={paintRef1} src={paintCoral.src} alt="" className="absolute -left-20 top-[10%] w-[30vw] opacity-30 pointer-events-none" style={{ transform: "rotate(-10deg)" }} />
      <img ref={paintRef2} src={paintTeal.src} alt="" className="absolute -right-16 top-[60%] w-[25vw] opacity-25 pointer-events-none" style={{ transform: "rotate(8deg)" }} />

      {/* Section header */}
      <div className="relative z-10 text-center mb-24">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-4 font-medium">✦ The Experience ✦</p>
        <h2 className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-gradient-sand leading-[0.9]">
          Sun, Sea<br /><span className="text-gradient-warm">&amp; Soul</span>
        </h2>
      </div>

      {/* Floating images cloud — absolutely positioned */}
      <div className="relative w-full z-10" style={{ height: "85vh" }}>
        {galleryItems.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="absolute group cursor-pointer"
            style={{ left: item.x, top: item.y, width: item.w, transform: `rotate(${item.rotate}deg)` }}
          >
            <div className="relative overflow-hidden rounded-xl shadow-soft">
              <img src={item.src.src} alt={item.alt} loading="lazy" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-coral/0 group-hover:bg-coral/10 transition-colors duration-500" />
            </div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {item.alt}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <WaveLines />
      </div>
    </section>
  );
};
