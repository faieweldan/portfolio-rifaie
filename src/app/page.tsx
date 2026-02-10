import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Footer />
    </main>
  );
}
