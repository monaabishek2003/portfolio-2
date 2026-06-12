"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { content } from "@/lib/content";

const { whispers, tabTitle } = content;
const MAX_WORD = Math.max(...whispers.keywords.map((k) => k.word.length));

/**
 * Two quiet rewards for the curious:
 *  1. Type one of the words Mona actually cares about (911, f1, nolan, …) and a
 *     small whisper surfaces, then fades. Keywords live in content.json.
 *  2. Leave the tab and the title invites you back — a nod to the closing line,
 *     "Everything I love, I came back to."
 */
export default function Whispers() {
  const [msg, setMsg] = useState<string | null>(null);

  // Keyword whispers.
  useEffect(() => {
    let buffer = "";
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onKey = (ev: KeyboardEvent) => {
      if (ev.key.length !== 1) return;
      const tag = (ev.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      buffer = (buffer + ev.key.toLowerCase()).slice(-MAX_WORD);
      const hit = whispers.keywords.find((k) => buffer.endsWith(k.word));
      if (hit) {
        buffer = "";
        setMsg(hit.text);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => setMsg(null), 2600);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer) clearTimeout(timer);
    };
  }, []);

  // "Came back" tab title.
  useEffect(() => {
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? tabTitle.away : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.title = original;
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-8 z-[55] flex justify-center"
    >
      <AnimatePresence>
        {msg && (
          <motion.span
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-lg italic"
            style={{ color: "var(--accent)" }}
          >
            {msg}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
