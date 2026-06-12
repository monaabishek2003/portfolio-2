import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { content } from "@/lib/content";

const { story } = content;

export default function Story() {
  const last = story.paragraphs.length - 1;

  return (
    <Section id="story" label={story.label} heading={story.heading}>
      <div className="measure mt-12 space-y-7">
        {story.paragraphs.map((p, i) => (
          <Reveal key={i} delay={0.04 * i} as="span">
            {i === last ? (
              <p className="font-display text-xl italic leading-relaxed text-fg sm:text-2xl">
                {p}
              </p>
            ) : (
              <p className="text-lg leading-relaxed text-muted">{p}</p>
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
