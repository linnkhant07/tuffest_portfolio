import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { InteractiveJourney } from "@/components/InteractiveJourney";
import { NavBar } from "@/components/NavBar";
import { Projects } from "@/components/Projects";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-strong)]">
      <NavBar />
      <main>
        <Hero />
        <InteractiveJourney />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
