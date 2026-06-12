import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { content } from "@/lib/content";

const { now } = content;

export default function Now() {
  return (
    <Section id="now" label={now.label} heading={now.heading}>
      <Reveal delay={0.08}>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          {now.updated}
        </p>
      </Reveal>

      <dl className="mt-12 max-w-3xl">
        {now.items.map((item, i) => (
          <Reveal key={item.k} delay={0.04 * i}>
            <div className="border-line grid grid-cols-1 gap-1 border-t py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {item.k}
              </dt>
              <dd className="text-lg leading-relaxed text-fg">{item.v}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
