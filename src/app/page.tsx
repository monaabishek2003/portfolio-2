import DayNight from "@/components/DayNight";
import WatchingClosely from "@/components/WatchingClosely";
import Whispers from "@/components/Whispers";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Principles from "@/components/Principles";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import OffTheClock from "@/components/OffTheClock";
import Now from "@/components/Now";
import Contact from "@/components/Contact";
import Closing from "@/components/Closing";
import Colophon from "@/components/Colophon";

export default function Home() {
  return (
    <DayNight>
      <main>
        <Hero />
        <Story />
        <Principles />
        <Work />
        <Projects />
        <OffTheClock />
        <Now />
        <Contact />
        <Closing />
        <Colophon />
      </main>
      <WatchingClosely />
      <Whispers />
      <Cursor />
    </DayNight>
  );
}
