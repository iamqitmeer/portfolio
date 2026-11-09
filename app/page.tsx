import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import Now from "@/components/now";
import Work from "@/components/work";
import Practice from "@/components/practice";
import Marquee from "@/components/marquee";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Manifesto />
      <Now />
      <Work />
      <Practice />
      <Marquee />
      <Experience />
      <Contact />
    </main>
  );
}
