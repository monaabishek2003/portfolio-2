"use client";

import { motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";

const { closing } = content;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Closing() {
  const reduce = useReducedMotion();
  const lines = closing.lines;
  const lastIndex = lines.length - 1;

  const openPrestige = () =>
    window.dispatchEvent(new CustomEvent("prestige:open"));

  return (
    <section
      id="closing"
      className="mx-auto flex w-full max-w-6xl items-center px-6 py-12 sm:px-10 sm:py-16"
    >
      <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-7xl">
        {lines.map((line, i) => {
          const isLast = i === lastIndex;
          const endsWithStop = isLast && line.trim().endsWith(".");
          const base = endsWithStop ? line.replace(/\.$/, "") : line;
          return (
            <motion.span
              key={i}
              initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, delay: 0.12 * i, ease: EASE }}
              className="block"
            >
              {base}
              {endsWithStop && (
                <button
                  type="button"
                  onClick={openPrestige}
                  aria-label="A full stop. Or is it?"
                  title="."
                  data-secret
                  className="glyph-secret text-accent"
                >
                  .
                </button>
              )}
            </motion.span>
          );
        })}
      </h2>
    </section>
  );
}
