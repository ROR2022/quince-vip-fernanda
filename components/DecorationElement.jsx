import React from 'react'
import Image from 'next/image'

const DecorationElement = () => {
    const imageUrl= '/images/decoration1.png'
  return (
    <div
      style={{
        zIndex: 5000,
      }}
      className="fixed inset-0 w-screen h-screen overflow-hidden vip-optimized"
    >
      {/* Efectos de partículas VIP */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-dorado rounded-full vip-twinkle"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-verde-esmeralda rounded-full vip-twinkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-rojo-vino rounded-full vip-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-32 w-2 h-2 bg-dorado rounded-full vip-twinkle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-verde-esmeralda rounded-full vip-twinkle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-rojo-vino rounded-full vip-twinkle" style={{ animationDelay: '2.5s' }}></div>
      </div>
      
      <Image
        src={imageUrl}
        alt="Decoración de boda VIP"
        fill
        className="object-contain vip-float-mexican"
        priority
        sizes="100vw"
      />
    </div>
  )
}

export default DecorationElement