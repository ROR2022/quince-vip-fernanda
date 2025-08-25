"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Cloud,
  Server,
  RefreshCw,
  Clock,
  Pause,
  Play,
} from "lucide-react";
import { VIP_COLORS, UI_CONFIG } from "./constants/upload.constants";
import { UploaderFormData } from "./types/upload.types";
import { useHybridUpload } from "./hooks/useHybridUpload";

/**
 * Componente principal para subir fotos con diseño VIP mexicano
 */
const FotoUploader: React.FC = () => {
  const [formData, setFormData] = useState<UploaderFormData>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados para auto-reset después del éxito
  const [countdown, setCountdown] = useState(0);
  const [autoResetEnabled, setAutoResetEnabled] = useState(true);
  const autoResetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Configuración del auto-reset
  const AUTO_RESET_DELAY = 10; // segundos

  // Hook híbrido para manejar uploads (Original + Cloudinary)
  const {
    uploadState,
    systemType,
    uploadFiles,
    resetUpload,
    switchToOriginal,
    switchToCloudinary,
  } = useHybridUpload();

  // Handler para seleccionar archivos
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
    // Limpiar el input para permitir seleccionar los mismos archivos de nuevo
    if (event.target) {
      event.target.value = "";
    }
  };

  // Handler para abrir selector de archivos
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  // Handler para subir archivos
  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      await uploadFiles(selectedFiles, formData);
    }
  };

  // Handler para remover archivo
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handler para resetear todo
  const handleReset = useCallback(() => {
    setSelectedFiles([]);
    resetUpload();
    setFormData({});
    setCountdown(0);
    setAutoResetEnabled(true);

    // Limpiar timers activos
    if (autoResetTimerRef.current) {
      clearTimeout(autoResetTimerRef.current);
      autoResetTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  }, [resetUpload]);

  // Cancelar auto-reset
  const cancelAutoReset = () => {
    console.log("🛑 Auto-reset cancelado por el usuario");
    setAutoResetEnabled(false);
    setCountdown(0);

    if (autoResetTimerRef.current) {
      clearTimeout(autoResetTimerRef.current);
      autoResetTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  };

  // Acelerar reset (ejecutar inmediatamente)
  const accelerateReset = () => {
    console.log("⚡ Reset acelerado por el usuario");
    cancelAutoReset();
    handleReset();
  };

  // Effect para manejar auto-reset después del éxito
  useEffect(() => {
    if (uploadState.success && autoResetEnabled && selectedFiles.length > 0) {
      console.log("🕐 Iniciando auto-reset en", AUTO_RESET_DELAY, "segundos");

      // Iniciar countdown visual
      setCountdown(AUTO_RESET_DELAY);

      // Timer principal para el reset automático
      autoResetTimerRef.current = setTimeout(() => {
        console.log("⏰ Ejecutando auto-reset automático");
        handleReset();
      }, AUTO_RESET_DELAY * 1000);

      // Timer para actualizar el countdown cada segundo
      let currentCount = AUTO_RESET_DELAY;
      countdownTimerRef.current = setInterval(() => {
        currentCount -= 1;
        setCountdown(currentCount);

        if (currentCount <= 0) {
          clearInterval(countdownTimerRef.current!);
        }
      }, 1000);
    }

    // Cleanup cuando el estado de éxito cambie
    return () => {
      if (autoResetTimerRef.current) {
        clearTimeout(autoResetTimerRef.current);
        autoResetTimerRef.current = null;
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
      }
    };
  }, [
    uploadState.success,
    autoResetEnabled,
    selectedFiles.length,
    handleReset,
  ]);

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      if (autoResetTimerRef.current) {
        clearTimeout(autoResetTimerRef.current);
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      className="py-16 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${VIP_COLORS.marfil} 0%, ${VIP_COLORS.marfilSuave} 50%, ${VIP_COLORS.marfil} 100%)`,
      }}
    >
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-10 left-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: VIP_COLORS.verdeEsmeralda }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: VIP_COLORS.rojoVino }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full"
          style={{ backgroundColor: VIP_COLORS.dorado }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header VIP */}
        <div className="text-center mb-12">
          {/* Indicador de sistema de almacenamiento */}
          <div
            style={{ display: "none" }}
            className="flex justify-center items-center gap-2 mb-4"
          >
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-300 ${
                systemType === "cloudinary"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-green-50 text-green-700 border-green-200"
              }`}
            >
              {systemType === "cloudinary" ? (
                <>
                  <Cloud size={16} />
                  Almacenamiento en la Nube
                </>
              ) : (
                <>
                  <Server size={16} />
                  Servidor Local
                </>
              )}
            </div>

            {/* Botón para cambiar sistema (solo en desarrollo) */}
            {process.env.NODE_ENV === "development" && (
              <button
                onClick={
                  systemType === "cloudinary"
                    ? switchToOriginal
                    : switchToCloudinary
                }
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                title={`Cambiar a ${
                  systemType === "cloudinary" ? "servidor local" : "nube"
                }`}
              >
                <RefreshCw
                  size={16}
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                />
              </button>
            )}
          </div>

          <div
            className="inline-block text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-xl border-2"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}, ${VIP_COLORS.rojoVino})`,
              borderColor: `${VIP_COLORS.dorado}40`,
            }}
          >
            📸 Comparte tus Fotos
          </div>

          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ color: VIP_COLORS.verdeEsmeralda }}
          >
            Galería Colaborativa
          </h2>

          <p
            className="text-xl mb-2 font-medium"
            style={{ color: VIP_COLORS.verdeBosque }}
          >
            Ayúdanos a crear una galería única de nuestra boda
          </p>

          <p
            className="max-w-2xl mx-auto leading-relaxed"
            style={{ color: `${VIP_COLORS.verdeEsmeralda}CC` }}
          >
            Sube tus fotos favoritas de la celebración. Serán parte de nuestro
            álbum digital especial.
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 mb-8">
        <Link
          href="/gallery"
          className="flex items-center px-4 py-2 border-2 rounded-lg transition-all duration-300 hover:scale-105"
        >
          <Camera size={18} className="mr-2" />
          Ir a Galería
        </Link>
        <Link
          href="/"
          className="flex items-center px-4 py-2 border-2 rounded-lg transition-all duration-300 hover:scale-105"
        >
          <ImageIcon size={18} className="mr-2" />
          Ver Invitación
        </Link>
        </div>
        {/* Input File Elegante */}
        <div className="mb-8">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div
            onClick={openFileSelector}
            className="relative cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.marfil} 0%, ${VIP_COLORS.marfilSuave} 100%)`,
              border: `3px dashed ${VIP_COLORS.dorado}80`,
              borderRadius: "20px",
              minHeight: "200px",
            }}
          >
            {/* Hover effect overlay */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}10, ${VIP_COLORS.rojoVino}10)`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6 text-center">
              {/* Icono principal */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${VIP_COLORS.dorado}, ${VIP_COLORS.oroAntiguo})`,
                }}
              >
                <Camera size={32} style={{ color: VIP_COLORS.verdeOscuro }} />
              </div>

              {/* Texto principal */}
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ color: VIP_COLORS.verdeEsmeralda }}
              >
                Selecciona tus fotos
              </h3>

              <p
                className="text-lg mb-4"
                style={{ color: VIP_COLORS.verdeBosque }}
              >
                Haz clic aquí para elegir las imágenes que quieres compartir
              </p>

              {/* Especificaciones actualizadas */}
              <div
                className="text-sm opacity-75 space-y-1"
                style={{ color: VIP_COLORS.verdeOscuro }}
              >
                <p>📁 Formatos: JPG, PNG, WEBP</p>
                <p>📏 Tamaño máximo: 10MB por foto</p>
                <p>🖼️ Hasta 10 fotos a la vez</p>
                {systemType === "cloudinary" && (
                  <p className="text-blue-600">
                    ☁️ Optimización automática en la nube
                  </p>
                )}
              </div>

              {/* Botón estilizado */}
              <div
                className="mt-6 px-8 py-3 rounded-full font-medium text-white shadow-lg group-hover:shadow-xl transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}, ${VIP_COLORS.verdeBosque})`,
                }}
              >
                <Upload size={18} className="inline mr-2" />
                Seleccionar Fotos
              </div>
            </div>
          </div>
        </div>

        {/* Preview Grid - Solo mostrar si hay archivos */}
        {selectedFiles.length > 0 && (
          <div
            className="p-6 rounded-2xl border-2 shadow-lg mb-8"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.marfilSuave} 0%, ${VIP_COLORS.marfil} 100%)`,
              borderColor: `${VIP_COLORS.dorado}60`,
            }}
          >
            <h3
              className="text-xl font-semibold mb-4 flex items-center"
              style={{ color: VIP_COLORS.verdeEsmeralda }}
            >
              <ImageIcon size={20} className="mr-2" />
              Fotos Seleccionadas ({selectedFiles.length})
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedFiles.map((file: File, index: number) => (
                <div
                  key={`${file.name}-${index}`}
                  className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{ height: `${UI_CONFIG.previewSize}px` }}
                >
                  {/* Preview de la imagen */}
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                  />

                  {/* Status overlay durante upload */}
                  {uploadState.uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Loader2
                          size={24}
                          className="animate-spin mx-auto mb-2"
                        />
                        <div className="text-sm">{uploadState.progress}%</div>
                      </div>
                    </div>
                  )}

                  {uploadState.success && (
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <CheckCircle
                        size={20}
                        style={{ color: VIP_COLORS.verdeEsmeralda }}
                      />
                      {systemType === "cloudinary" && (
                        <Cloud size={16} className="text-blue-500" />
                      )}
                    </div>
                  )}

                  {uploadState.error && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <AlertCircle
                        size={24}
                        style={{ color: VIP_COLORS.rojoVino }}
                      />
                    </div>
                  )}

                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Botón eliminar */}
                  {!uploadState.uploading && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: VIP_COLORS.rojoVino }}
                    >
                      <X size={14} />
                    </button>
                  )}

                  {/* Nombre del archivo */}
                  <div className="absolute bottom-2 left-2 right-8 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mostrar errores si los hay */}
        {uploadState.error && (
          <div
            className="p-4 rounded-lg border-l-4 mb-6"
            style={{
              backgroundColor: `${VIP_COLORS.rojoVino}10`,
              borderColor: VIP_COLORS.rojoVino,
            }}
          >
            <div className="flex items-center">
              <AlertCircle
                size={20}
                style={{ color: VIP_COLORS.rojoVino }}
                className="mr-2"
              />
              <p style={{ color: VIP_COLORS.rojoVino }}>{uploadState.error}</p>
            </div>
          </div>
        )}

        {/* Mensaje de éxito con auto-reset */}
        {uploadState.success && (
          <div
            className="p-6 rounded-2xl border-l-4 mb-6 shadow-lg"
            style={{
              backgroundColor: `${VIP_COLORS.verdeEsmeralda}10`,
              borderColor: VIP_COLORS.verdeEsmeralda,
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center flex-1">
                <CheckCircle
                  size={24}
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                  className="mr-3 flex-shrink-0"
                />
                <div>
                  <p
                    className="text-lg font-semibold mb-1"
                    style={{ color: VIP_COLORS.verdeEsmeralda }}
                  >
                    ¡Fotos subidas exitosamente!
                  </p>
                  {countdown > 0 ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock
                        size={16}
                        style={{ color: VIP_COLORS.verdeBosque }}
                      />
                      <span style={{ color: VIP_COLORS.verdeBosque }}>
                        Preparando para más fotos en{" "}
                        <strong>{countdown}</strong> segundo
                        {countdown !== 1 ? "s" : ""}...
                      </span>
                    </div>
                  ) : (
                    <p
                      className="text-sm"
                      style={{ color: VIP_COLORS.verdeBosque }}
                    >
                      {systemType === "cloudinary"
                        ? "☁️ Guardadas en la nube"
                        : "💾 Guardadas en el servidor"}
                    </p>
                  )}
                </div>
              </div>

              {/* Controles del auto-reset */}
              {countdown > 0 && (
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={accelerateReset}
                    className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: VIP_COLORS.verdeEsmeralda,
                      color: "white",
                    }}
                    title="Subir más fotos ahora"
                  >
                    <Play size={14} className="inline mr-1" />
                    Ahora
                  </button>

                  <button
                    onClick={cancelAutoReset}
                    className="px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all duration-200 hover:scale-105"
                    style={{
                      borderColor: VIP_COLORS.dorado,
                      color: VIP_COLORS.verdeBosque,
                      backgroundColor: "transparent",
                    }}
                    title="Cancelar reinicio automático"
                  >
                    <Pause size={14} className="inline mr-1" />
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            {/* Barra de progreso visual del countdown */}
            {countdown > 0 && (
              <div className="mt-4">
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: `${VIP_COLORS.dorado}20` }}
                >
                  <div
                    className="h-full transition-all duration-1000 ease-linear"
                    style={{
                      backgroundColor: VIP_COLORS.verdeEsmeralda,
                      width: `${
                        ((AUTO_RESET_DELAY - countdown) / AUTO_RESET_DELAY) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Formulario opcional - Mostrar solo si hay archivos */}
        {selectedFiles.length > 0 && !uploadState.success && (
          <div
            className="p-6 rounded-2xl border-2 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.marfil} 0%, ${VIP_COLORS.marfilSuave} 100%)`,
              borderColor: `${VIP_COLORS.dorado}60`,
            }}
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: VIP_COLORS.verdeEsmeralda }}
            >
              Información Adicional (Opcional)
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Campo nombre */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: VIP_COLORS.verdeBosque }}
                >
                  Tu nombre
                </label>
                <input
                  type="text"
                  placeholder="Nombre (opcional)"
                  value={formData.uploaderName || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      uploaderName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none"
                  style={{
                    borderColor: `${VIP_COLORS.dorado}60`,
                    backgroundColor: VIP_COLORS.marfilSuave,
                  }}
                />
              </div>

              {/* Campo comentario */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: VIP_COLORS.verdeBosque }}
                >
                  Comentario
                </label>
                <textarea
                  placeholder="Comparte un mensaje especial (opcional)"
                  value={formData.comment || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none resize-none"
                  style={{
                    borderColor: `${VIP_COLORS.dorado}60`,
                    backgroundColor: VIP_COLORS.marfilSuave,
                  }}
                />
              </div>
            </div>

            {/* Botón de upload */}
            <div className="mt-6 text-center space-y-4">
              <button
                onClick={handleUpload}
                disabled={uploadState.uploading || selectedFiles.length === 0}
                className="px-8 py-4 rounded-full font-semibold text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}, ${VIP_COLORS.rojoVino})`,
                }}
              >
                {uploadState.uploading ? (
                  <>
                    <Loader2 size={20} className="inline mr-2 animate-spin" />
                    Subiendo... {uploadState.progress}%
                  </>
                ) : (
                  <>
                    <Upload size={20} className="inline mr-2" />
                    Subir {selectedFiles.length} foto
                    {selectedFiles.length !== 1 ? "s" : ""}
                  </>
                )}
              </button>

              {/* Botón de reset */}
              {(selectedFiles.length > 0 || uploadState.success) &&
                !countdown && (
                  <button
                    onClick={handleReset}
                    className="ml-4 px-6 py-3 rounded-full font-medium border-2 transition-all duration-300 hover:scale-105"
                    style={{
                      borderColor: VIP_COLORS.dorado,
                      color: VIP_COLORS.verdeEsmeralda,
                      backgroundColor: "transparent",
                    }}
                  >
                    {uploadState.success ? "Subir más fotos" : "Limpiar todo"}
                  </button>
                )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FotoUploader;
