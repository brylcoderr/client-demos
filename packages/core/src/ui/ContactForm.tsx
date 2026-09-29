"use client";

/**
 * ContactForm
 *
 * Front-end-only contact form with animated validation states,
 * success animation, accessible labels, and aria-live feedback region.
 *
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 */

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FieldState {
  value: string;
  touched: boolean;
  error: string;
}

function validate(name: string, value: string): string {
  if (!value.trim()) return `${name} is required`;
  if (name === "Email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
  return "";
}

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fields, setFields] = useState<Record<string, FieldState>>({
    Name: { value: "", touched: false, error: "" },
    Email: { value: "", touched: false, error: "" },
    Message: { value: "", touched: false, error: "" },
  });
  const formRef = useRef<HTMLFormElement>(null);

  const updateField = (name: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: { value, touched: prev[name].touched, error: prev[name].touched ? validate(name, value) : "" },
    }));
  };

  const touchField = (name: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: { ...prev[name], touched: true, error: validate(name, prev[name].value) },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all fields
    const touched = Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [k, { ...v, touched: true, error: validate(k, v.value) }])
    );
    setFields(touched);

    if (Object.values(touched).some((f) => f.error)) return;

    setStatus("submitting");
    // Simulate network request
    setTimeout(() => setStatus("success"), 1500);
  };

  const inputClasses = (name: string) =>
    `w-full bg-transparent border-b ${
      fields[name].touched && fields[name].error ? "border-[var(--fg)]" : "border-[var(--fg-muted)]/30 focus:border-[var(--accent)]"
    } py-3 px-1 outline-none transition-colors duration-300 text-[var(--fg)]`;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={`w-full max-w-xl mx-auto flex flex-col gap-6 ${className ?? ""}`} noValidate>
      <div aria-live="polite" className="sr-only">
        {status === "success" && "Message sent successfully."}
        {status === "error" && "Something went wrong. Please try again."}
      </div>

      {(["Name", "Email", "Message"] as const).map((name) => (
        <div key={name} className="flex flex-col gap-1">
          <label htmlFor={`cf-${name}`} className="text-xs uppercase tracking-[0.2em] text-[var(--fg-muted)]">
            {name}
          </label>
          {name === "Message" ? (
            <textarea
              id={`cf-${name}`}
              rows={4}
              value={fields[name].value}
              onChange={(e) => updateField(name, e.target.value)}
              onBlur={() => touchField(name)}
              className={inputClasses(name) + " resize-none"}
              required
            />
          ) : (
            <input
              id={`cf-${name}`}
              type={name === "Email" ? "email" : "text"}
              value={fields[name].value}
              onChange={(e) => updateField(name, e.target.value)}
              onBlur={() => touchField(name)}
              className={inputClasses(name)}
              required
            />
          )}
          <AnimatePresence>
            {fields[name].touched && fields[name].error && (
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {fields[name].error}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ))}

      <motion.button
        type="submit"
        disabled={status === "submitting" || status === "success"}
        whileTap={{ scale: 0.97 }}
        className="mt-4 min-h-[44px] bg-[var(--accent)] text-[var(--on-accent)] font-semibold uppercase tracking-widest text-sm py-4 px-8 disabled:opacity-50 hover:opacity-90 transition-opacity"
        style={{ borderRadius: "var(--radius)" }}
      >
        {status === "idle" && "Send Message"}
        {status === "submitting" && "Sending…"}
        {status === "success" && "✓ Sent!"}
        {status === "error" && "Try Again"}
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-[var(--fg)] font-bold text-sm"
          >
            Thanks! We&apos;ll be in touch shortly.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
