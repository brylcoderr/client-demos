"use client";

import React, { useState } from "react";
import { SmartImage } from "./SmartImage";

/**
 * Lightbox
 *
 * A simple lightbox component for viewing images in fullscreen.
 *
 * @example
 * ```tsx
 * <Lightbox src="gallery-1.jpg" alt="Gallery Image" />
 * ```
 */
export function Lightbox({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
        <SmartImage src={src} alt={alt} width={400} height={300} style={{ objectFit: "cover", borderRadius: "var(--radius)" }} />
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            cursor: "zoom-out",
          }}
        >
          <div style={{ maxWidth: "90%", maxHeight: "90%", position: "relative" }}>
            <SmartImage src={src} alt={alt} width={1200} height={800} style={{ objectFit: "contain", width: "100%", height: "auto" }} />
          </div>
        </div>
      )}
    </>
  );
}
