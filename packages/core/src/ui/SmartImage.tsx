"use client";

import React from "react";
import Image, { ImageProps } from "next/image";

/**
 * SmartImage
 *
 * Serves local files from the public/images directory. No hotlinking.
 * Ensures images are responsive and optimized by Next.js.
 *
 * @example
 * ```tsx
 * <SmartImage src="hero.jpg" alt="Hero image" width={1200} height={800} />
 * ```
 */
export function SmartImage({ src, alt, ...props }: ImageProps) {
  const imageSrc = typeof src === "string" && !src.startsWith("/") && !src.startsWith("http")
    ? `/images/${src}`
    : src;

  return (
    <Image src={imageSrc} alt={alt || ""} {...props} />
  );
}
