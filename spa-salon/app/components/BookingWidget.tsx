"use client";

import { useState } from "react";
import { Modal, MagneticButton } from "@client-demos/core";
import { config } from "../../demo.config";

export function BookingWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MagneticButton className="mt-10" onClick={() => setOpen(true)}>
        Book an Appointment
      </MagneticButton>

      <Modal open={open} onClose={() => setOpen(false)} title="Reserve Your Experience">
        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm tracking-widest uppercase text-[var(--muted)]">Select Service</label>
            <select className="p-3 bg-transparent border border-[var(--muted)]/30 rounded-[var(--radius)] focus:outline-none focus:border-[var(--accent)] text-[var(--fg)]">
              {config.services.map((s, i) => (
                <option key={i} value={s.title}>{s.title} - {s.price}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm tracking-widest uppercase text-[var(--muted)]">Date</label>
              <input type="date" className="p-3 bg-transparent border border-[var(--muted)]/30 rounded-[var(--radius)] focus:outline-none focus:border-[var(--accent)] text-[var(--fg)]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm tracking-widest uppercase text-[var(--muted)]">Time</label>
              <input type="time" className="p-3 bg-transparent border border-[var(--muted)]/30 rounded-[var(--radius)] focus:outline-none focus:border-[var(--accent)] text-[var(--fg)]" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm tracking-widest uppercase text-[var(--muted)]">Your Name</label>
            <input type="text" placeholder="Jane Doe" className="p-3 bg-transparent border border-[var(--muted)]/30 rounded-[var(--radius)] focus:outline-none focus:border-[var(--accent)] text-[var(--fg)]" />
          </div>

          <button type="submit" className="mt-4 p-4 bg-[var(--accent)] text-[var(--bg)] font-medium uppercase tracking-widest rounded-[var(--radius)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors">
            Confirm Booking
          </button>
        </form>
      </Modal>
    </>
  );
}
