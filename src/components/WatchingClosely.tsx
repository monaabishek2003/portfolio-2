"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { content } from "@/lib/content";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const e = content.easterEgg;
const BEATS = [
  { label: e.pledge, text: e.pledgeText, footnote: "" },
  { label: e.turn, text: e.turnText, footnote: "" },
  { label: e.prestige, text: e.prestigeText, footnote: e.footnote },
];

/**
 * The hidden 30%. Triggered by the full stop in the hero, or the Konami code,
 * for anyone watching closely. Plays out as The Pledge / The Turn / The Prestige.
 */
export default function WatchingClosely() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const close = useCallback(() => {
    setOpen(false);
    setStep(0);
  }, []);

  const start = useCallback(() => {
    setStep(0);
    setOpen(true);
  }, []);

  // Console note for those who open the hood.
  useEffect(() => {
    console.log(
      "%cAre you watching closely?%c\nThe full stops are doors — the one after “the same answer.” and the one that closes the site. Or type “prestige”. Or ↑↑↓↓←→←→ b a.",
      "font-family:Georgia,serif;font-size:20px;font-style:italic;color:#c75e33;",
      "font-family:monospace;font-size:12px;color:#9a8f7d;"
    );
  }, []);

  // Triggers: custom event from the secret glyphs, the Konami code, and typing.
  useEffect(() => {
    const onOpen = () => start();
    window.addEventListener("prestige:open", onOpen as EventListener);

    let idx = 0;
    let buffer = "";
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        close();
        return;
      }

      // Konami code
      const want = KONAMI[idx];
      if (ev.key.toLowerCase() === want.toLowerCase()) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          start();
        }
      } else {
        idx = ev.key === KONAMI[0] ? 1 : 0;
      }

      // Typed keywords — for anyone who tries the obvious word
      if (ev.key.length === 1) {
        buffer = (buffer + ev.key.toLowerCase()).slice(-9);
        if (buffer.endsWith("prestige") || buffer.endsWith("watch")) {
          start();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("prestige:open", onOpen as EventListener);
      window.removeEventListener("keydown", onKey);
    };
  }, [start, close]);

  // Advance through the three beats.
  useEffect(() => {
    if (!open) return;
    if (step >= BEATS.length - 1) return;
    const id = setTimeout(() => setStep((s) => s + 1), 3600);
    return () => clearTimeout(id);
  }, [open, step]);

  const beat = BEATS[step];
  const isFinal = step === BEATS.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={close}
          role="dialog"
          aria-label="Are you watching closely?"
          style={{
            background: "rgba(10,8,5,0.92)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="max-w-2xl text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
                transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="font-mono text-xs uppercase tracking-[0.4em]"
                  style={{ color: "#c75e33" }}
                >
                  {beat.label}
                </p>
                <p
                  className="font-display mt-6 text-3xl leading-snug sm:text-4xl md:text-5xl"
                  style={{ color: "#f0e7d6" }}
                >
                  {beat.text}
                </p>
                {beat.footnote && (
                  <p
                    className="mt-6 font-mono text-xs lowercase tracking-widest"
                    style={{ color: "rgba(240,231,214,0.5)" }}
                  >
                    {beat.footnote}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            {isFinal && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                onClick={close}
                className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em]"
                style={{ color: "rgba(240,231,214,0.45)" }}
              >
                [ close ]
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
