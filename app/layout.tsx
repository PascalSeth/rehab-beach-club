import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MagneticCursor } from "@/components/MagneticCursor";
import { SandParticles } from "@/components/SandParticles";
import { PaintSplatters } from "@/components/PaintSplatters";
import { OrganicBlobs } from "@/components/OrganicBlobs";
import { Navbar } from "@/components/Navbar";


export const metadata: Metadata = {
  title: "REHAB Beach Club — Luxury Redefined",
  description: "Where the ocean meets elegance. Premium beach club experience with world-class dining, entertainment, and ocean views.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>
          {/* Global animated backgrounds (fixed, z-0 to z-1) */}
          <MagneticCursor />
          <SandParticles />
          <PaintSplatters />
          <OrganicBlobs />

          {/* Navigation (fixed, z-50) */}
          <Navbar />

          {/* Content sections (relative, z-2) */}
          <main className="relative z-[2]">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
