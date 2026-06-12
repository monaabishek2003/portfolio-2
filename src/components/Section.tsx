import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface SectionProps {
  id: string;
  label?: string;
  heading?: string;
  children: ReactNode;
  className?: string;
  headingClassName?: string;
}

export default function Section({
  id,
  label,
  heading,
  children,
  className = "",
  headingClassName = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10 sm:py-36 ${className}`}
    >
      {label && (
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            {label}
          </p>
        </Reveal>
      )}
      {heading && (
        <Reveal delay={0.06}>
          <h2
            className={`font-display mt-6 max-w-3xl text-3xl leading-[1.12] tracking-tight text-fg display-balance sm:text-4xl md:text-5xl ${headingClassName}`}
          >
            {heading}
          </h2>
        </Reveal>
      )}
      {children}
    </section>
  );
}
