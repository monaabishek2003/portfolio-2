import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { content } from "@/lib/content";

const { principles } = content;

export default function Principles() {
  return (
    <Section id="principles" label={principles.label} heading={principles.heading}>
      <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
        {principles.items.map((p, i) => (
          <Reveal key={p.n} delay={0.05 * i}>
            <div className="border-line border-t pt-6">
              <span className="font-mono text-xs lowercase tracking-[0.3em] text-accent">
                {p.n}
              </span>
              <h3 className="font-display mt-4 text-xl leading-snug text-fg sm:text-2xl">
                {p.title}
              </h3>
              <p className="measure mt-3 text-base leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
