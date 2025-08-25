// 🏠 HeroSection - Sección principal/portada VIP con paleta quinceañera

import React from 'react'
import { Crown } from 'lucide-react'
import { quinceData } from '../../data/quinceData'

export default function HeroSection() {
  const { quinceañera, celebration, styling } = quinceData
  const { heroSection } = styling

  // Debug: Verificar datos
  console.log('HeroSection datos:', { quinceañera, celebration, heroSection })

  return (
    <section 
      className="min-h-screen flex flex-col justify-center items-center relative vip-gradient-background-aurora"
      style={{
        backgroundImage: `url('${quinceañera.mainImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'var(--color-aurora-rosa)', // Fallback Aurora
        position: 'relative'
      }}
    >
      {/* Overlay quinceañera Aurora Pastel */}
      {/* <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(
            135deg, 
            rgba(255, 179, 217, 0.6) 0%, 
            rgba(230, 217, 255, 0.7) 35%, 
            rgba(255, 242, 204, 0.6) 70%,
            rgba(248, 246, 240, 0.8) 100%
          )`
        }}
      ></div>
 */}
      {/* Contenido principal con animaciones VIP Aurora */}
      <div 
        className="relative z-20 text-center p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl mx-4 vip-hover-lift"
        style={{
          //backgroundColor: 'rgba(253, 252, 252, 0.95)', // Blanco seda con alta opacidad
          border: '4px solid var(--color-aurora-rosa)',
          backdropFilter: 'blur(2px)',
          boxShadow: '0 25px 50px -12px rgba(255, 179, 217, 0.4)'
        }}
      >
        {/* Decoración superior con elementos quinceañera */}
        <div 
          style={{display:'none'}}
          className="flex justify-center mb-6"
        >
          <div className="flex gap-2 vip-float-aurora">
            <span className="text-3xl">👑</span>
            <span className="text-3xl">🌹</span>
            <span className="text-3xl">✨</span>
          </div>
        </div>

        {/* Título principal con animación shimmer Aurora */}
        <h1 
          className="text-6xl md:text-8xl mb-6 font-bold vip-shimmer-aurora"
          style={{ 
            color: 'var(--color-aurora-rosa)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {celebration.title}
        </h1>

        {/* Iniciales grandes con gradiente Aurora animado */}
        <div 
          className="text-7xl mb-4 font-bold vip-pulse-aurora"
          style={{ 
            display:'none',
            background: `linear-gradient(45deg, var(--color-aurora-rosa), var(--color-aurora-lavanda), var(--color-aurora-oro), var(--color-aurora-rosa))`,
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: 'none'
          }}
        >
          {quinceañera.initials}
        </div>

        {/* Nombre de la quinceañera con fondo Aurora */}
        <h2 
          className="text-4xl md:text-5xl mb-8 font-semibold px-6 py-3 rounded-2xl"
          style={{
            backgroundColor: 'rgba(230, 217, 255, 0.4)', // Lavanda Aurora
            color: 'var(--color-aurora-rosa)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          <span>{quinceañera.name}</span>
        </h2>

        {/* Corona decorativa Aurora con animación */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Crown 
              className="w-16 h-16 animate-pulse"
              style={{ color: 'var(--color-aurora-oro)' }}
            />
            <div 
              className="absolute inset-0 w-16 h-16 rounded-full animate-ping vip-twinkle-aurora"
              style={{ backgroundColor: 'rgba(255, 179, 217, 0.3)' }} // Rosa Aurora
            ></div>
          </div>
        </div>

        {/* Frase inspiradora con fondo Aurora VIP */}
        <div 
          className="p-6 rounded-2xl vip-gradient-flow-aurora"
          style={{
            //backgroundColor: 'rgba(248, 246, 240, 0.4)', // Perla Aurora
            border: '2px solid var(--color-aurora-lavanda)'
          }}
        >
          <p 
            className="text-xl italic max-w-2xl mx-auto font-bold leading-relaxed"
            style={{ color: 'var(--color-aurora-rosa)' }}
          >
            &ldquo;{quinceañera.quote}&rdquo;
          </p>
        </div>

        {/* Fecha de los XV años con estilo Aurora VIP */}
        <div 
          className="mt-8 text-center p-6 rounded-2xl"
          style={{
            display:'none',
            backgroundColor: 'rgba(230, 217, 255, 0.4)', // Lavanda Aurora
            border: '2px solid var(--color-aurora-oro)'
          }}
        >
          <div 
            className="text-2xl font-semibold mb-2"
            style={{ color: 'var(--color-aurora-rosa)' }}
          >
            {celebration.dayName}
          </div>
          <div 
            className="text-5xl font-bold mb-2"
            style={{ color: 'var(--color-aurora-lavanda)' }}
          >
            {celebration.day}
          </div>
          <div 
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--color-aurora-oro)' }}
          >
            {celebration.month}
          </div>
          <div 
            className="text-2xl font-semibold"
            style={{ color: 'var(--color-aurora-rosa)' }}
          >
            {celebration.year}
          </div>
        </div>

        {/* Decoración inferior con emojis quinceañera Aurora animados */}
        <div 
          style={{display:'none'}}
          className="flex justify-center mt-8 gap-6 text-4xl vip-float-aurora"
        >
          <span style={{ color: 'var(--color-aurora-rosa)' }}>🌹</span>
          <span style={{ color: 'var(--color-aurora-oro)' }}>💎</span>
          <span style={{ color: 'var(--color-aurora-lavanda)' }}>👑</span>
          <span style={{ color: 'var(--color-aurora-oro)' }}>💎</span>
          <span style={{ color: 'var(--color-aurora-rosa)' }}>🌹</span>
        </div>
      </div>
    </section>
  )
}
