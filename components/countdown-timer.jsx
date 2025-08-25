"use client"

import { useState, useEffect } from "react"

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-12-15T19:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div 
    className="grid grid-cols-2 justify-center items-center gap-6 py-8">
      <div className="text-center vip-float-aurora">
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border-2 vip-pulse-aurora"
          style={{
            background: 'linear-gradient(to bottom right, var(--color-aurora-rosa), var(--color-aurora-oro))',
            borderColor: 'rgba(248, 246, 240, 0.3)'
          }}
        >
          <div className="text-3xl font-bold text-white vip-shimmer-aurora">{timeLeft.days}</div>
        </div>
        <div 
          className="text-sm font-medium mt-2"
          style={{ color: 'var(--color-aurora-rosa)' }}
        >
          📅 DÍAS
        </div>
      </div>
      
      <div className="text-center vip-float-aurora" style={{ animationDelay: '0.5s' }}>
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border-2 vip-pulse-aurora"
          style={{
            background: 'linear-gradient(to bottom right, var(--color-aurora-lavanda), var(--color-aurora-oro))',
            borderColor: 'rgba(248, 246, 240, 0.3)'
          }}
        >
          <div className="text-3xl font-bold text-white vip-shimmer-aurora">{timeLeft.hours}</div>
        </div>
        <div 
          className="text-sm font-medium mt-2"
          style={{ color: 'var(--color-aurora-lavanda)' }}
        >
          ⏰ HORAS
        </div>
      </div>
      
      
      
      <div className="text-center vip-float-aurora" style={{ animationDelay: '1s' }}>
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border-2 vip-pulse-aurora"
          style={{
            background: 'linear-gradient(to bottom right, var(--color-aurora-oro), var(--color-aurora-rosa))',
            borderColor: 'rgba(248, 246, 240, 0.3)'
          }}
        >
          <div className="text-3xl font-bold text-white vip-shimmer-aurora">{timeLeft.minutes}</div>
        </div>
        <div 
          className="text-sm font-medium mt-2"
          style={{ color: 'var(--color-aurora-oro)' }}
        >
          ⏳ MINUTOS
        </div>
      </div>
      
      <div className="text-center vip-float-aurora" style={{ animationDelay: '1.5s' }}>
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border-2 vip-pulse-aurora"
          style={{
            background: 'linear-gradient(to bottom right, var(--color-aurora-lavanda), var(--color-aurora-rosa))',
            borderColor: 'rgba(248, 246, 240, 0.3)'
          }}
        >
          <div className="text-3xl font-bold text-white vip-shimmer-aurora">{timeLeft.seconds}</div>
        </div>
        <div 
          className="text-sm font-medium mt-2"
          style={{ color: 'var(--color-aurora-lavanda)' }}
        >
          ⚡ SEGUNDOS
        </div>
      </div>
    </div>
  )
}
