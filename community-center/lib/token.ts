"use client";

export function getToken(varName: string): string {
  if (typeof window === "undefined") return "#000000";
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}
