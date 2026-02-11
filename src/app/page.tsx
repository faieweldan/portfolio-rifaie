import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Resume } from "@/components/resume";
import { Skills } from "@/components/skills";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Resume />
      <Footer />
    </main>
  );
}
