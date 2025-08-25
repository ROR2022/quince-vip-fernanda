// 🎉 ReceptionSection - Sección de información de la recepción

import React from 'react'
import { MapPin, Clock } from 'lucide-react'
import { Button } from '../ui/button'
import { weddingData } from '../../data/weddingData'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'

export default function ReceptionSection() {
  const { reception, couple } = weddingData

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig('reception')
  const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    animationConfig.type,
    animationConfig.delay
  )

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg, var(--color-verde-esmeralda) 0%, var(--color-marfil) 50%, var(--color-rojo-vino) 100%)",
        position: 'relative',
        zIndex: 5000,
        ...animationStyle
      }}
      id="reception" 
      className="py-20 relative overflow-hidden"
    >
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-dorado animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-marfil"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-rojo-vino/50"></div>
      </div>

      <div 
        style={{
          animation: 'bounce1 2s ease 0s 1 normal forwards'
        }}
        className="container mx-auto px-4 bg-gradient-to-br from-marfil/90 to-marfil-suave/90 p-8 rounded-3xl border-2 border-dorado/40 shadow-2xl"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-8xl bg-gradient-to-r from-verde-esmeralda via-dorado to-rojo-vino bg-clip-text text-transparent font-script mb-4">
            {couple.initials}
          </div>

          <h2 className="font-script text-6xl bg-gradient-to-r from-verde-esmeralda via-dorado to-rojo-vino bg-clip-text text-transparent">
            🎉 Recepción
          </h2>

          <div className="bg-gradient-to-r from-rojo-vino/10 via-marfil to-verde-esmeralda/10 rounded-2xl p-8 border-2 border-dorado/30 shadow-xl space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-dorado" />
              <span className="text-2xl font-medium text-rojo-vino/80">⏰ {reception.time}</span>
            </div>

            <h3 className="text-3xl font-bold text-verde-esmeralda">
              🏛️ {reception.name}
            </h3>

            <p className="text-xl text-verde-esmeralda/80 max-w-md mx-auto">
              📍 {reception.address}
            </p>

            <Button
              onClick={()=>window.open(reception.ubiLink, '_blank')}
              className="bg-gradient-to-r from-rojo-vino via-dorado to-verde-esmeralda hover:bg-gradient-to-l text-white rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-dorado/30 text-lg font-semibold"
            >
              <MapPin className="w-5 h-5 mr-2" />
              🗺️ Ver ubicación de la recepción
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
