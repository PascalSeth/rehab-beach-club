import paintCoral from "@/assets/paint-stroke-coral.png";

export const Footer = () => {
  return (
    <footer id="reserve" className="relative section-padding border-t border-border/30 overflow-hidden">
      <img
        src={paintCoral.src}
        alt=""
        className="absolute -bottom-20 -right-20 w-[30vw] opacity-15 pointer-events-none"
        style={{ transform: "rotate(45deg)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-6 font-medium">✦ Reserve ✦</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-gradient leading-[0.9] mb-6">
            Your Table<br /><span className="text-gradient-warm">Awaits</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto mb-10">
            Tables, cabanas, and VVIP packages available for your perfect day by the sea.
          </p>
          <a href="/reserve" data-magnetic className="px-12 py-4 rounded-full bg-accent text-accent-foreground font-body text-sm uppercase tracking-[0.2em] hover:shadow-lg transition-all duration-500 glow-warm cursor-pointer no-underline inline-block">
            Make a Reservation
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-border/30">
          <div className="mb-4 md:mb-0">
            <img 
              src="/logo.png" 
              alt="REHAB Logo" 
              className="w-24 h-auto object-contain opacity-80"
            />
          </div>
          <div className="flex gap-8">
            {["Instagram", "TikTok", "Twitter"].map((s) => (
              <a key={s} href="#" className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors duration-300">{s}</a>
            ))}
          </div>
          <span className="font-body text-xs text-muted-foreground mt-4 md:mt-0">© 2026 Rehab Beach Club</span>
        </div>
      </div>
    </footer>
  );
};
