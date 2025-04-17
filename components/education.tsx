"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, GraduationCap } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Education() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const educationItems = [
    {
      degree: "Licenciatura en [Tu Carrera]",
      institution: "Universidad de [Nombre]",
      period: "2018 - 2022",
      description: "Descripción breve de tus estudios, logros destacados o proyectos relevantes durante este período.",
    },
    {
      degree: "Maestría en [Tu Especialización]",
      institution: "Universidad de [Nombre]",
      period: "2022 - 2024",
      description: "Descripción breve de tus estudios de posgrado, enfoque de investigación o proyectos destacados.",
    },
    {
      degree: "Certificación en [Tecnología/Habilidad]",
      institution: "Plataforma/Institución",
      period: "2023",
      description: "Descripción de la certificación y las habilidades adquiridas.",
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
    <section id="education" ref={ref} className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-gradient-rainbow text-shadow-lg">
            {t("education.title")}
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
            {educationItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02 }} className="h-full">
                <div className="h-full rounded-lg border border-[#2a3042] bg-black p-6 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/5">
                  <div className="flex flex-col space-y-4">
                    {/* Icon */}
                    <div className="flex justify-start">
                      <div className="w-14 h-14 rounded-full bg-[#4c3a9c] flex items-center justify-center">
                        <GraduationCap size={24} className="text-white" />
                      </div>
                    </div>

                    {/* Degree */}
                    <h3 className="text-xl font-bold text-white mt-2">{item.degree}</h3>

                    {/* Institution */}
                    <p className="text-[#38bdf8]">{item.institution}</p>

                    {/* Period */}
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar size={14} className="mr-2" />
                      <span>{item.period}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mt-2">{item.description}</p>
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
