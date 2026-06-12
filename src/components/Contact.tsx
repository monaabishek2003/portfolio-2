import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { content } from "@/lib/content";

const { contact } = content;

export default function Contact() {
  const socials = contact.socials.filter((s) => s.url);

  return (
    <Section id="contact" label={contact.label} heading={contact.heading}>
      <Reveal delay={0.08}>
        <p className="measure mt-6 text-lg leading-relaxed text-muted">
          {contact.blurb}
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <a
          href={`mailto:${contact.email}`}
          className="group mt-12 inline-flex items-baseline gap-3 font-display text-3xl leading-tight text-fg transition-colors hover:text-accent sm:text-5xl"
        >
          <span className="underline decoration-1 underline-offset-[6px] decoration-[color:var(--line)] transition-colors group-hover:decoration-[color:var(--accent)]">
            {contact.email}
          </span>
          <span
            aria-hidden
            className="text-accent transition-transform duration-300 group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      </Reveal>

      {socials.length > 0 && (
        <Reveal delay={0.2}>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
