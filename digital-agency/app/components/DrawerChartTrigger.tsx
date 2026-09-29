"use client";

import React, { useState } from "react";
import { Drawer } from "@client-demos/core";

export function DrawerChartTrigger({ title, client }: { title: string, client: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="text-sm uppercase tracking-widest font-bold border-b border-[var(--bg)] pb-1 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bg)]"
      >
        View Data
      </button>
      
      <Drawer open={open} onClose={() => setOpen(false)} title={`${client} Performance Metrics`}>
        <div className="text-[var(--fg)] h-full flex flex-col bg-[var(--bg)]" data-surface="base">
          <h3 className="text-2xl font-bold mb-8 mt-4">Growth Over Time</h3>
          <div className="flex-1 w-full relative min-h-[300px]">
            <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="none">
               <path d="M0,300 L0,200 L150,150 L300,220 L450,100 L600,40 L600,300 Z" fill="currentColor" className="text-[var(--accent-2)] opacity-20" />
               <polyline points="0,200 150,150 300,220 450,100 600,40" fill="none" stroke="currentColor" className="text-[var(--accent-2)]" strokeWidth="4" />
               <polyline points="0,250 150,220 300,260 450,180 600,100" fill="none" stroke="currentColor" className="text-[var(--accent-3)]" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </Drawer>
    </>
  );
}
