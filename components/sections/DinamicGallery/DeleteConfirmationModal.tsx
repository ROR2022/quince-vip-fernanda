'use client'

import React from 'react';
import { Trash2, Loader2, AlertTriangle, X } from 'lucide-react';

// Tipos importados del hook híbrido
interface HybridPhoto {
  id: string;
  originalName: string;
  uploaderName: string;
  uploadedAt: string;
  size: number;
  eventMoment: string;
  comment?: string;
  displayUrl: string;
  thumbnailUrl?: string;
  source: 'cloudinary' | 'local';
  filename: string;
  mimeType: string;
  dimensions: {
    width: number;
    height: number;
  };
  viewCount?: number;
  status: string;
  isPublic: boolean;
}

interface DeleteConfirmationModalProps {
  photo: HybridPhoto | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (photoId: string) => Promise<void>;
  isDeleting: boolean;
}

// Paleta VIP Mexicana
const VIP_COLORS = {
  verdeEsmeralda: '#0D6B4B',
  rojoVino: '#8B1C26',
  dorado: '#C2A878',
  marfil: '#F8F5F0',
  marfilSuave: '#FAF7F2',
  verdeOscuro: '#0A5A3C',
  verdeBosque: '#6B8C5A',
  rojoCardenal: '#7A1B24',
  oroAntiguo: '#B8A070'
};

/**
 * Modal de confirmación para eliminar fotos con diseño VIP
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  photo,
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}) => {
  if (!isOpen || !photo) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm(photo.id);
    } catch (error) {
      console.error('Error in modal confirm:', error);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onClose();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ 
        animation: 'fadeIn 200ms ease-out',
      }}
    >
      <div 
        className="max-w-md w-full rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${VIP_COLORS.marfil} 0%, ${VIP_COLORS.marfilSuave} 100%)`,
          border: `2px solid ${VIP_COLORS.dorado}40`,
          animation: 'slideIn 200ms ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-6 border-b-2"
          style={{ 
            borderColor: `${VIP_COLORS.dorado}40`,
            background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}10, ${VIP_COLORS.rojoVino}10)`
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${VIP_COLORS.rojoVino}, ${VIP_COLORS.rojoCardenal})`
                }}
              >
                <AlertTriangle size={24} color="white" />
              </div>
              <div>
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  ¿Eliminar foto?
                </h3>
                <p 
                  className="text-sm opacity-75"
                  style={{ color: VIP_COLORS.verdeBosque }}
                >
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
            
            {!isDeleting && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: `${VIP_COLORS.dorado}20`,
                  color: VIP_COLORS.verdeBosque
                }}
                aria-label="Cerrar modal"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Información de la foto */}
          <div 
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: VIP_COLORS.marfilSuave,
              borderColor: `${VIP_COLORS.dorado}30`
            }}
          >
            <div className="space-y-2 text-sm">
              <div>
                <span 
                  className="font-semibold"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  Archivo:
                </span>
                <br />
                <span style={{ color: VIP_COLORS.verdeBosque }}>
                  {photo.originalName}
                </span>
              </div>
              
              <div>
                <span 
                  className="font-semibold"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  Subido por:
                </span>
                <br />
                <span style={{ color: VIP_COLORS.verdeBosque }}>
                  {photo.uploaderName}
                </span>
              </div>
              
              <div>
                <span 
                  className="font-semibold"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  Momento:
                </span>
                <br />
                <span style={{ color: VIP_COLORS.verdeBosque }}>
                  {photo.eventMoment}
                </span>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <span 
                    className="font-semibold"
                    style={{ color: VIP_COLORS.verdeEsmeralda }}
                  >
                    Tamaño:
                  </span>
                  <br />
                  <span 
                    className="text-xs"
                    style={{ color: VIP_COLORS.verdeBosque }}
                  >
                    {formatFileSize(photo.size)}
                  </span>
                </div>
                
                <div>
                  <span 
                    className="font-semibold"
                    style={{ color: VIP_COLORS.verdeEsmeralda }}
                  >
                    Fecha:
                  </span>
                  <br />
                  <span 
                    className="text-xs"
                    style={{ color: VIP_COLORS.verdeBosque }}
                  >
                    {formatDate(photo.uploadedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de advertencia */}
          <div 
            className="p-3 rounded-lg border-l-4 text-sm"
            style={{
              backgroundColor: `${VIP_COLORS.rojoVino}10`,
              borderColor: VIP_COLORS.rojoVino,
              color: VIP_COLORS.rojoCardenal
            }}
          >
            <strong>⚠️ Advertencia:</strong> Esta foto será eliminada permanentemente de la galería de la boda.
          </div>
        </div>

        {/* Footer con botones */}
        <div 
          className="p-6 border-t-2 flex space-x-3"
          style={{ 
            borderColor: `${VIP_COLORS.dorado}40`,
            background: `linear-gradient(135deg, ${VIP_COLORS.marfilSuave} 0%, ${VIP_COLORS.marfil} 100%)`
          }}
        >
          {/* Botón Cancelar */}
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 rounded-lg border-2 font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              borderColor: VIP_COLORS.dorado,
              color: VIP_COLORS.verdeEsmeralda,
              backgroundColor: 'transparent'
            }}
          >
            Cancelar
          </button>

          {/* Botón Eliminar */}
          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.rojoVino}, ${VIP_COLORS.rojoCardenal})`
            }}
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Eliminando...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Eliminar</span>
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmationModal;
