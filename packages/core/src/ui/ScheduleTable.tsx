"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGsapContext } from "../hooks/useGsapContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * ScheduleTable
 *
 * A stylized table for schedules or timetables.
 *
 * @example
 * ```tsx
 * <ScheduleTable rows={[{ time: "9:00", event: "Morning Yoga" }]} />
 * ```
 */
export function ScheduleTable({ rows }: { rows: Array<{ time: string; event: string }> }) {
  const containerRef = useRef<HTMLTableElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGsapContext(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(
      "tr",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, containerRef);

  return (
    <table ref={containerRef} style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx} style={{ borderBottom: "1px solid var(--muted)" }}>
            <td style={{ padding: "1rem 0", fontWeight: "bold", width: "100px" }}>{row.time}</td>
            <td style={{ padding: "1rem 0" }}>{row.event}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
