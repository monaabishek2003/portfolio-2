import Reveal from "@/components/Reveal";
import { content } from "@/lib/content";

const { colophon, meta } = content;

export default function Colophon() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8 sm:px-10">
      <Reveal>
        <div className="border-line border-t pt-8">
          <p className="measure text-sm leading-relaxed text-muted">
            {colophon.lines[0]}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              {colophon.lines[1]}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              {meta.name}
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
