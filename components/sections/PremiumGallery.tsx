'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Camera } from 'lucide-react'
import Image from 'next/image'
import { useIsClient } from "@/hooks/useIsClient"
import { premiumDemoData } from "./data/premium-demo-data"

export function PremiumGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isClient = useIsClient()

  const images = premiumDemoData.gallery.images

  const [scrollPosition, setScrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
  
    const basicClass = "text-3xl md:text-4xl font-bold mb-4";
    const completeClass = "text-3xl md:text-4xl font-bold mb-4 scale-up-center";
  
    useEffect(() => {
      if (!isClient) return;
      
      // Inicializar la posición de scroll
      setScrollPosition(window.scrollY);
      
      const handleScroll = () => {
        //console.log("Scroll position:", window.scrollY);
        setScrollPosition(window.scrollY);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isClient]);
  
    useEffect(() => {
      if (scrollPosition >= 5400 && scrollPosition < 6000) {
        setIsVisible(true);
      }
    }, [scrollPosition]);
  


  const goToPrevious = useCallback(() => {
    if (!isClient) return
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }, [currentIndex, isClient, images.length])

  const goToNext = useCallback(() => {
    if (!isClient) return
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }, [currentIndex, isClient, images.length])

  const goToSlide = (slideIndex: number) => {
    if (!isClient) return
    setCurrentIndex(slideIndex)
  }

  const openModal = () => {
    if (!isClient) return
    setIsModalOpen(true)
  }

  const closeModal = useCallback(() => {
    if (!isClient) return
    setIsModalOpen(false)
  }, [isClient])

  // Event listeners solo en cliente
  useEffect(() => {
    if (!isClient) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === 'Escape' && isModalOpen) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, isModalOpen, goToNext, goToPrevious, closeModal, isClient])

  return (
    <section 
    style={{

      background: 'var(--color-aurora-rosa)',
    }}
    className="py-16 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-verde-esmeralda"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-rojo-vino"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-dorado"></div>
      </div>
      
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 relative z-10 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header premium con nueva paleta */}
        <div className="mb-12">
          <div className="inline-block text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-xl border border-dorado/30" 
               style={{ 
                 background: 'linear-gradient(135deg, var(--color-verde-esmeralda), var(--color-rojo-vino))',
                 boxShadow: '0 8px 32px rgba(13, 107, 75, 0.3)'
               }}>
            📸 Galería VIP
          </div>

          <h2 className={isVisible ? completeClass : basicClass} 
              style={{ 
                color: 'var(--color-verde-oscuro)',
                textShadow: '0 2px 4px rgba(13, 107, 75, 0.1)'
              }}>
            {premiumDemoData.gallery.title}
          </h2>
          <p className="text-xl mb-2 font-medium" 
             style={{ 
               color: 'var(--color-verde-bosque)',
               textShadow: '0 1px 2px rgba(107, 140, 90, 0.1)'
             }}>
            {premiumDemoData.gallery.subtitle}
          </p>
          <p className="text-verde-bosque/80 max-w-2xl mx-auto leading-relaxed">
            {premiumDemoData.gallery.description}
          </p>
        </div>

        <div className="divider relative">
          <div className="divider-icon relative">
            <div className="absolute inset-0 bg-gradient-to-r from-dorado to-oro-antiguo rounded-full blur-md opacity-50"></div>
            <div className="relative bg-gradient-to-r from-dorado to-oro-antiguo p-3 rounded-full">
              <Camera className="w-8 h-8 text-verde-oscuro" />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <p className='text-verde-oscuro font-medium bg-marfil-suave px-4 py-2 rounded-lg inline-block border border-dorado/20'>
            Click en la imagen para ampliarla
          </p>
        </div>
        {/* Galería principal con marco VIP */}
        <div className="relative h-64 md:h-80 mt-8 group">
          <div className="w-full h-full flex justify-center">
            <div className="relative w-full max-w-2xl h-full overflow-hidden rounded-2xl shadow-2xl border-4 border-gradient-to-r from-dorado via-oro-antiguo to-dorado bg-gradient-to-r from-dorado via-oro-antiguo to-dorado p-1">
              <div className="w-full h-full rounded-xl overflow-hidden bg-marfil">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${
                      index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    onClick={openModal}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        openModal()
                        e.preventDefault()
                      }
                    }}
                    role="button"
                    tabIndex={isClient ? 0 : -1}
                  >
                    <Image
                      src={image.src || '/placeholder.svg'}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain cursor-pointer hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Caption overlay con diseño VIP */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-verde-oscuro/90 via-verde-oscuro/70 to-transparent p-4">
                      <p className="text-marfil text-sm md:text-base font-medium">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation buttons VIP - solo mostrar en cliente */}
          {isClient && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-3 rounded-full shadow-xl transition-all z-10 hover:scale-110 hover:shadow-2xl border border-dorado/30"
                style={{ 
                  background: 'linear-gradient(135deg, var(--color-verde-esmeralda), var(--color-verde-bosque))',
                  boxShadow: '0 8px 32px rgba(13, 107, 75, 0.4)'
                }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-3 rounded-full shadow-xl transition-all z-10 hover:scale-110 hover:shadow-2xl border border-dorado/30"
                style={{ 
                  background: 'linear-gradient(135deg, var(--color-rojo-vino), var(--color-rojo-cardenal))',
                  boxShadow: '0 8px 32px rgba(139, 28, 38, 0.4)'
                }}
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Indicators VIP - solo mostrar en cliente */}
          {isClient && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 border-2 ${
                    index === currentIndex 
                      ? 'w-8 scale-110 shadow-lg' 
                      : 'w-3 bg-marfil/70 hover:bg-marfil border-dorado/30 hover:scale-105'
                  }`}
                  style={index === currentIndex ? { 
                    background: 'linear-gradient(to right, var(--color-dorado), var(--color-oro-antiguo))',
                    borderColor: 'var(--color-dorado)',
                    boxShadow: '0 4px 16px rgba(194, 168, 120, 0.6)'
                  } : {}}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        
      </div>

      {/* Modal VIP - solo renderizar en cliente */}
      {isClient && isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-verde-oscuro/95 via-black/90 to-rojo-vino/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl h-[80vh] bg-marfil/5 rounded-2xl border border-dorado/30 shadow-2xl">
            {/* Close button VIP */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-white p-3 rounded-full z-20 transition-all hover:scale-110 hover:rotate-90 border border-dorado/30"
              style={{ 
                background: 'linear-gradient(135deg, var(--color-rojo-vino), var(--color-rojo-cardenal))',
                boxShadow: '0 8px 32px rgba(139, 28, 38, 0.4)'
              }}
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-full p-4">
              <div className="w-full h-full rounded-xl overflow-hidden border-2 border-dorado/20 bg-marfil/10">
                <Image
                  src={images[currentIndex].src || '/placeholder.svg'}
                  alt={images[currentIndex].alt}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Caption en modal VIP */}
              <div className="absolute bottom-8 left-8 right-8 bg-gradient-to-r from-verde-oscuro/90 via-verde-oscuro/95 to-verde-oscuro/90 text-marfil p-6 rounded-xl border border-dorado/30 shadow-xl">
                <p className="text-lg font-medium leading-relaxed">{images[currentIndex].caption}</p>
              </div>
            </div>

            {/* Navigation buttons VIP en modal */}
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white p-4 rounded-full shadow-xl transition-all z-10 hover:scale-110 border border-dorado/30"
              style={{ 
                background: 'linear-gradient(135deg, var(--color-verde-esmeralda), var(--color-verde-bosque))',
                boxShadow: '0 8px 32px rgba(13, 107, 75, 0.4)'
              }}
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white p-4 rounded-full shadow-xl transition-all z-10 hover:scale-110 border border-dorado/30"
              style={{ 
                background: 'linear-gradient(135deg, var(--color-rojo-vino), var(--color-rojo-cardenal))',
                boxShadow: '0 8px 32px rgba(139, 28, 38, 0.4)'
              }}
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={32} />
            </button>

            {/* Indicators VIP en modal */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 bg-verde-oscuro/50 px-6 py-3 rounded-full border border-dorado/30">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 border ${
                    index === currentIndex ? 'w-8 scale-125' : 'w-3 bg-marfil/50 border-marfil/30 hover:scale-110'
                  }`}
                  style={index === currentIndex ? { 
                    background: 'linear-gradient(to right, var(--color-dorado), var(--color-oro-antiguo))',
                    borderColor: 'var(--color-dorado)',
                    boxShadow: '0 4px 16px rgba(194, 168, 120, 0.8)'
                  } : {}}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
} 