import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { content } from "@/lib/content";

const { work } = content;

export default function Work() {
  return (
    <Section id="work" label={work.label} heading={work.heading}>
      <div className="mt-14 space-y-20">
        {work.roles.map((role, i) => (
          <Reveal key={i} delay={0.04 * i}>
            <article>
              <div className="border-line flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl leading-tight text-fg sm:text-3xl">
                    {role.company}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                    {role.companyNote}
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="text-base text-fg">{role.role}</p>
                  <p className="font-mono text-xs tracking-widest text-muted">
                    {role.period}
                  </p>
                </div>
              </div>

              <p className="measure mt-6 text-lg leading-relaxed text-muted">
                {role.summary}
              </p>

              {role.stack.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {role.stack.map((s) => (
                    <li
                      key={s}
                      className="border-line rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-8 space-y-4">
                {role.highlights.map((h, hi) => (
                  <li
                    key={hi}
                    className="relative pl-7 text-base leading-relaxed text-fg"
                  >
                    <span
                      aria-hidden
                      className="text-accent absolute left-0 top-0 font-mono"
                    >
                      ↳
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
