import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { content } from "@/lib/content";

const { offTheClock } = content;

export default function OffTheClock() {
  return (
    <Section
      id="off-the-clock"
      label={offTheClock.label}
      heading={offTheClock.heading}
    >
      <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
        {offTheClock.items.map((item, i) => (
          <Reveal key={item.tag} delay={0.05 * i}>
            <div className="border-line border-t pt-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                {item.tag}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-fg">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
