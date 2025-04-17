"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, Briefcase } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Experience() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const experiences = [
    {
      position: "Desarrollador Frontend",
      company: "Empresa Tecnológica",
      period: "2022 - Presente",
      description:
        "Desarrollo de interfaces de usuario responsivas, integración con APIs y optimización de rendimiento web.",
    },
    {
      position: "Desarrollador Web Junior",
      company: "Agencia Digital",
      period: "2020 - 2022",
      description:
        "Creación de sitios web, implementación de diseños responsivos y colaboración en proyectos de e-commerce.",
    },
    {
      position: "Pasante de Desarrollo",
      company: "Startup Innovadora",
      period: "2019 - 2020",
      description:
        "Participación en el desarrollo de aplicaciones web utilizando tecnologías modernas y metodologías ágiles.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="experience" ref={ref} className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-gradient-rainbow text-shadow-lg">
            {t("experience.title")}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-rainbow mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02 }} className="h-full">
                <div className="h-full rounded-lg border border-[#2a3042] bg-black p-6 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/5">
                  <div className="flex flex-col space-y-4">
                    {/* Icon */}
                    <div className="flex justify-start">
                      <div className="w-14 h-14 rounded-full bg-[#4c3a9c] flex items-center justify-center">
                        <Briefcase size={24} className="text-white" />
                      </div>
                    </div>

                    {/* Position */}
                    <h3 className="text-xl font-bold text-white mt-2">{exp.position}</h3>

                    {/* Company */}
                    <p className="text-[#38bdf8]">{exp.company}</p>

                    {/* Period */}
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar size={14} className="mr-2" />
                      <span>{exp.period}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mt-2">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
