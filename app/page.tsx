import { Hero } from "@/components/Hero";
import { ExperiencePortal } from "@/components/ExperiencePortal";
import { LiquidMenu } from "@/components/LiquidMenu";
import { AreaMap } from "@/components/AreaMap";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ExperiencePortal />
      <LiquidMenu />
      <AreaMap />
      <Footer />
    </>
  );
}
