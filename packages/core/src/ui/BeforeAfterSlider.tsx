"use client";

/**
 * BeforeAfterSlider
 *
 * Drag / touch slider that reveals two overlapping layers via clip-path.
 * No layout-shifting — only transform + clip-path changes.
 *
 * @example
 * ```tsx
 * <BeforeAfterSlider
 *   before={<div className="bg-red-500 w-full h-full" />}
 *   after={<div className="bg-blue-500 w-full h-full" />}
 * />
 * ```
 */

import React, { useCallback, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  before: React.ReactNode;
  after: React.ReactNode;
  className?: string;
}

export function BeforeAfterSlider({ before, after, className }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - left) / width) * 100)));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging.current) updatePos(e.clientX);
  }, [updatePos]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[4/3] overflow-hidden cursor-ew-resize select-none touch-none ${className ?? ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* Before layer (full) */}
      <div className="absolute inset-0">{before}</div>

      {/* After layer (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {after}
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
            <path d="M8 5l-5 7 5 7" />
            <path d="M16 5l5 7-5 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
