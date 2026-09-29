"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "@client-demos/core";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*";

export function ScrambleText({
  text,
  tag: Tag = "h2",
  className = "",
  style = {}
}: {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}) {
  const elRef = useRef<HTMLElement>(null);

  useGsapContext(() => {
    if (!elRef.current) return;
    const el = elRef.current;
    
    // Scramble logic
    let frameRequest: number;
    const length = text.length;
    let frame = 0;
    
    const animate = () => {
      let output = "";
      const progress = frame / 30; // 30 frames total for animation
      for (let i = 0; i < length; i++) {
        if (text[i] === " ") {
          output += " ";
        } else if (i < length * progress) {
          output += text[i];
        } else {
          output += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
      }
      el.innerText = output;
      
      if (frame < 30) {
        frame++;
        frameRequest = requestAnimationFrame(animate);
      } else {
        el.innerText = text;
      }
    };

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        frame = 0;
        cancelAnimationFrame(frameRequest);
        animate();
      },
    });

    return () => cancelAnimationFrame(frameRequest);
  }, elRef);

  return (
    <Tag ref={elRef as any} className={className} style={style}>
      {/* Pre-fill with empty chars to maintain height/layout */}
      {text.replace(/./g, "\u00A0")}
    </Tag>
  );
}
