"use client";

import React from "react";

/**
 * BookingWidget
 *
 * A reusable booking widget component.
 *
 * @example
 * ```tsx
 * <BookingWidget url="https://calendly.com/user" />
 * ```
 */
export function BookingWidget({ url }: { url: string }) {
  return (
    <div style={{ width: "100%", height: "500px", borderRadius: "var(--radius)", overflow: "hidden", background: "var(--muted)" }}>
      <iframe src={url} width="100%" height="100%" frameBorder="0" style={{ minHeight: "500px" }} />
    </div>
  );
}
