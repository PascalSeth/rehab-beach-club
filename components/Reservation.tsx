"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import sandTexture from "@/assets/sand-texture.jpg";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  { 
    label: "Poolside Daybed", 
    icon: "☀️", 
    capacity: "2 Guests",
    description: "Sun-drenched luxury right at the water's edge.",
  },
  { 
    label: "VVIP Cabana", 
    icon: "👑", 
    capacity: "6 Guests",
    description: "Your private sanctuary with dedicated service.",
  },
  { 
    label: "Beach Lounge", 
    icon: "🌊", 
    capacity: "4 Guests",
    description: "Toes in the sand, drink in hand.",
  },
  { 
    label: "Private Dining", 
    icon: "✦", 
    capacity: "8 Guests",
    description: "An intimate culinary journey, curated for you.",
  },
];

const timeSlots = ["11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM", "9:00 PM"];

export const Reservation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guestCount, setGuestCount] = useState(2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal
      gsap.from(".reserve-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Today's date for the date picker min
  const today = new Date().toISOString().split("T")[0];

  return (
    <section 
      id="reserve" 
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-background"
    >
      {/* Subtle sand texture */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: `url(${sandTexture.src})`, backgroundSize: "cover" }}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#00f2fe]/[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="reserve-reveal text-center mb-20 md:mb-28">
          <h3 className="font-body text-[10px] md:text-xs uppercase tracking-[0.6em] text-accent mb-6">
            ✦ Secure Your Escape ✦
          </h3>
          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
            Make a <br className="md:hidden" /> <span className="text-gradient-warm">Reservation</span>
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground/70 max-w-lg mx-auto tracking-wide">
            Select your experience, choose your moment, and let us handle the rest.
          </p>
        </div>

        <div ref={formRef} className="max-w-5xl mx-auto">

          {/* Step 1: Choose Experience */}
          <div className="reserve-reveal mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center">
                <span className="font-display text-xs font-bold text-accent">1</span>
              </div>
              <h4 className="font-body text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Choose Your Experience
              </h4>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {experiences.map((exp, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedExperience(i)}
                  className={cn(
                    "relative group p-5 md:p-6 rounded-2xl border text-left transition-all duration-500 cursor-pointer",
                    selectedExperience === i 
                      ? "border-accent/50 bg-accent/[0.05] shadow-warm" 
                      : "border-border/40 hover:border-foreground/20 bg-transparent"
                  )}
                >
                  <span className="text-2xl md:text-3xl block mb-3">{exp.icon}</span>
                  <h5 className={cn(
                    "font-display text-sm md:text-base font-bold mb-1 transition-colors duration-300",
                    selectedExperience === i ? "text-foreground" : "text-muted-foreground/70"
                  )}>
                    {exp.label}
                  </h5>
                  <p className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
                    {exp.capacity}
                  </p>

                  {/* Selection indicator */}
                  <div className={cn(
                    "absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    selectedExperience === i 
                      ? "border-accent bg-accent" 
                      : "border-border/40"
                  )}>
                    {selectedExperience === i && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Experience description */}
            <p className="font-body text-xs md:text-sm text-muted-foreground/60 italic mt-4 ml-1">
              {experiences[selectedExperience].description}
            </p>
          </div>

          {/* Step 2: Date, Time & Guests */}
          <div className="reserve-reveal mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center">
                <span className="font-display text-xs font-bold text-accent">2</span>
              </div>
              <h4 className="font-body text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Pick Your Moment
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date */}
              <div className="space-y-3">
                <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 block">
                  Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-border/40 bg-transparent font-body text-sm text-foreground focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all duration-300 appearance-none cursor-pointer"
                />
              </div>

              {/* Guests */}
              <div className="space-y-3">
                <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 block">
                  Guests
                </label>
                <div className="flex items-center gap-4 px-5 py-3 rounded-xl border border-border/40">
                  <button 
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-9 h-9 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:border-accent/40 hover:text-accent transition-all cursor-pointer bg-transparent"
                  >
                    −
                  </button>
                  <span className="font-display text-2xl font-bold flex-1 text-center">{guestCount}</span>
                  <button 
                    onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                    className="w-9 h-9 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:border-accent/40 hover:text-accent transition-all cursor-pointer bg-transparent"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Time display (selected below) */}
              <div className="space-y-3">
                <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 block">
                  Time
                </label>
                <div className="px-5 py-4 rounded-xl border border-border/40 font-body text-sm">
                  {selectedTime || <span className="text-muted-foreground/40">Select below</span>}
                </div>
              </div>
            </div>

            {/* Time slot pills */}
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={cn(
                    "px-5 py-2.5 rounded-full font-body text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer border",
                    selectedTime === slot
                      ? "bg-accent text-white border-accent shadow-warm"
                      : "bg-transparent text-muted-foreground/60 border-border/40 hover:border-foreground/20 hover:text-foreground"
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Confirm */}
          <div className="reserve-reveal">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center">
                <span className="font-display text-xs font-bold text-accent">3</span>
              </div>
              <h4 className="font-body text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Confirm & Reserve
              </h4>
            </div>

            {/* Summary Card */}
            <div className="rounded-2xl border border-border/40 p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 block mb-1">Experience</span>
                  <span className="font-display text-sm font-bold">{experiences[selectedExperience].label}</span>
                </div>
                <div>
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 block mb-1">Date</span>
                  <span className="font-display text-sm font-bold">{selectedDate || "—"}</span>
                </div>
                <div>
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 block mb-1">Time</span>
                  <span className="font-display text-sm font-bold">{selectedTime || "—"}</span>
                </div>
                <div>
                  <span className="font-body text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 block mb-1">Guests</span>
                  <span className="font-display text-sm font-bold">{guestCount} {guestCount === 1 ? "Guest" : "Guests"}</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className={cn(
                "w-full md:w-auto px-16 py-5 rounded-full font-body text-xs md:text-sm uppercase tracking-[0.3em] font-semibold transition-all duration-500 cursor-pointer border-none relative overflow-hidden group",
                selectedDate && selectedTime
                  ? "bg-accent text-white shadow-warm hover:scale-[1.02]"
                  : "bg-muted text-muted-foreground/50 cursor-not-allowed"
              )}
              disabled={!selectedDate || !selectedTime}
            >
              <span className="relative z-10">Confirm Reservation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#f6d365] to-[#fda085] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            <p className="font-body text-[10px] text-muted-foreground/40 mt-4 tracking-wide">
              No payment required. You&apos;ll receive a confirmation via email within minutes.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
