import Hero from "@/components/hero"
import About from "@/components/about"
import Education from "@/components/education"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import FloatingIcons from "@/components/floating-icons"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c1222] text-white">
      <FloatingIcons />
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
