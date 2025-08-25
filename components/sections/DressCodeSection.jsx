// 👗 DressCodeSection - Sección de código de vestimenta y confirmación

import React from 'react'
import { Phone } from 'lucide-react'
import { Button } from '../ui/button'
import { quinceData } from '../../data/quinceData'
import { useWhatsApp } from '../../hooks/useWhatsApp'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'
import { PiCoatHanger } from "react-icons/pi";
import Image from 'next/image'


export default function DressCodeSection() {
  const { dressCode } = quinceData
  const { confirmAttendance } = useWhatsApp()

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig('dressCode')
  const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    animationConfig.type,
    animationConfig.delay
  )

  return (
    <section
      ref={sectionRef}
      id="dresscode"
      className="py-20 relative overflow-hidden vip-gradient-background-aurora"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-aurora-rosa)', // Fallback Aurora
        zIndex: 5000,
        ...animationStyle
      }}
    >
      {/* Elementos decorativos Aurora VIP */}
      <div className="absolute inset-0 opacity-6">
        <div 
          className="absolute top-12 right-12 w-32 h-32 rounded-full animate-pulse"
          style={{ backgroundColor: 'rgba(255, 242, 204, 0.5)' }} // Oro Aurora
        ></div>
        <div 
          className="absolute bottom-12 left-12 w-28 h-28 rounded-full"
          style={{ backgroundColor: 'rgba(248, 246, 240, 0.6)' }} // Perla Aurora
        ></div>
        <div 
          className="absolute top-1/3 left-1/2 w-24 h-24 rounded-full"
          style={{ backgroundColor: 'rgba(255, 179, 217, 0.4)' }} // Rosa Aurora
        ></div>
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
          animation: 'bounce1 2s ease 0s 1 normal forwards',
          background: 'linear-gradient(to bottom right, rgba(253, 252, 252, 0.9), rgba(250, 248, 245, 0.9))',
          border: '2px solid rgba(255, 242, 204, 0.4)' // Oro Aurora
        }}
        className="container mx-auto px-4 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 
            className="text-6xl font-light mb-8 text-purple-600"
            //style={{ color: 'var(--color-aurora-lavanda)' }}
          >
             Código de Vestimenta
          </h2>

          <div 
            className="rounded-2xl p-8 hover:shadow-2xl transition-all duration-300"
            style={{
              background: 'linear-gradient(to bottom right, rgba(248, 246, 240, 1), rgba(250, 248, 245, 1))',
              border: '2px solid rgba(255, 242, 204, 0.3)',
              boxShadow: '0 20px 25px -5px rgba(230, 217, 255, 0.1)'
            }}
          >
            <div className="text-center space-y-6">
              <div 
                className="flex justify-center items-center text-6xl mb-4"
                style={{ color: 'var(--color-aurora-oro)' }}
              >
                <span>👗 </span>
                <PiCoatHanger />
              </div>
              <h3 
                className="text-3xl font-bold mb-3"
                style={{ color: 'var(--color-aurora-lavanda)' }}
              >
                 {dressCode.type}
              </h3>
              <p 
                className="text-lg"
                style={{ color: 'var(--color-aurora-rosa)' }}
              >
                ✨ {dressCode.note}
              </p>
            </div>
          </div>

          <div 
            className="rounded-2xl p-8 shadow-xl"
            style={{
              background: 'linear-gradient(to right, rgba(255, 179, 217, 0.1), rgba(248, 246, 240, 1), rgba(230, 217, 255, 0.1))',
              border: '2px solid rgba(255, 242, 204, 0.3)'
            }}
          >
            <h3 
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--color-aurora-lavanda)' }}
            >
              💌 Confirma tu asistencia
            </h3>
            <p 
              className="text-xl mb-6"
              style={{ color: 'var(--color-aurora-rosa)' }}
            >
              {dressCode.confirmationMessage}
            </p>
            <Button
              onClick={confirmAttendance}
              size="lg"
              className="text-white rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
              style={{
                background: 'linear-gradient(to right, var(--color-aurora-lavanda), var(--color-aurora-oro), var(--color-aurora-rosa))',
                border: '2px solid rgba(255, 242, 204, 0.3)'
              }}
            >
              <Phone className="w-5 h-5 mr-2" />
              📱 Confirmar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
