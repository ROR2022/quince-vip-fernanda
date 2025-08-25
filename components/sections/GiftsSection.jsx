// 🎁 GiftsSection - Sección de información de regalos

import React from 'react'
import { Gift } from 'lucide-react'
import { weddingData } from '../../data/weddingData'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'
import Image from 'next/image'

export default function GiftsSection() {
  const { gifts } = weddingData

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig('gifts')
  const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    animationConfig.type,
    animationConfig.delay
  )

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(135deg, var(--color-dorado) 0%, var(--color-marfil) 50%, var(--color-verde-esmeralda) 100%)",
        position: 'relative',
        ...animationStyle
      }}
      id="gifts" 
      className="py-20 relative overflow-hidden"
    >
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-14 left-14 w-28 h-28 rounded-full bg-rojo-vino/40 animate-bounce"></div>
        <div className="absolute bottom-14 right-14 w-24 h-24 rounded-full bg-marfil/50"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-verde-esmeralda/30"></div>
      </div>

      <div className='flex justify-center mb-4'>
                <Image
                  src="/images/decoration1a1.png"
                  alt="Fecha"
                  width={200}
                  height={100}
                />
              </div>

      <div
        style={{
          animation: 'bounce1 2s ease 0s 1 normal forwards'
        }}
        className="container mx-auto px-4 bg-gradient-to-br from-marfil/85 to-marfil-suave/85 p-8 rounded-3xl border-2 border-dorado/40 shadow-2xl relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-script text-6xl bg-gradient-to-r from-dorado via-rojo-vino to-verde-esmeralda bg-clip-text text-transparent">
            🎁 Regalo
          </h2>

          <div className="bg-gradient-to-r from-verde-esmeralda/15 via-marfil to-dorado/15 rounded-2xl p-8 max-w-md mx-auto border-2 border-dorado/30 shadow-xl">
            <Gift className="w-16 h-16 text-dorado mx-auto mb-4" />
            <h3 className="font-script text-3xl text-verde-esmeralda mb-4">
              💝 {gifts.type}
            </h3>
            <p className="text-rojo-vino/80 text-lg">
              ✨ {gifts.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
