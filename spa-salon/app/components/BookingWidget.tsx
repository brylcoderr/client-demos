"use client";

import { useState } from "react";
import { Modal, MagneticButton } from "@client-demos/core";
import { demoConfig as config } from "../../demo.config";

export function BookingWidget() {
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");

  const days = [
    { num: 10, disabled: false },
    { num: 11, disabled: true },
    { num: 12, disabled: false },
    { num: 13, disabled: false }
  ];

  const times = ["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM"];

  return (
    <>
      <div className="mt-10 inline-block pointer-events-auto">
        <MagneticButton 
          onClick={() => setOpen(true)} 
          className="bg-[var(--accent)] text-[var(--on-accent)] uppercase tracking-widest text-sm hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--fg)]"
        >
          Book an Appointment
        </MagneticButton>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Reserve Your Experience">
        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm tracking-widest uppercase text-[var(--fg-muted)]">Select Service</label>
            <select className="p-3 bg-transparent border border-[var(--border)] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:border-[var(--accent)] text-[var(--fg)]">
              {config.services.map((s, i) => (
                <option key={i} value={s.title}>{s.title} - {s.price}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm tracking-widest uppercase text-[var(--fg-muted)]">Select Day</label>
            <div className="flex gap-2">
              {days.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  aria-disabled={d.disabled}
                  disabled={d.disabled}
                  onClick={() => setSelectedDay(i)}
                  className={`flex-1 p-3 border rounded-[var(--radius)] transition-colors relative
                    ${d.disabled ? "border-[var(--border)] text-[var(--fg-muted)] cursor-not-allowed line-through" : 
                      selectedDay === i ? "bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)]" : 
                      "border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg)]"
                    }
                  `}
                >
                  <span className="block text-xs uppercase">Oct</span>
                  <span className="block text-xl">{d.num}</span>
                  {d.disabled && <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase font-bold text-[var(--fg)] rotate-[-20deg]">Closed</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm tracking-widest uppercase text-[var(--fg-muted)]">Select Time</label>
            <div className="grid grid-cols-2 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className={`p-3 border rounded-[var(--radius)] transition-colors
                    ${selectedTime === t ? "bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)]" : "border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg)]"}
                  `}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="mt-4 p-4 bg-[var(--accent)] text-[var(--on-accent)] font-medium uppercase tracking-widest rounded-[var(--radius)] hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--fg)]">
            Confirm Booking
          </button>
        </form>
      </Modal>
    </>
  );
}
