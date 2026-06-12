"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const IST = "Asia/Kolkata";

/** A quiet live clock in Chennai time — the site is alive, not a screenshot. */
export default function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: IST,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.span
      className={className}
      suppressHydrationWarning
      aria-label="Current time in Chennai"
    >
      {time ?? "--:--:--"} IST
    </motion.span>
  );
}
