"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, GraduationCap, Briefcase, Code, FolderKanban, Mail, Menu, X, Home } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  // Define navigation items with icons
  const navItems = [
    { id: "home", label: "Inicio", icon: <Home size={18} /> },
    { id: "about", label: t("about.title"), icon: <User size={18} /> },
    { id: "education", label: t("education.title"), icon: <GraduationCap size={18} /> },
    { id: "skills", label: t("skills.title"), icon: <Code size={18} /> },
    { id: "experience", label: t("experience.title"), icon: <Briefcase size={18} /> },
    { id: "projects", label: t("projects.title"), icon: <FolderKanban size={18} /> },
    { id: "contact", label: t("contact.title"), icon: <Mail size={18} /> },
  ]

  // Handle scroll events to update active section and navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar appearance based on scroll position
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.id)

      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle navigation click
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <motion.div className="text-white font-bold text-xl" whileHover={{ scale: 1.05 }}>
              <span className="text-gradient-rainbow">Portfolio</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-sm flex items-center gap-1.5 transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-white/10 text-neon-cyan"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={activeSection === item.id ? "text-neon-cyan" : "text-white/70"}>{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 rounded-md bg-black/50 border border-white/10"
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute right-0 top-0 h-full w-64 bg-black border-l border-white/10 shadow-xl p-4 pt-20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-3 rounded-md text-left flex items-center gap-3 ${
                      activeSection === item.id
                        ? "bg-white/10 text-neon-cyan"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={activeSection === item.id ? "text-neon-cyan" : "text-white/70"}>{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="w-32 h-1 bg-gradient-rainbow rounded-full opacity-50"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
