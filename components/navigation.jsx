"use client"

import { useState, useEffect } from "react"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home")

  const sections = [
    { id: "home", label: "Inicio" },
    { id: "parents", label: "Padres" },
    { id: "date", label: "Fecha" },
    { id: "ceremony", label: "Ceremonia" },
    { id: "reception", label: "Recepción" },
    { id: "timeline", label: "Cronograma" },
    { id: "dresscode", label: "Vestimenta" },
    { id: "gifts", label: "Regalos" },
    { id: "gallery", label: "Galería" },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 vip-gradient-flow backdrop-blur-md border-b-2 border-dorado/40 z-50 shadow-2xl vip-optimized">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center py-3">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-sm font-medium transition-all duration-400 whitespace-nowrap px-4 py-2 rounded-full border vip-hover-lift vip-optimized ${
                  activeSection === section.id
                    ? "text-white bg-gradient-to-r from-verde-esmeralda via-dorado to-rojo-vino border-marfil/50 shadow-xl scale-105 vip-pulse-tricolor"
                    : "text-verde-esmeralda bg-marfil/70 hover:text-white hover:bg-gradient-to-r hover:from-rojo-vino hover:to-dorado border-dorado/30 hover:border-verde-esmeralda hover:scale-102"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
