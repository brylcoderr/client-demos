"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-16);
  const cursorY = useMotionValue(-16);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      const timeoutId = setTimeout(() => setIsTouchDevice(true), 0);
      return () => clearTimeout(timeoutId);
    }

    const moveCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest('[data-cursor]');
      const linkTarget = target.closest('a, button');
      
      let text = "";
      let hovering = false;
      let size = 32; // base size

      if (cursorTarget) {
        text = cursorTarget.getAttribute('data-cursor') || "";
        hovering = true;
        size = text ? 64 : 48;
      } else if (linkTarget) {
        hovering = true;
        size = 48;
      }

      setCursorText(text);
      setIsHovering(hovering);

      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center text-[10px] font-body tracking-widest text-background"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        width: isHovering ? (cursorText ? 64 : 48) : 32,
        height: isHovering ? (cursorText ? 64 : 48) : 32,
        backgroundColor: isHovering ? "var(--color-accent)" : "rgba(0, 0, 0, 0)",
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
    >
      <AnimatePresence>
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

