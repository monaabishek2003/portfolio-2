"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";

type CursorState = "default" | "link" | "secret";

/**
 * A custom cursor for fine-pointer devices. A difference-blended ring (reads on
 * both the cream day and the ink night) trails the pointer; a crisp dot tracks
 * it exactly. The ring reacts to interactive elements, and reveals a quiet
 * "look closer" hint over hidden details — making the easter eggs discoverable
 * without giving them away. On touch devices it simply never appears.
 */
export default function Cursor() {
  const [state, setState] = useState<CursorState>("default");
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const move = (ev: MouseEvent) => {
      x.set(ev.clientX);
      y.set(ev.clientY);
      setHidden(false);

      const el = ev.target as Element | null;
      if (el?.closest("[data-secret]")) setState("secret");
      else if (el?.closest('a, button, [role="button"]')) setState("link");
      else setState("default");
    };

    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  const ringSize = state === "secret" ? 56 : state === "link" ? 44 : 30;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ mixBlendMode: "difference" }}
    >
      <motion.div
        className="absolute rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          borderColor: "#f7f1e6",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: hidden ? 0 : state === "default" ? 0.6 : 0.9,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          x,
          y,
          width: 5,
          height: 5,
          backgroundColor: "#f7f1e6",
          translateX: "-50%",
          translateY: "-50%",
          opacity: hidden ? 0 : 1,
        }}
      />
      <AnimatePresence>
        {state === "secret" && !hidden && (
          <motion.span
            className="absolute font-mono text-[9px] uppercase tracking-[0.3em]"
            style={{
              x: ringX,
              y: ringY,
              color: "#f7f1e6",
              translateX: "-50%",
              translateY: "28px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
          >
            look closer
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
