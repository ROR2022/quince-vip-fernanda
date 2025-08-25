// ⏰ TimelineSection - Sección de cronograma del evento

import React from 'react'
import Image from 'next/image'
import { quinceData } from '../../data/quinceData'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getAnimationConfig } from '@/data/animationConfig'

export default function TimelineSection() {
  const { timeline, messages } = quinceData

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig('timeline')
  const { ref: sectionRef, style: animationStyle } = useScrollAnimation(
    animationConfig.options,
    animationConfig.type,
    animationConfig.delay
  )
 //background: 'linear-gradient(135deg, var(--color-rojo-vino) 0%, var(--color-marfil) 50%, var(--color-verde-esmeralda) 100%)',
  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-aurora-rosa)', // Fallback Aurora
        position: 'relative',
        ...animationStyle
      }}
      id="timeline" 
      className="py-20 relative overflow-hidden vip-gradient-background-aurora"
    >
      {/* Elementos decorativos Aurora VIP */}
      <div className="absolute inset-0 opacity-8">
        <div 
          className="absolute top-16 right-16 w-30 h-30 rounded-full animate-pulse"
          style={{ backgroundColor: 'rgba(230, 217, 255, 0.4)' }} // Lavanda Aurora
        ></div>
        <div 
          className="absolute bottom-16 left-16 w-26 h-26 rounded-full"
          style={{ backgroundColor: 'rgba(255, 242, 204, 0.5)' }} // Oro Aurora
        ></div>
        <div 
          className="absolute top-1/3 left-1/3 w-22 h-22 rounded-full"
          style={{ backgroundColor: 'rgba(248, 246, 240, 0.6)' }} // Perla Aurora
        ></div>
      </div>

      <div 
        style={{
          animation: 'bounce1 2s ease 0s 1 normal forwards',
          background: 'linear-gradient(to bottom right, rgba(253, 252, 252, 0.9), rgba(250, 248, 245, 0.9))',
          border: '2px solid rgba(255, 242, 204, 0.4)' // Oro Aurora
        }}
        className="container mx-auto px-4 rounded-3xl shadow-2xl relative z-10"
      >
        <div className='flex justify-center mb-4'>
          <Image
            src="/images/decoration1a1.png"
            alt="Fecha"
            width={200}
            height={100}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent">
            <div 
              className="relative w-full h-96 rounded-2xl overflow-hidden border-2 shadow-xl"
              style={{ borderColor: 'rgba(255, 242, 204, 0.3)' }} // Oro Aurora
            >
              <div className="w-full h-full relative">
                <Image
                  src="/images/aurora_12.jpeg"
                  alt="Celebración"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 
                className="text-4xl font-bold text-center mb-8 text-purple-600"
                style={{
                  background: 'linear-gradient(90deg, var(--color-aurora-rosa), var(--color-aurora-lavanda), var(--color-aurora-oro))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  //color: 'transparent'
                }}
              >
                ⏰ Cronograma
              </h2>
              
              {timeline.map((item, index) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-5 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(to right, rgba(248, 246, 240, 0.5), rgba(250, 248, 245, 0.5))',
                    border: '1px solid rgba(255, 242, 204, 0.2)',
                    animation: `slideInRight 0.6s ease-out ${index * 0.2}s both`
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(to right, var(--color-aurora-oro), var(--color-aurora-rosa))',
                      borderColor: 'rgba(248, 246, 240, 0.3)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full"></div>
                    <span 
                      className="text-2xl filter drop-shadow-sm relative z-10 text-white"
                      role="img" 
                      aria-label={item.name}
                    >
                      {item.icon}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 
                        className="text-xl font-semibold text-purple-400"
                        //style={{ color: 'var(--color-aurora-lavanda)' }}
                      >
                        🎉 {item.name}
                      </h3>
                      <span 
                        className="text-lg font-medium"
                        style={{ color: 'var(--color-aurora-rosa)' }}
                      >
                        ⏰ {item.time}
                      </span>
                    </div>
                    
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-aurora-rosa)' }}
                    >
                      ✨ {item.description}
                    </p>
                  </div>
                  
                  <div 
                    className="hidden md:block w-2 h-2 opacity-60 rounded-full"
                    style={{ backgroundColor: 'var(--color-aurora-oro)' }}
                  ></div>
                </div>
              ))}

              <div 
                className="text-center mt-8 p-6 rounded-lg shadow-lg"
                style={{
                  background: 'linear-gradient(to right, rgba(230, 217, 255, 0.1), rgba(248, 246, 240, 1), rgba(255, 179, 217, 0.1))',
                  border: '1px solid rgba(255, 242, 204, 0.2)'
                }}
              >
                <p 
                  className="text-lg italic"
                  style={{ color: 'var(--color-aurora-rosa)' }}
                >
                  💝 &ldquo;{messages.timelineQuote}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
