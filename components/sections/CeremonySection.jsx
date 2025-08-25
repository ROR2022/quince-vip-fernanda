// ⛪ CeremonySection - Sección de información de la ceremonia

import React from "react";
import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { quinceData } from "../../data/quinceData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAnimationConfig } from "@/data/animationConfig";

export default function CeremonySection() {
  const { ceremony, quinceañera } = quinceData;

  // Configurar animación de scroll
  const animationConfig = getAnimationConfig("ceremony");
  const { ref: sectionRef } = useScrollAnimation(
    animationConfig.options,
    animationConfig.type,
    animationConfig.delay
  );

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-aurora-rosa)', // Fallback Aurora
        position: "relative",
        zIndex: 5000,
        //...animationStyle,
      }}
      id="ceremony"
      className="py-20 relative overflow-hidden"
    >
      {/* Elementos decorativos Aurora VIP */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-10 left-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: 'var(--color-aurora-lavanda)' }}
        ></div>
        <div 
          className="absolute bottom-10 right-10 w-20 h-20 rounded-full"
          style={{ backgroundColor: 'var(--color-aurora-rosa)' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full"
          style={{ backgroundColor: 'var(--color-aurora-oro)' }}
        ></div>
      </div>

      <div
        style={{
          animation: "bounce1 1.5s ease 0s 1 normal forwards",
          willChange: "transform, opacity",
          position: "relative",
          zIndex: 4000,
          background: 'linear-gradient(to bottom right, rgba(253, 252, 252, 0.9), rgba(250, 248, 245, 0.9))',
          border: '2px solid rgba(230, 217, 255, 0.3)'
        }}
        className="container mx-auto px-4 p-8 rounded-3xl shadow-2xl"
      >
        <div
          style={{
            position: "relative",
            zIndex: 4000,
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full flex justify-center items-center h-96 rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={quinceañera.glamourImage}
                alt="Fernanda XV años"
                fill
                className="object-cover "
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 4000,
              }}
              className="space-y-6 bg-purple-400 bg-opacity-50 rounded-2xl p-6"
            >
              <div className="text-center">
                <h2
                  style={{ display: "none" }}
                  className="font-script text-4xl text-secondary mb-4"
                >
                  ITINERARIO
                </h2>
                <h3
                  style={{ display: "none" }}
                  className="font-script text-5xl text-foreground mb-6"
                >
                  {ceremony.type}
                </h3>

                <div
                  style={{
                    position: "relative",
                    zIndex: 4000,
                  }}
                  className="space-y-4"
                >
                  <div 
                    className="text-8xl font-script mb-4 text-sky-500"
                    //style={{ color: 'var(--color-aurora-rosa)' }}
                  >
                    {quinceañera.nickname}
                  </div>
                  <h4 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-aurora-lavanda)' }}
                  >
                    🏛️ {ceremony.name}
                  </h4>
                  <div 
                    className="flex items-center justify-center gap-2"
                    style={{ color: 'var(--color-aurora-rosa)' }}
                  >
                    <Clock 
                      className="w-6 h-6 text-sky-500"
                      //style={{ color: 'var(--color-aurora-oro)' }}
                    />
                    <span className="text-2xl font-medium">
                      {ceremony.time}
                    </span>
                  </div>
                  <p 
                    style={{ color: 'var(--color-aurora-lavanda)' }}
                  >
                    📍 {ceremony.address}
                  </p>

                  <Button
                    style={{
                      position: "relative",
                      zIndex: 5000,
                      backgroundColor: 'var(--color-aurora-lavanda)',
                      color: 'white',
                      border: '2px solid var(--color-aurora-oro)'
                    }}
                    onClick={() => window.open(ceremony.ubiLink, "_blank")}
                    className="hover:text-black rounded-full px-8 py-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    🗺️ Ir al mapa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
