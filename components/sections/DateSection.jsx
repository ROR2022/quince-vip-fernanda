// 📅 DateSection - Sección de fecha y countdown

import React from 'react'
import CountdownTimer from '../countdown-timer'
import { quinceData } from '../../data/quinceData'
//import { useScrollAnimation } from '@/hooks/useScrollAnimation'
//import { getAnimationConfig } from '@/data/animationConfig'
import Image from 'next/image'

export default function DateSection() {
  const { celebration, messages } = quinceData

  // Configurar animación de scroll con fallback de carga inmediata
  //const animationConfig = getAnimationConfig('date')
  /* const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    'fadeIn', // Animación más suave
    animationConfig.delay,
    true // Carga inmediata como fallback
  ) */

  return (
    <section 
      //ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-aurora-rosa)', // Fallback Aurora
        position: 'relative',
        //...animationStyle
      }}
      id="date" 
      className="py-20 relative overflow-hidden"
    >
      {/* Elementos decorativos Aurora VIP */}
      {/* <div className="absolute inset-0 opacity-8">
        <div 
          className="absolute top-16 left-16 w-28 h-28 rounded-full animate-ping"
          style={{ backgroundColor: 'var(--color-aurora-oro)' }}
        ></div>
        <div 
          className="absolute bottom-16 right-16 w-24 h-24 rounded-full"
          style={{ backgroundColor: 'rgba(248, 246, 240, 0.5)' }} // Perla Aurora
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
          style={{ backgroundColor: 'rgba(230, 217, 255, 0.3)' }} // Lavanda Aurora
        ></div>
      </div> */}

      <div 
        style={{
          willChange: 'transform, opacity',
          //background: 'linear-gradient(to bottom right, rgba(253, 252, 252, 0.85), rgba(250, 248, 245, 0.85))',
          border: '2px solid rgba(255, 242, 204, 0.4)' // Oro Aurora
        }}
        className="bg-purple-400 bg-opacity-80 container mx-auto px-4 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p 
            className="text-xl italic font-medium"
            style={{ color: 'var(--color-aurora-rosa)' }}
          >
            {messages.dateMessage}
          </p>

          <h2 
            className="font-script text-6xl vip-shimmer-aurora"
            style={{ 
              background: 'linear-gradient(90deg, var(--color-aurora-rosa), var(--color-aurora-lavanda), var(--color-aurora-oro))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            📅 FECHA ESPECIAL
          </h2>

          <div 
            className="rounded-3xl p-12 max-w-md mx-auto border-2 shadow-xl"
            style={{
              background: 'linear-gradient(to right, rgba(255, 179, 217, 0.15), rgba(253, 252, 252, 1), rgba(230, 217, 255, 0.15))',
              borderColor: 'rgba(255, 179, 217, 0.4)'
            }}
          >
            <div 
              className="text-2xl font-medium mb-2"
              style={{ color: 'var(--color-aurora-rosa)' }}
            >
              🗓️ {celebration.dayName}
            </div>
            <div className='flex justify-center gap-3'>
              <div>
                <Image
                  src="/images/decoration1a.png"
                  alt="Fecha"
                  width={100}
                  height={100}
                />
              </div>
              <div 
                className="text-8xl font-bold mb-2"
                style={{ color: 'var(--color-aurora-lavanda)' }}
              >
                {celebration.day}
              </div>
              <div>
                <Image
                  src="/images/decoration1b.png"
                  alt="Fecha"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div 
              className="text-2xl font-medium mb-2 text-emerald-500"
              //style={{ color: 'var(--color-aurora-oro)' }}
            >
              {celebration.month}
            </div>
            <div 
              className="text-3xl font-medium"
              style={{ color: 'var(--color-aurora-rosa)' }}
            >
              {celebration.year}
            </div>
          </div>

          <h3 
            className="flex flex-col font-script text-4xl"
            style={{ color: 'var(--color-aurora-lavanda)' }}
          >
             <span>{messages.countdownTitle}</span>
             <span>⏰</span>
          </h3>

          <div 
            className="rounded-2xl p-6 border-2 shadow-lg"
            style={{
              //background: 'linear-gradient(to right, rgba(230, 217, 255, 0.1), rgba(253, 252, 252, 1), rgba(255, 242, 204, 0.1))',
              borderColor: 'rgba(230, 217, 255, 0.3)'
            }}
          >
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  )
}
