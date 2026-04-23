"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, Check, ChevronRight, Users, Calendar, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

const experiences = [
  { 
    label: "Poolside Daybed", 
    icon: "☀️",
    price: "From $150",
    capacity: "Up to 2 Guests",
    description: "Sun-drenched luxury right at the water's edge with complimentary welcome cocktails.",
    image: "/rehab/barare.png",
  },
  { 
    label: "VVIP Cabana", 
    icon: "👑",
    price: "From $500",
    capacity: "Up to 6 Guests",
    description: "Your private sanctuary with dedicated butler service, premium spirits, and unobstructed ocean views.",
    image: "/rehab/building.png",
  },
  { 
    label: "Beach Lounge", 
    icon: "🌊",
    price: "From $80",
    capacity: "Up to 4 Guests",
    description: "Toes in the sand, signature cocktail in hand. The quintessential beach club experience.",
    image: "/rehab/eatery2.webp",
  },
  { 
    label: "Private Dining", 
    icon: "✦",
    price: "From $300",
    capacity: "Up to 8 Guests",
    description: "An intimate culinary journey prepared by our executive chef, paired with premium wines.",
    image: "/rehab/eatery.png",
  },
];

const timeSlots = [
  { time: "11:00 AM", label: "Morning" },
  { time: "1:00 PM", label: "Afternoon" },
  { time: "3:00 PM", label: "Afternoon" },
  { time: "5:00 PM", label: "Golden Hour" },
  { time: "7:00 PM", label: "Sunset" },
  { time: "9:00 PM", label: "Evening" },
];

export default function ReservePage() {
  const [step, setStep] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState(-1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const canProceed = () => {
    if (step === 1) return selectedExperience >= 0;
    if (step === 2) return selectedDate && selectedTime;
    if (step === 3) return name && email;
    return false;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
        <div className="text-center max-w-md">
          {/* Success Animation */}
          <div className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Check className="w-10 h-10 text-accent" />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Reservation Confirmed
          </h1>
          <p className="font-body text-sm text-muted-foreground/70 mb-3 leading-relaxed">
            Your {experiences[selectedExperience].label} experience has been reserved for{" "}
            <span className="text-foreground font-medium">{selectedDate}</span> at{" "}
            <span className="text-foreground font-medium">{selectedTime}</span>.
          </p>
          <p className="font-body text-xs text-muted-foreground/50 mb-10">
            A confirmation email has been sent to <span className="text-accent">{email}</span>
          </p>

          <div className="rounded-2xl border border-border/40 p-6 mb-10 text-left bg-white/[0.02]">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Experience</span>
                <span className="font-body text-sm font-medium">{experiences[selectedExperience].label}</span>
              </div>
              <div className="h-px bg-border/30" />
              <div className="flex justify-between">
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Guests</span>
                <span className="font-body text-sm font-medium">{guestCount}</span>
              </div>
              <div className="h-px bg-border/30" />
              <div className="flex justify-between">
                <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Reservation ID</span>
                <span className="font-body text-sm font-medium text-accent">RHB-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
              </div>
            </div>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-body text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all duration-300 no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to REHAB
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/20">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <img src="/logo.png" alt="REHAB" className="h-6 w-auto object-contain" />
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-display transition-all duration-500",
                  step === s ? "bg-accent text-white scale-110" :
                  step > s ? "bg-accent/20 text-accent" : "bg-border/30 text-muted-foreground/40"
                )}>
                  {step > s ? <Check className="w-3 h-3" /> : s}
                </div>
                {s < 3 && <div className={cn("w-8 h-px transition-colors duration-500", step > s ? "bg-accent/40" : "bg-border/30")} />}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-border/10">
          <div 
            className="h-full bg-gradient-to-r from-accent to-[#f6d365] transition-all duration-700 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-32 px-6">
        <div className="max-w-4xl mx-auto">

          {/* ═══════ STEP 1: Choose Experience ═══════ */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="font-body text-[10px] uppercase tracking-[0.5em] text-accent">Step 1 of 3</span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-3">
                  Choose Your Experience
                </h1>
                <p className="font-body text-sm text-muted-foreground/60">
                  Select the atmosphere that matches your vision.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experiences.map((exp, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedExperience(i)}
                    className={cn(
                      "group relative rounded-2xl border overflow-hidden text-left transition-all duration-500 cursor-pointer bg-transparent",
                      selectedExperience === i 
                        ? "border-accent/50 shadow-warm ring-1 ring-accent/20" 
                        : "border-border/30 hover:border-foreground/15"
                    )}
                  >
                    {/* Image Header */}
                    <div className="relative h-36 md:h-44 overflow-hidden">
                      <img 
                        src={exp.image} 
                        alt={exp.label}
                        className={cn(
                          "w-full h-full object-cover transition-all duration-700",
                          selectedExperience === i ? "scale-100 grayscale-0" : "scale-110 grayscale-[30%]"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      
                      {/* Selection badge */}
                      <div className={cn(
                        "absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                        selectedExperience === i ? "bg-accent border-accent scale-110" : "border-white/30 bg-black/20"
                      )}>
                        {selectedExperience === i && <Check className="w-3 h-3 text-white" />}
                      </div>

                      {/* Price tag */}
                      <div className="absolute bottom-3 right-4">
                        <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/60">{exp.price}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl">{exp.icon}</span>
                        <h3 className={cn(
                          "font-display text-lg font-bold transition-colors duration-300",
                          selectedExperience === i ? "text-foreground" : "text-muted-foreground/70"
                        )}>
                          {exp.label}
                        </h3>
                      </div>
                      <p className="font-body text-xs text-muted-foreground/50 leading-relaxed mb-3">
                        {exp.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-muted-foreground/40">
                        <Users className="w-3 h-3" />
                        <span className="font-body text-[10px] uppercase tracking-[0.2em]">{exp.capacity}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ═══════ STEP 2: Date & Time ═══════ */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="font-body text-[10px] uppercase tracking-[0.5em] text-accent">Step 2 of 3</span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-3">
                  Pick Your Moment
                </h1>
                <p className="font-body text-sm text-muted-foreground/60">
                  When would you like your {experiences[selectedExperience].label} experience?
                </p>
              </div>

              <div className="space-y-10">
                {/* Date & Guests Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Select Date
                    </label>
                    <input
                      type="date"
                      min={today}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-6 py-4 rounded-xl border border-border/40 bg-transparent font-body text-base text-foreground focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all duration-300 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 flex items-center gap-2">
                      <Users className="w-3 h-3" /> Number of Guests
                    </label>
                    <div className="flex items-center gap-0 rounded-xl border border-border/40 overflow-hidden">
                      <button 
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="h-14 w-16 flex items-center justify-center text-lg text-muted-foreground hover:bg-accent/5 hover:text-accent transition-all cursor-pointer bg-transparent border-none border-r border-border/20"
                      >
                        −
                      </button>
                      <div className="flex-1 flex items-center justify-center h-14">
                        <span className="font-display text-2xl font-bold">{guestCount}</span>
                      </div>
                      <button 
                        onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                        className="h-14 w-16 flex items-center justify-center text-lg text-muted-foreground hover:bg-accent/5 hover:text-accent transition-all cursor-pointer bg-transparent border-none border-l border-border/20"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-4">
                  <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Preferred Time
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={cn(
                          "py-4 rounded-xl font-body text-center transition-all duration-300 cursor-pointer border",
                          selectedTime === slot.time
                            ? "bg-accent text-white border-accent shadow-warm"
                            : "bg-transparent text-muted-foreground/60 border-border/30 hover:border-foreground/20"
                        )}
                      >
                        <span className="block text-sm font-medium">{slot.time}</span>
                        <span className={cn(
                          "block text-[8px] uppercase tracking-[0.2em] mt-1",
                          selectedTime === slot.time ? "text-white/70" : "text-muted-foreground/30"
                        )}>
                          {slot.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════ STEP 3: Your Details ═══════ */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-4 h-4 text-accent" />
                  <span className="font-body text-[10px] uppercase tracking-[0.5em] text-accent">Step 3 of 3</span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-3">
                  Almost There
                </h1>
                <p className="font-body text-sm text-muted-foreground/60">
                  Let us know who we&apos;re welcoming.
                </p>
              </div>

              {/* Summary stripe */}
              <div className="rounded-xl border border-accent/20 bg-accent/[0.03] p-5 mb-10 flex flex-wrap gap-6 md:gap-10 items-center">
                <div>
                  <span className="font-body text-[8px] uppercase tracking-[0.3em] text-accent/60 block">Experience</span>
                  <span className="font-display text-sm font-bold">{experiences[selectedExperience].label}</span>
                </div>
                <div className="w-px h-8 bg-border/20 hidden md:block" />
                <div>
                  <span className="font-body text-[8px] uppercase tracking-[0.3em] text-accent/60 block">Date</span>
                  <span className="font-display text-sm font-bold">{selectedDate}</span>
                </div>
                <div className="w-px h-8 bg-border/20 hidden md:block" />
                <div>
                  <span className="font-body text-[8px] uppercase tracking-[0.3em] text-accent/60 block">Time</span>
                  <span className="font-display text-sm font-bold">{selectedTime}</span>
                </div>
                <div className="w-px h-8 bg-border/20 hidden md:block" />
                <div>
                  <span className="font-body text-[8px] uppercase tracking-[0.3em] text-accent/60 block">Guests</span>
                  <span className="font-display text-sm font-bold">{guestCount}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="space-y-2">
                  <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl border border-border/40 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl border border-border/40 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="space-y-2">
                  <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+233 XX XXX XXXX"
                    className="w-full px-5 py-4 rounded-xl border border-border/40 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">Special Requests</label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Birthday, allergies, preferences..."
                    className="w-full px-5 py-4 rounded-xl border border-border/40 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>
              </div>

              <p className="font-body text-[10px] text-muted-foreground/30 mt-2">
                * Required fields. No payment required — pay on arrival.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/20">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          {step > 1 ? (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => step === 3 ? handleSubmit() : setStep(step + 1)}
            disabled={!canProceed()}
            className={cn(
              "flex items-center gap-3 px-10 py-4 rounded-full font-body text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-500 cursor-pointer border-none relative overflow-hidden group",
              canProceed()
                ? "bg-accent text-white shadow-warm hover:scale-[1.02]"
                : "bg-muted/50 text-muted-foreground/30 cursor-not-allowed"
            )}
          >
            <span className="relative z-10">
              {step === 3 ? "Confirm Reservation" : "Continue"}
            </span>
            {step < 3 && <ChevronRight className="w-4 h-4 relative z-10" />}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f6d365] to-[#fda085] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
