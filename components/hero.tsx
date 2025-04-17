"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Code, Database, Server, Braces, Terminal, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"
import { useLanguage } from "@/context/language-context"

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate mouse position as percentage of screen
      const x = clientX / innerWidth - 0.5
      const y = clientY / innerHeight - 0.5

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Animated particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * -20,
  }))

  return (
    <section
      id="home"
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black z-10"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 cyber-grid opacity-30"></div>

        {/* Animated particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-neon-cyan/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated gradient circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-neon-cyan/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.15, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-neon-purple/10 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-[30vw] h-[30vw] rounded-full bg-neon-pink/10 blur-[100px]"
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
        />
      </div>

      {/* Floating code elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute -top-10 -left-10 opacity-10 text-neon-cyan" style={{ y }}>
          <Code size={200} strokeWidth={1} className="animate-float-slow" />
        </motion.div>
        {
        <motion.div className="absolute -bottom-10 -right-10 opacity-10 text-neon-purple" style={{ y }}>
          <Database size={200} strokeWidth={1} className="animate-float" />
        </motion.div>
        }
        <motion.div className="absolute top-1/4 right-10 opacity-10 text-neon-pink" style={{ y }}>
          <Terminal size={150} strokeWidth={1} className="animate-float-fast" />
        </motion.div>
        
        <motion.div className="absolute bottom-1/4 left-10 opacity-10 text-neon-blue" style={{ y }}>
          <Braces size={150} strokeWidth={1} className="animate-float" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div className="container mx-auto px-4 z-10 relative" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative"
        >
          {/* Logo/Avatar */}
          <motion.div
            className="mb-8 inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">
              <span className="block text-white">{t("hero.greeting")}</span>
              <span className="block mt-2 text-gradient-rainbow">
                Katherine Segura S.
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-rainbow opacity-70"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                ></motion.span>
              </span>
            </h1>
          </motion.div>

          {/* Animated typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-16 flex items-center justify-center mb-6"
          >
            <div className="text-xl md:text-2xl font-medium">
              <span className="text-white mr-2">Soy</span>
              <TypeAnimation
                sequence={[
                  "Estudiante de Ingeniería",
                  2000,
                  "Desarrollador Web",
                  2000,
                  "Programador",
                  2000,
                  "Analista de Sistemas",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="text-neon-cyan font-semibold text-shadow-cyan"
              />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-cyan-purple hover:opacity-90 transition-all duration-300 text-black font-bold relative overflow-hidden group shadow-lg"
              onClick={() => scrollToSection("about")}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/20 via-white/0 to-white/0 animate-shimmer"></span>
              <span className="relative z-10 flex items-center">
                {t("hero.cta.about")}
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-neon-purple text-neon-purple hover:bg-neon-purple/10 transition-all duration-300 shadow-[0_0_10px_rgba(208,0,255,0.2)]"
              onClick={() => scrollToSection("projects")}
            >
              <span className="flex items-center">
                {t("hero.cta.projects")}
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* Tech tags */}
          <motion.div
            className="mt-12 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-neon-cyan border border-neon-cyan/20 rounded-full p-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 hover:text-neon-cyan/80 transition-all duration-300"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown size={24} />
        </Button>
      </motion.div>
    </section>
  )
}
