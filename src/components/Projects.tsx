import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { content } from "@/lib/content";
import type { Project } from "@/types/content";

const { projects } = content;

function Links({ project }: { project: Project }) {
  const { live, repo } = project.links;
  const hasLinks = live || repo;
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em]">
      {project.status && (
        <span className="text-accent">{project.status}</span>
      )}
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="text-fg underline decoration-from-font underline-offset-4 transition-opacity hover:opacity-60"
        >
          Live ↗
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          className="text-fg underline decoration-from-font underline-offset-4 transition-opacity hover:opacity-60"
        >
          Code ↗
        </a>
      )}
      {!hasLinks && !project.status && (
        <span className="text-muted">Private</span>
      )}
    </div>
  );
}

function StackChips({ stack }: { stack: string[] }) {
  if (stack.length === 0) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {stack.map((s) => (
        <li
          key={s}
          className="border-line rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide text-muted"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  return (
    <Section id="projects" label={projects.label} heading={projects.heading}>
      <div className="mt-16 space-y-20">
        {projects.items.map((p, i) => (
          <Reveal key={p.name} delay={0.04 * i}>
            <article
              className={
                p.hero
                  ? "border-line border-l-2 pl-6 sm:pl-10"
                  : "border-line border-t pt-8"
              }
              style={p.hero ? { borderLeftColor: "var(--accent)" } : undefined}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs tracking-widest text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs tracking-widest text-muted">
                  {p.year}
                </span>
              </div>

              <h3
                className={
                  p.hero
                    ? "font-display mt-4 text-4xl leading-tight text-fg sm:text-6xl"
                    : "font-display mt-4 text-3xl leading-tight text-fg sm:text-4xl"
                }
              >
                {p.name}
              </h3>

              <p className="mt-3 text-lg text-accent">{p.tagline}</p>

              <p
                className={`mt-5 text-base leading-relaxed text-muted ${
                  p.hero ? "max-w-2xl text-lg" : "measure"
                }`}
              >
                {p.description}
              </p>

              <StackChips stack={p.stack} />
              <Links project={p} />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
