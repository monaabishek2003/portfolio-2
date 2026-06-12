"use client";

import { motion, useReducedMotion } from "motion/react";
import { content } from "@/lib/content";
import LiveClock from "@/components/LiveClock";

const { hero } = content;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const lines = hero.headline;
  const lastIndex = lines.length - 1;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = reduce
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1, ease: EASE },
        },
      };

  const openPrestige = () =>
    window.dispatchEvent(new CustomEvent("prestige:open"));

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-12 pt-8 sm:px-10 sm:pt-10">
      <div className="mx-auto flex w-full max-w-6xl items-start justify-between">
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted sm:text-xs"
        >
          {hero.kicker}
        </motion.span>
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-mono text-[11px] tracking-[0.2em] text-muted sm:text-xs"
        >
          <LiveClock />
        </motion.span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-16"
      >
        <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          {lines.map((line, i) => {
            const isLast = i === lastIndex;
            const endsWithStop = isLast && line.trim().endsWith(".");
            const base = endsWithStop ? line.replace(/\.$/, "") : line;
            return (
              <motion.span key={i} variants={item} className="block text-fg">
                {base}
                {endsWithStop && (
                  <button
                    type="button"
                    onClick={openPrestige}
                    aria-label="A full stop. Or is it?"
                    title="."
                    data-secret
                    className="glyph-secret text-fg"
                  >
                    .
                  </button>
                )}
              </motion.span>
            );
          })}
        </h1>

        <motion.p
          variants={item}
          className="measure mt-10 text-lg leading-relaxed text-muted sm:text-xl"
        >
          {hero.intro}
        </motion.p>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            {hero.scrollHint}
          </span>
          <motion.span
            aria-hidden
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-accent"
          />
        </div>
        <button
          type="button"
          onClick={openPrestige}
          data-secret
          aria-label="A sequence some people will recognise."
          title="for those who know"
          className="hidden font-mono text-[11px] tracking-[0.25em] text-muted transition-colors hover:text-accent sm:block"
        >
          {hero.konamiHint}
        </button>
      </motion.div>
    </section>
  );
}
