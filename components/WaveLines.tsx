"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const WaveLines = ({ className = "" }: { className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll("path");
    if (!paths) return;

    paths.forEach((path, i) => {
      gsap.to(path, {
        attr: {
          d: i === 0
            ? "M0,40 C150,10 350,70 500,35 C650,0 850,55 1000,30 C1150,5 1350,50 1440,25 L1440,100 L0,100 Z"
            : "M0,55 C120,25 280,75 440,40 C600,5 760,60 920,30 C1080,0 1280,50 1440,20 L1440,100 L0,100 Z",
        },
        duration: 4 + i * 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 1440 100" className={`w-full ${className}`} preserveAspectRatio="none">
      <path
        d="M0,50 C200,20 400,80 600,40 C800,0 1000,60 1200,30 C1300,15 1400,40 1440,35 L1440,100 L0,100 Z"
        fill="hsl(197, 45%, 42%)"
        opacity="0.06"
      />
      <path
        d="M0,60 C150,30 300,80 500,45 C700,10 900,65 1100,35 C1250,15 1400,45 1440,30 L1440,100 L0,100 Z"
        fill="hsl(24, 70%, 55%)"
        opacity="0.04"
      />
    </svg>
  );
};
