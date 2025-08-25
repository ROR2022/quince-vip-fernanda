// ================================================================
// 📁 components/InvitationForm.tsx
// ================================================================

import React from 'react';
import { InvitationFormProps } from '../types/invitation.types';
import { 
  SUGGESTED_MESSAGES, 
  RELATION_OPTIONS, 
  PHONE_CONFIG
} from '../constants/invitation.constants';
import { formatMexicanPhone } from '../utils/invitation.utils';

/**
 * Componente del formulario principal de invitaciones
 */
export const InvitationForm: React.FC<InvitationFormProps> = ({
  formData,
  onUpdateFormData,
}) => {
  // Verificar si el teléfono es válido
  const isPhoneValid = formData.whatsappNumber.length === 0 || 
    formData.whatsappNumber.replace(/\D/g, "").length === PHONE_CONFIG.DIGITS_REQUIRED;

  // Manejar el cambio del número de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const currentValue = formData.whatsappNumber;
    
    // Pasar el valor anterior para detectar si está borrando
    const formattedValue = formatMexicanPhone(newValue, currentValue);
    onUpdateFormData("whatsappNumber", formattedValue);
  };

  // Manejar teclas especiales como backspace
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const cursorPosition = target.selectionStart || 0;
    const currentValue = formData.whatsappNumber;
    
    // Si presiona backspace y el cursor está en un espacio, mover el cursor
    if (e.key === 'Backspace' && cursorPosition > 0) {
      const charAtCursor = currentValue[cursorPosition - 1];
      
      // Si el carácter anterior es un espacio, eliminarlo también
      if (charAtCursor === ' ') {
        e.preventDefault();
        const newValue = currentValue.slice(0, cursorPosition - 2) + currentValue.slice(cursorPosition);
        const formattedValue = formatMexicanPhone(newValue, currentValue);
        onUpdateFormData("whatsappNumber", formattedValue);
        
        // Posicionar el cursor correctamente después del formateo
        setTimeout(() => {
          target.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
        }, 0);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Columna izquierda - Datos básicos VIP */}
      <div className="space-y-8">
        {/* Nombre del invitado VIP */}
        <div>
          <label 
            htmlFor="guestName"
            className="text-sm font-semibold text-verde-oscuro mb-3 flex items-center gap-2"
          >
            <span className="w-5 h-5 bg-verde-esmeralda rounded-full flex items-center justify-center text-white text-xs">👤</span>
            Nombre del invitado *
          </label>
          <input
            id="guestName"
            type="text"
            value={formData.guestName}
            onChange={(e) => onUpdateFormData("guestName", e.target.value)}
            placeholder="Ej: Valeria Martínez"
            className="w-full text-verde-oscuro px-6 py-4 border-2 border-dorado/30 rounded-xl bg-marfil-suave focus:border-verde-esmeralda focus:ring-4 focus:ring-verde-esmeralda/20 transition-all duration-300 font-medium"
            required
            maxLength={50}
            autoComplete="name"
          />
          <div className="mt-2 text-xs text-verde-bosque flex items-center gap-1">
            <span className="w-4 h-4 bg-dorado rounded-full flex items-center justify-center text-white text-xs">📝</span>
            {formData.guestName.length}/50 caracteres
          </div>
        </div>

        {/* Relación con los novios VIP */}
        <div>
          <label 
            htmlFor="guestRelation"
            className="text-sm font-semibold text-verde-oscuro mb-3 flex items-center gap-2"
          >
            <span className="w-5 h-5 bg-rojo-vino rounded-full flex items-center justify-center text-white text-xs">💕</span>
            Relación con los novios
          </label>
          <select
            id="guestRelation"
            value={formData.guestRelation}
            onChange={(e) => onUpdateFormData("guestRelation", e.target.value)}
            className="w-full text-verde-oscuro px-6 py-4 border-2 border-dorado/30 rounded-xl bg-marfil-suave focus:border-rojo-vino focus:ring-4 focus:ring-rojo-vino/20 transition-all duration-300 font-medium"
          >
            {RELATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Número de invitados VIP */}
        <div>
          <label 
            htmlFor="numberOfGuests"
            className="text-sm font-semibold text-verde-oscuro mb-3 flex items-center gap-2"
          >
            <span className="w-5 h-5 bg-dorado rounded-full flex items-center justify-center text-verde-oscuro text-xs">👥</span>
            Número de invitados *
          </label>
          <select
            id="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={(e) => onUpdateFormData("numberOfGuests", e.target.value)}
            className="w-full text-verde-oscuro px-6 py-4 border-2 border-dorado/30 rounded-xl bg-marfil-suave focus:border-dorado focus:ring-4 focus:ring-dorado/20 transition-all duration-300 font-medium"
            required
          >
            <option value="">Selecciona número de invitados</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                {i + 1} {i === 0 ? 'persona' : 'personas'}
              </option>
            ))}
          </select>
        </div>

        {/* WhatsApp México VIP */}
        <div>
          <label 
            htmlFor="whatsappNumber"
            className="text-sm font-semibold text-verde-oscuro mb-3 flex items-center gap-2"
          >
            <span className="w-5 h-5 bg-verde-esmeralda rounded-full flex items-center justify-center text-white text-xs">📱</span>
            WhatsApp México ({PHONE_CONFIG.DIGITS_REQUIRED} dígitos) *
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-verde-bosque text-sm font-semibold bg-dorado/10 px-2 py-1 rounded-lg">
              {PHONE_CONFIG.FLAG} {PHONE_CONFIG.COUNTRY_CODE}
            </div>
            <input
              id="whatsappNumber"
              type="tel"
              value={formData.whatsappNumber}
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
              placeholder={PHONE_CONFIG.PLACEHOLDER}
              maxLength={PHONE_CONFIG.MAX_LENGTH}
              className={`w-full text-verde-oscuro pl-20 pr-6 py-4 border-2 rounded-xl bg-marfil-suave focus:ring-4 transition-all duration-300 font-medium ${
                isPhoneValid 
                  ? 'border-dorado/30 focus:border-verde-esmeralda focus:ring-verde-esmeralda/20'
                  : 'border-rojo-vino focus:border-rojo-cardenal focus:ring-rojo-vino/20'
              }`}
              required
              autoComplete="tel"
            />
          </div>
          
          {/* Validación del teléfono VIP */}
          {!isPhoneValid && formData.whatsappNumber.length > 0 && (
            <div className="mt-3 p-4 bg-gradient-to-r from-rojo-vino/10 to-rojo-cardenal/10 border-2 border-rojo-vino/30 rounded-xl">
              <p className="text-sm text-rojo-vino flex items-center gap-2 font-medium">
                <span className="w-5 h-5 bg-rojo-vino rounded-full flex items-center justify-center text-white text-xs">⚠️</span>
                Debe tener exactamente {PHONE_CONFIG.DIGITS_REQUIRED} dígitos
              </p>
            </div>
          )}
          
          {/* Contador de dígitos VIP */}
          <div className="mt-2 text-xs text-verde-bosque flex items-center gap-1">
            <span className="w-4 h-4 bg-dorado rounded-full flex items-center justify-center text-white text-xs">📊</span>
            {formData.whatsappNumber.replace(/\D/g, "").length}/{PHONE_CONFIG.DIGITS_REQUIRED} dígitos
          </div>
        </div>
      </div>

      {/* Columna derecha - Mensaje personalizado VIP */}
      <div className="space-y-8">
        {/* Mensaje personalizado VIP */}
        <div>
          <label 
            htmlFor="personalMessage"
            className="text-sm font-semibold text-verde-oscuro mb-3 flex items-center gap-2"
          >
            <span className="w-5 h-5 bg-rojo-vino rounded-full flex items-center justify-center text-white text-xs">💌</span>
            Mensaje especial *
          </label>
          <textarea
            id="personalMessage"
            value={formData.personalMessage}
            onChange={(e) => onUpdateFormData("personalMessage", e.target.value)}
            placeholder="Escribe un mensaje personalizado para el invitado..."
            rows={5}
            className="w-full text-verde-oscuro px-6 py-4 border-2 border-dorado/30 rounded-xl bg-marfil-suave focus:border-rojo-vino focus:ring-4 focus:ring-rojo-vino/20 transition-all duration-300 font-medium resize-none"
            required
            maxLength={500}
          />
          <div className="mt-2 text-xs text-verde-bosque flex items-center gap-1">
            <span className="w-4 h-4 bg-dorado rounded-full flex items-center justify-center text-white text-xs">📝</span>
            {formData.personalMessage.length}/500 caracteres
          </div>
        </div>

        {/* Mensajes sugeridos VIP */}
        <div>
          <label className="text-sm font-semibold text-verde-oscuro mb-3 flex items-center gap-2">
            <span className="w-5 h-5 bg-dorado rounded-full flex items-center justify-center text-verde-oscuro text-xs">💡</span>
            Mensajes sugeridos VIP
          </label>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {SUGGESTED_MESSAGES.map((message, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onUpdateFormData("personalMessage", message)}
                className="w-full text-verde-oscuro text-left p-4 text-sm bg-gradient-to-r from-marfil-suave to-marfil hover:from-verde-esmeralda/10 hover:to-rojo-vino/10 border-2 border-dorado/20 hover:border-dorado/40 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-dorado/20 group"
                title="Hacer clic para usar este mensaje"
              >
                <div className="line-clamp-2 group-hover:text-verde-bosque font-medium">
                  {message}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-verde-bosque flex items-center gap-1">
            <span className="w-4 h-4 bg-verde-esmeralda rounded-full flex items-center justify-center text-white text-xs">💡</span>
            Haz clic en cualquier mensaje para usarlo como base
          </div>
        </div>

        {/* Consejos para el mensaje VIP */}
        <div className="p-6 bg-gradient-to-r from-dorado/10 via-oro-antiguo/10 to-dorado/10 border-2 border-dorado/30 rounded-xl">
          <h4 className="text-sm font-semibold text-verde-oscuro mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-dorado rounded-full flex items-center justify-center text-verde-oscuro text-xs">✨</span>
            Consejos VIP para tu mensaje:
          </h4>
          <ul className="text-xs text-verde-bosque space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 bg-verde-esmeralda rounded-full flex items-center justify-center text-white text-xs mt-0.5">•</span>
              <span>Menciona por qué es especial para ti</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 bg-rojo-vino rounded-full flex items-center justify-center text-white text-xs mt-0.5">•</span>
              <span>Incluye algún recuerdo compartido</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 bg-dorado rounded-full flex items-center justify-center text-verde-oscuro text-xs mt-0.5">•</span>
              <span>Expresa tu emoción por el evento</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 bg-oro-antiguo rounded-full flex items-center justify-center text-verde-oscuro text-xs mt-0.5">•</span>
              <span>Mantén un tono cálido y personal</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};