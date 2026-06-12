"use client";

import { useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import type { ReactNode } from "react";

/**
 * Drives the whole-page "day -> night" arc by writing live CSS variables onto
 * the document root. The background eases from warm cream paper through a brief
 * warm dusk into espresso ink, while the text snaps from dark to light across a
 * tight band so contrast is never muddy through the crossover. The clay accent
 * stays constant — it reads on both ends.
 */
export default function DayNight({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();

  // Background eases over a short, warm band.
  const bgStops = [0, 0.47, 0.54, 1];
  const bg = useTransform(scrollYProgress, bgStops, [
    "#f3ede0",
    "#efe7d6",
    "#1c140d",
    "#0d0907",
  ]);

  // Text/line snap quickly near the centre of the background band, so we spend
  // almost no time in the low-contrast middle.
  const textStops = [0, 0.5, 0.515, 1];
  const fg = useTransform(scrollYProgress, textStops, [
    "#1b150e",
    "#1b150e",
    "#f1e8d8",
    "#f1e8d8",
  ]);
  const fgMuted = useTransform(scrollYProgress, textStops, [
    "rgba(27,21,14,0.62)",
    "rgba(27,21,14,0.62)",
    "rgba(240,230,214,0.62)",
    "rgba(240,230,214,0.62)",
  ]);
  const line = useTransform(scrollYProgress, textStops, [
    "rgba(27,21,14,0.14)",
    "rgba(27,21,14,0.14)",
    "rgba(240,230,214,0.16)",
    "rgba(240,230,214,0.16)",
  ]);

  const apply = () => {
    const s = document.documentElement.style;
    s.setProperty("--bg", bg.get());
    s.setProperty("--fg", fg.get());
    s.setProperty("--fg-muted", fgMuted.get());
    s.setProperty("--line", line.get());
  };

  useMotionValueEvent(scrollYProgress, "change", apply);

  useEffect(() => {
    apply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
