"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import cocktail1 from "@/assets/cocktail-1.jpg";
import food1 from "@/assets/food-1.jpg";
import food2 from "@/assets/food-2.jpg";
import sandTexture from "@/assets/sand-texture.jpg";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { name: "Grilled Lobster", description: "Ocean-fresh, flame-kissed perfection with drawn butter.", price: "$89", image: food2.src, category: "mains" },
  { name: "Wagyu Sliders", description: "A5 Japanese wagyu, truffle aioli, fresh brioche.", price: "$65", image: food1.src, category: "mains" },
  { name: "The Rehab Mojito", description: "Premium aged rum, fresh garden mint, crushed ice.", price: "$28", image: cocktail1.src, category: "drinks" },
  { name: "Sunset Margarita", description: "Añejo tequila, blood orange, agave, pink salt.", price: "$32", image: cocktail1.src, category: "drinks" },
  { name: "Truffle Fries Tower", description: "Parmesan, white truffle oil, edible gold leaf.", price: "$35", image: food1.src, category: "sides" },
];

export const LiquidMenu = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Menu Items staggered fade in
      gsap.from(itemsRef.current.filter(Boolean), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });
      
      // Feature Image fade in
      gsap.from(imageRef.current, {
        scale: 1.15,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleHover = (i: number) => {
    if (i !== activeIndex) {
      setActiveIndex(i);
      
      // Only run GSAP on the desktop feature image if it exists
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { scale: 1.1, opacity: 0.4, filter: "blur(15px)" },
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out", overwrite: true }
        );
      }
    }
  };

  return (
    <section id="menu" ref={sectionRef} className="relative min-h-screen py-32 bg-background">
      {/* Background Sand Texture (Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.10] pointer-events-none grayscale" 
        style={{ backgroundImage: `url(${sandTexture.src})`, backgroundSize: "cover", backgroundPosition: "center" }} 
      />

      <div className="container mx-auto px-6 relative z-10 h-full">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <h3 className="font-body text-[10px] md:text-xs uppercase tracking-[0.6em] text-accent mb-6">
            ✦ Culinary Excellence ✦
          </h3>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
            Savour the<br /> <span className="text-gradient-warm">Display</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
          
          {/* Left Column: Sticky Feature Image */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="sticky top-32 w-full aspect-[3/4] max-h-[75vh] rounded-2xl overflow-hidden glass-pill border border-white/5 p-2 shadow-2xl">
              <img 
                ref={imageRef}
                src={menuItems[activeIndex].image} 
                alt={menuItems[activeIndex].name}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Menu List */}
          <div className="lg:col-span-7 flex flex-col pb-32">
            {menuItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className={cn(
                  "group relative cursor-pointer border-b border-border/40 py-6 md:py-10 transition-colors duration-500",
                  activeIndex === i ? "border-accent/40" : "hover:border-foreground/20"
                )}
                onMouseEnter={() => handleHover(i)}
                onClick={() => handleHover(i)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 relative z-10">
                  
                  <div className="flex-1">
                    <span className="font-body text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-2 md:mb-3 block">
                      {item.category}
                    </span>
                    <h3 className={cn(
                      "font-display text-2xl md:text-5xl font-bold transition-all duration-700 ease-out",
                      activeIndex === i ? "text-foreground translate-x-4 md:translate-x-6" : "text-muted-foreground/40 group-hover:text-muted-foreground/80"
                    )}>
                      {item.name}
                    </h3>
                  </div>

                  <span className={cn(
                    "font-display text-lg md:text-3xl transition-all duration-700 ease-out md:text-right",
                    activeIndex === i ? "text-accent translate-x-4 md:translate-x-0" : "text-muted-foreground/20"
                  )}>
                    {item.price}
                  </span>

                </div>

                {/* Animated Description Box (CSS Grid Expansion for smooth height transition) */}
                <div className={cn(
                  "grid transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]",
                  activeIndex === i ? "grid-rows-[1fr] mt-4 md:mt-6 ml-4 md:ml-6" : "grid-rows-[0fr] mt-0 ml-0 opacity-0"
                )}>
                  <div className="overflow-hidden">
                    <p className="font-body text-xs md:text-base text-muted-foreground/80 italic pr-8 pb-4">
                      {item.description}
                    </p>
                    
                    {/* Mobile-only inline fold-out image */}
                    <div className="lg:hidden w-full max-w-[280px] aspect-[4/3] rounded-xl overflow-hidden glass-pill border border-white/10 shadow-lg mt-2 mb-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                  </div>
                </div>
                
                {/* Active Hover Background Highlight */}
                <div className={cn(
                  "absolute inset-0 bg-white/5 -z-10 rounded-xl transition-opacity duration-700 pointer-events-none",
                  activeIndex === i ? "opacity-100" : "opacity-0"
                )} />
              </div>
            ))}
            
            <div className="mt-20">
              <button className="px-10 py-5 rounded-full border border-accent/40 text-accent font-body text-[10px] sm:text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-500 cursor-pointer shadow-warm">
                View Full Culinary Experience
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
