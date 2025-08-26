// ================================================================
// 📁 components/ActionButtons.tsx
// ================================================================

import React, { useState } from 'react';
import { ActionButtonsProps } from '../types/invitation.types';
import { sendWhatsAppInvitationWithRegistration } from '../utils/invitation.utils';

/**
 * Componente para los botones de acción principal
 */
export const ActionButtons: React.FC<ActionButtonsProps> = ({
  formData,
  uiState,
  onTogglePreview,
  onDownload,
}) => {
  const [isSending, setIsSending] = useState(false);

  // Verificar si todos los campos requeridos están completos
  const isFormComplete = !!(
    formData.guestName &&
    formData.personalMessage &&
    formData.numberOfGuests &&
    formData.whatsappNumber &&
    formData.whatsappNumber.replace(/\D/g, "").length === 10
  );

  // Función para enviar por WhatsApp con registro automático en BD
  const sendWhatsAppInvitation = async (): Promise<void> => {
    if (!isFormComplete) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    setIsSending(true);
    
    try {
      const success = await sendWhatsAppInvitationWithRegistration(formData);
      
      if (success) {
        // Mostrar mensaje de éxito más detallado
        console.log(`✅ ¡Perfecto! 

📱 Invitación enviada a ${formData.guestName} por WhatsApp
📝 Registrado automáticamente en el sistema de gestión
🎯 Ahora puedes ver este invitado en la sección "Gestión de Invitados"`);
      } else {
        console.error("❌ La invitación se abrió en WhatsApp, pero hubo un problema al registrar en el sistema. Puedes registrar manualmente en 'Gestión de Invitados'.");
      }
    } catch (error) {
      console.error('Error al enviar invitación:', error);
      console.error("❌ Error inesperado. Por favor intenta nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col md:flex-row gap-6">
      {/* Botón Ver/Ocultar Vista Previa VIP */}
      <button
        type="button"
        onClick={onTogglePreview}
        disabled={!isFormComplete}
        className={`flex-1 py-4 px-6 rounded-xl font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 ${
          isFormComplete
            ? "bg-gradient-to-r from-verde-esmeralda to-verde-bosque hover:from-verde-bosque hover:to-verde-esmeralda text-black border-verde-esmeralda/30 hover:scale-105 hover:shadow-2xl"
            : "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 border-gray-300 cursor-not-allowed"
        }`}
        title={!isFormComplete ? "Completa todos los campos para ver la vista previa" : ""}
      >
        <span className="text-lg">
          {uiState.showPreview ? "🙈" : "👁️"}
        </span>
        <span className="text-sm md:text-base">
          {uiState.showPreview ? "Ocultar Vista Previa" : "Ver Vista Previa VIP"}
        </span>
      </button>

      {/* Botón Enviar por WhatsApp VIP */}
      <button
        type="button"
        onClick={sendWhatsAppInvitation}
        disabled={!isFormComplete || isSending}
        className={`flex-1 py-4 px-6 rounded-xl font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 ${
          isFormComplete && !isSending
            ? "bg-gradient-to-r from-rojo-vino to-rojo-cardenal hover:from-rojo-cardenal hover:to-rojo-vino text-black border-rojo-vino/30 hover:scale-105 hover:shadow-2xl"
            : "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 border-gray-300 cursor-not-allowed"
        }`}
        title={
          !isFormComplete 
            ? "Completa todos los campos para enviar por WhatsApp" 
            : isSending 
            ? "Enviando invitación..." 
            : "Enviar por WhatsApp y registrar automáticamente"
        }
      >
        <span className="text-lg">
          {isSending ? "⏳" : "📱"}
        </span>
        <span className="text-sm md:text-base">
          {isSending ? "Enviando..." : "Enviar por WhatsApp"}
        </span>
      </button>

      {/* Botón Descargar Imagen VIP */}
      <button
        type="button"
        onClick={onDownload}
        disabled={uiState.isDownloading || !isFormComplete || !uiState.showPreview}
        className={`flex-1 py-4 px-6 rounded-xl font-bold shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-2 ${
          !uiState.isDownloading && isFormComplete && uiState.showPreview
            ? "bg-gradient-to-r from-dorado to-oro-antiguo hover:from-oro-antiguo hover:to-dorado text-verde-oscuro border-dorado/40 hover:scale-105 hover:shadow-2xl"
            : "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-200 border-gray-300 cursor-not-allowed"
        }`}
        title={
          !isFormComplete 
            ? "Completa todos los campos para descargar" 
            : !uiState.showPreview 
            ? "Primero ve la vista previa para descargar"
            : ""
        }
      >
        <span className="text-lg">
          {uiState.isDownloading ? "⏳" : "💾"}
        </span>
        <span className="text-sm md:text-base">
          {uiState.isDownloading ? "Descargando..." : "Descargar Imagen VIP"}
        </span>
      </button>
    </div>
  );
};
