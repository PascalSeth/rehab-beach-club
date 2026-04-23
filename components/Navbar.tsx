"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Taste", href: "#menu" },
  { label: "Explore", href: "#areas" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isReservePage = pathname === "/reserve";

  useEffect(() => {
    if (isReservePage) return;
    const ctx = gsap.context(() => {
      // 1. Top-to-Pill Resize Animation (at 100px)
      ScrollTrigger.create({
        start: 100,
        onEnter: () => {
          gsap.to(pillRef.current, {
            maxWidth: "90%",
            borderRadius: "100px",
            y: 20,
            duration: 1,
            ease: "power3.inOut",
            overwrite: "auto"
          });
        },
        onLeaveBack: () => {
          gsap.to(pillRef.current, {
            maxWidth: "100%",
            borderRadius: "0px",
            y: 0,
            duration: 1,
            ease: "power3.inOut",
            overwrite: "auto"
          });
        },
      });

      // 2. Hide-on-Scroll Logic (after 300px)
      let lastDirection = 0;
      ScrollTrigger.create({
        start: 300,
        onUpdate: (self) => {
          if (self.direction !== lastDirection) {
            lastDirection = self.direction;
            
            if (self.direction === 1) {
              // Down -> Hide
              gsap.to(containerRef.current, { 
                yPercent: -150, 
                duration: 0.6, 
                ease: "power3.inOut",
                overwrite: true
              });
            } else {
              // Up -> Show
              gsap.to(containerRef.current, { 
                yPercent: 0, 
                duration: 0.6, 
                ease: "power3.out",
                overwrite: true
              });
            }
          }
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!pillRef.current || window.innerWidth < 768) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = pillRef.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) / 35;
    const y = (clientY - (top + height / 2)) / 15;
    
    gsap.to(pillRef.current, {
      rotateY: x,
      rotateX: -y,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(pillRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  if (isReservePage) return null;

  return (
    <>
      <header 
        ref={containerRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={pillRef}
          className="pointer-events-auto glass-pill iridescent-border flex items-center justify-between w-full h-[70px] overflow-hidden px-6 md:px-12 lg:px-24"
          style={{ perspective: "1000px" }}
        >
          {/* Logo */}
          <a href="#" className="flex-shrink-0 group flex items-center gap-2 no-underline" data-magnetic>
            <img 
              src="/logo.png" 
              alt="REHAB" 
              className="h-8 md:h-10 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform" 
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-magnetic
                className="px-5 py-2 font-body text-[10px] uppercase tracking-[0.3em] font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 relative group overflow-hidden rounded-full hover:bg-white/5 no-underline"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-coral to-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="/reserve"
              data-magnetic
              className="hidden sm:flex px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-all duration-500 glow-warm relative overflow-hidden group no-underline cursor-pointer"
            >
              <span className="relative z-10 uppercase">Reserve</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold to-coral opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Liquid Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-10 right-10 w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border-none bg-transparent cursor-pointer"
        >
          <X className="w-8 h-8 text-foreground" />
        </button>

        <div className="flex flex-col gap-8 text-center p-6">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "font-display text-4xl sm:text-6xl md:text-7xl font-bold text-gradient-sand hover:text-gradient-warm transition-all duration-500 transform no-underline",
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
          
          <a 
            href="/reserve"
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 px-10 py-4 rounded-full bg-accent text-white font-body text-xs uppercase tracking-widest flex items-center gap-3 self-center hover:scale-105 transition-all duration-300 no-underline cursor-pointer"
          >
            Make a Reservation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
        {/* Decorative background splatter in menu */}
        <div className="absolute -bottom-20 -left-20 w-[60vw] opacity-10 pointer-events-none rotate-12">
          <img src="/assets/splatter-texture-1.png" alt="" className="w-full" />
        </div>
      </div>
    </>
  );
};
