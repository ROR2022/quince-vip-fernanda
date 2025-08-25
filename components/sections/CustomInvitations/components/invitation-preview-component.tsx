// ================================================================
// 📁 components/InvitationPreview.tsx
// ================================================================

import React, { forwardRef } from 'react';
import { InvitationPreviewProps } from '../types/invitation.types';
import { EVENT_INFO } from '../constants/invitation.constants';

/**
 * Componente de vista previa de la invitación
 */
export const InvitationPreview = forwardRef<HTMLDivElement, InvitationPreviewProps>(
  ({ formData }, ref) => {
    return (
      <div 
        ref={ref}
        className="mt-10 p-8 bg-gradient-to-br from-verde-esmeralda via-marfil to-rojo-vino rounded-3xl text-verde-oscuro shadow-2xl relative overflow-hidden border-4 border-dorado/40"
        style={{
          background: 'linear-gradient(135deg, var(--color-verde-esmeralda) 0%, var(--color-marfil) 20%, var(--color-marfil-suave) 40%, var(--color-marfil) 60%, var(--color-marfil-suave) 80%, var(--color-rojo-vino) 100%)'
        }}
      >
        {/* Decoraciones VIP mexicanas */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          {/* Esquinas doradas */}
          <div className="absolute top-6 left-6 text-4xl text-dorado">✨</div>
          <div className="absolute top-6 right-6 text-4xl text-dorado">👑</div>
          <div className="absolute bottom-6 left-6 text-3xl text-oro-antiguo">🌹</div>
          <div className="absolute bottom-6 right-6 text-3xl text-oro-antiguo">🌟</div>
          
          {/* Elementos decorativos centrales */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-dorado/20 rounded-full"></div>
          <div className="absolute top-3/4 right-1/4 w-12 h-12 bg-oro-antiguo/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-verde-esmeralda/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Marco interno VIP */}
        <div className="relative z-10 bg-marfil/90 rounded-2xl p-8 border-2 border-dorado/30 shadow-inner">
          <div className="text-center">
            {/* Header con nombres VIP */}
            <div className="mb-8 pb-6 border-b-2 border-dorado/30">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-verde-oscuro via-rojo-vino to-verde-oscuro bg-clip-text text-transparent">
                ✨ Maribel & Godofredo ✨
              </h2>
              <div className="flex justify-center gap-4 text-2xl">
                <span className="text-verde-esmeralda">💚</span>
                <span className="text-dorado">🤍</span>
                <span className="text-rojo-vino">❤️</span>
              </div>
            </div>

            {/* Información del invitado VIP */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-verde-esmeralda/10 to-rojo-vino/10 p-4 rounded-xl border border-dorado/20">
                <p className="text-lg font-semibold text-verde-oscuro">
                  <span className="text-dorado">👤</span> Invitado especial: <span className="text-rojo-vino">{formData.guestName}</span>
                </p>
              </div>
              
              {/* Mensaje personalizado con diseño premium */}
              <div className="bg-gradient-to-r from-marfil-suave to-marfil p-6 rounded-xl border-2 border-dorado/30 shadow-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl text-rojo-vino">💌</span>
                  <p className="italic text-verde-oscuro font-medium leading-relaxed">
                    &quot;{formData.personalMessage}&quot;
                  </p>
                </div>
              </div>

              {/* Detalles del evento con iconos VIP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-verde-esmeralda/10 p-4 rounded-xl border border-verde-esmeralda/20">
                  <p className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-verde-esmeralda rounded-full flex items-center justify-center text-white text-xs">📅</span>
                    <strong className="text-verde-oscuro">Fecha:</strong> 
                    <span className="text-verde-bosque">{EVENT_INFO.date}</span>
                  </p>
                </div>
                <div className="bg-rojo-vino/10 p-4 rounded-xl border border-rojo-vino/20">
                  <p className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-rojo-vino rounded-full flex items-center justify-center text-white text-xs">🕖</span>
                    <strong className="text-verde-oscuro">Hora:</strong> 
                    <span className="text-verde-bosque">{EVENT_INFO.time}</span>
                  </p>
                </div>
                <div className="bg-dorado/10 p-4 rounded-xl border border-dorado/20">
                  <p className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-dorado rounded-full flex items-center justify-center text-verde-oscuro text-xs">📍</span>
                    <strong className="text-verde-oscuro">Lugar:</strong> 
                    <span className="text-verde-bosque">{EVENT_INFO.venue}</span>
                  </p>
                </div>
                <div className="bg-oro-antiguo/10 p-4 rounded-xl border border-oro-antiguo/20">
                  <p className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-oro-antiguo rounded-full flex items-center justify-center text-verde-oscuro text-xs">👥</span>
                    <strong className="text-verde-oscuro">Invitados:</strong> 
                    <span className="text-verde-bosque">{formData.numberOfGuests} {parseInt(formData.numberOfGuests) === 1 ? 'persona' : 'personas'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer VIP con mensaje de despedida */}
            <div className="mt-8 pt-6 border-t-2 border-dorado/30">
              <div className="bg-gradient-to-r from-dorado/20 via-oro-antiguo/20 to-dorado/20 p-6 rounded-xl border border-dorado/30">
                <p className="text-verde-oscuro font-semibold flex items-center justify-center gap-2">
                  <span className="text-rojo-vino text-xl">�</span>
                  Con cariño, Maribel & Godofredo
                  <span className="text-verde-esmeralda text-xl">💕</span>
                </p>
                <div className="flex justify-center gap-2 mt-2 text-lg">
                  <span className="text-verde-esmeralda">🇲🇽</span>
                  <span className="text-dorado">💎</span>
                  <span className="text-rojo-vino">🇲🇽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

InvitationPreview.displayName = 'InvitationPreview';
