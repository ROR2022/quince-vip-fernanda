'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Users, Calendar, RefreshCw, Filter, ChevronLeft, ChevronRight, Loader2, AlertCircle, Heart, Cloud, Server, Trash2, X, Image as ImageIcon, ArrowUp } from 'lucide-react';
import { useHybridGallery } from './hooks/useHybridGallery';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Link from 'next/link';

// Tipos importados del hook híbrido - usar la misma interfaz
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

// Paleta VIP Mexicana (importada desde constants)
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
 * Componente para mostrar fotos subidas dinámicamente por los invitados
 */
const DinamicGallery: React.FC = () => {
  const { 
    photos, 
    loading, 
    error, 
    stats, 
    pagination, 
    filters, 
    setFilters, 
    refresh,
    getPhotoDisplayUrl,
    // 🗑️ Funciones de eliminación
    deletePhoto,
    isPhotoDeleting,
    deleteError,
    clearDeleteError
  } = useHybridGallery();

  const [selectedPhoto, setSelectedPhoto] = useState<HybridPhoto | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // 🗑️ Estados para eliminación
  const [photoToDelete, setPhotoToDelete] = useState<HybridPhoto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 🗑️ Handlers para eliminación
  const handleDeleteClick = (photo: HybridPhoto, e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar abrir modal de vista
    setPhotoToDelete(photo);
    setShowDeleteModal(true);
    // Limpiar error anterior si existe
    if (deleteError) {
      clearDeleteError();
    }
  };

  const handleConfirmDelete = async (photoId: string) => {
    const success = await deletePhoto(photoId);
    if (success) {
      setShowDeleteModal(false);
      setPhotoToDelete(null);
      // Opcional: podrías agregar un toast de éxito aquí
    }
    // Si hay error, el modal se mantendrá abierto y se mostrará el error
  };

  const handleCloseDeleteModal = () => {
    if (!photoToDelete || !isPhotoDeleting(photoToDelete.id)) {
      setShowDeleteModal(false);
      setPhotoToDelete(null);
      clearDeleteError();
    }
  };

  // Si no hay fotos y no está cargando, mostrar mensaje
  if (!loading && photos.length === 0 && !error) {
    return (
      <section 
        className="py-16 px-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${VIP_COLORS.marfil} 0%, ${VIP_COLORS.marfilSuave} 100%)`,
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.dorado}, ${VIP_COLORS.oroAntiguo})`
            }}
          >
            <Camera size={32} style={{ color: VIP_COLORS.verdeOscuro }} />
          </div>
          
          <h3 
            className="text-2xl font-semibold mb-4"
            style={{ color: VIP_COLORS.verdeEsmeralda }}
          >
            ¡Sé el primero en compartir!
          </h3>
          
          <p 
            className="text-lg"
            style={{ color: VIP_COLORS.verdeBosque }}
          >
            Aún no hay fotos subidas. Usa el FotoUploader para compartir tus mejores momentos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-16 px-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${VIP_COLORS.marfil} 0%, ${VIP_COLORS.marfilSuave} 50%, ${VIP_COLORS.marfil} 100%)`,
      }}
    >
      {/* Elementos decorativos VIP */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full" style={{ backgroundColor: VIP_COLORS.verdeEsmeralda }}></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full" style={{ backgroundColor: VIP_COLORS.rojoVino }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div 
            className="inline-block text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-xl border-2"
            style={{ 
              background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}, ${VIP_COLORS.rojoVino})`,
              borderColor: `${VIP_COLORS.dorado}40`
            }}
          >
            📸 Galería Colaborativa
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ color: VIP_COLORS.verdeEsmeralda }}
          >
            Momentos Compartidos
          </h2>
          
          {/* {stats && (
            <p 
              className="text-xl mb-2 font-medium"
              style={{ color: VIP_COLORS.verdeBosque }}
            >
              {stats.totalPhotos} foto{stats.totalPhotos !== 1 ? 's' : ''} compartida{stats.totalPhotos !== 1 ? 's' : ''} por {stats.uploaders.length} invitado{stats.uploaders.length !== 1 ? 's' : ''}
              <br />
              <span className="text-sm opacity-75">
                📁 {stats.sourceBreakdown.local} locales • ☁️ {stats.sourceBreakdown.cloudinary} en la nube
              </span>
            </p>
          )} */}
        </div>

        {/* Controles y Filtros */}
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          {/* Botón Refresh */}
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: VIP_COLORS.dorado,
              color: VIP_COLORS.verdeEsmeralda,
              backgroundColor: 'transparent'
            }}
          >
            <RefreshCw size={18} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>

          <Link
            href="/fotos"
            className="flex items-center px-4 py-2 border-2 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Camera size={18} className="mr-2" />
            Subir Foto
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-2 border-2 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <ImageIcon size={18} className="mr-2" />
            Ver Invitación
          </Link>

          {/* Toggle Filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              display: 'none',
              background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}, ${VIP_COLORS.verdeBosque})`,
              color: 'white'
            }}
          >
            <Filter size={18} className="mr-2" />
            Filtros
          </button>
        </div>

        {/* Panel de Filtros */}
        {showFilters && stats && (
          <div 
            className="mb-8 p-6 rounded-2xl border-2"
            style={{
              background: `linear-gradient(135deg, ${VIP_COLORS.marfilSuave} 0%, ${VIP_COLORS.marfil} 100%)`,
              borderColor: `${VIP_COLORS.dorado}60`
            }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Filtro por Momento */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  <Calendar size={16} className="inline mr-2" />
                  Momento del Evento
                </label>
                <select
                  value={filters.eventMoment}
                  onChange={(e) => setFilters({ eventMoment: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none"
                  style={{
                    borderColor: `${VIP_COLORS.dorado}60`,
                    backgroundColor: VIP_COLORS.marfilSuave
                  }}
                >
                  <option value="all">Todos los momentos</option>
                  {stats.eventMoments.map((moment: string) => (
                    <option key={moment} value={moment}>{moment}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Uploader */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  <Users size={16} className="inline mr-2" />
                  Subido por
                </label>
                <select
                  value={filters.uploader}
                  onChange={(e) => setFilters({ uploader: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none"
                  style={{
                    borderColor: `${VIP_COLORS.dorado}60`,
                    backgroundColor: VIP_COLORS.marfilSuave
                  }}
                >
                  <option value="all">Todos los invitados</option>
                  {stats.uploaders.map((uploader: string) => (
                    <option key={uploader} value={uploader}>{uploader}</option>
                  ))}
                </select>
              </div>

              {/* Filtro por Fuente */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-2"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  <Server size={16} className="inline mr-2" />
                  Fuente de Almacenamiento
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => setFilters({ source: e.target.value as 'all' | 'local' | 'cloudinary' })}
                  className="w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 focus:outline-none"
                  style={{
                    borderColor: `${VIP_COLORS.dorado}60`,
                    backgroundColor: VIP_COLORS.marfilSuave
                  }}
                >
                  <option value="all">Todas las fuentes</option>
                  <option value="local">📁 Servidor Local ({stats.sourceBreakdown.local})</option>
                  <option value="cloudinary">☁️ Cloudinary ({stats.sourceBreakdown.cloudinary})</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 size={48} className="animate-spin mx-auto mb-4" style={{ color: VIP_COLORS.verdeEsmeralda }} />
            <p style={{ color: VIP_COLORS.verdeBosque }}>Cargando fotos...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div 
            className="p-4 rounded-lg border-l-4 mb-6"
            style={{
              backgroundColor: `${VIP_COLORS.rojoVino}10`,
              borderColor: VIP_COLORS.rojoVino
            }}
          >
            <div className="flex items-center">
              <AlertCircle size={20} style={{ color: VIP_COLORS.rojoVino }} className="mr-2" />
              <p style={{ color: VIP_COLORS.rojoVino }}>{error}</p>
            </div>
          </div>
        )}

        {/* Error de eliminación */}
        {deleteError && (
          <div 
            className="p-4 rounded-lg border-l-4 mb-6"
            style={{
              backgroundColor: `${VIP_COLORS.rojoVino}10`,
              borderColor: VIP_COLORS.rojoVino
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trash2 size={20} style={{ color: VIP_COLORS.rojoVino }} className="mr-2" />
                <p style={{ color: VIP_COLORS.rojoVino }}>Error al eliminar: {deleteError}</p>
              </div>
              <button
                onClick={clearDeleteError}
                className="text-sm underline hover:no-underline"
                style={{ color: VIP_COLORS.rojoVino }}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Grid de Fotos */}
        {!loading && photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {photos.map((photo: HybridPhoto) => (
              <div 
                key={photo.id}
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedPhoto(photo)}
                style={{ aspectRatio: '1' }}
              >
                {/* Imagen usando URL híbrida */}
                <Image
                  src={getPhotoDisplayUrl(photo, 'compressed')}
                  alt={photo.originalName}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
                
                {/* Indicador de fuente */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {photo.source === 'cloudinary' ? (
                    <Cloud size={16} className="text-blue-500 bg-white rounded-full p-1" />
                  ) : (
                    <Server size={16} className="text-green-500 bg-white rounded-full p-1" />
                  )}
                </div>
                
                {/* 🗑️ Botón de eliminación */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {isPhotoDeleting(photo.id) ? (
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                    >
                      <Loader2 size={16} className="animate-spin" style={{ color: VIP_COLORS.rojoVino }} />
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleDeleteClick(photo, e)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: VIP_COLORS.rojoVino
                      }}
                      aria-label={`Eliminar foto ${photo.originalName}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-semibold text-sm truncate">{photo.uploaderName}</p>
                  <p className="text-xs opacity-75">{photo.eventMoment}</p>
                  <p className="text-xs opacity-75">{formatDate(photo.uploadedAt)}</p>
                </div>

                {/* Icono de love en la esquina */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart size={20} style={{ color: VIP_COLORS.rojoVino }} fill="white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/** Regresar al hasta arriba */}
        <div className="flex justify-center mb-4">
          <Link
            href="#top"
            className="inline-flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105"
            style={{
              borderColor: VIP_COLORS.dorado,
              color: VIP_COLORS.verdeEsmeralda,
              backgroundColor: 'transparent'
            }}
          >
            <ArrowUp size={18} className="mr-1" />
            Volver Arriba
          </Link>
        </div>

        {/* Paginación - Temporalmente deshabilitada */}
        {pagination && pagination.pages > 1 && false && (
          <div className="flex items-center justify-center space-x-4">
            <button
              disabled={true}
              className="flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: VIP_COLORS.dorado,
                color: VIP_COLORS.verdeEsmeralda,
                backgroundColor: 'transparent'
              }}
            >
              <ChevronLeft size={18} className="mr-1" />
              Anterior
            </button>

            <span 
              className="px-4 py-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${VIP_COLORS.verdeEsmeralda}, ${VIP_COLORS.verdeBosque})`,
                color: 'white'
              }}
            >
              {pagination?.page || 1} de {pagination?.pages || 1}
            </span>

            <button
              disabled={true}
              className="flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderColor: VIP_COLORS.dorado,
                color: VIP_COLORS.verdeEsmeralda,
                backgroundColor: 'transparent'
              }}
            >
              Siguiente
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Modal de Foto Ampliada */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="max-w-4xl max-h-full bg-white rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🔘 Botón de cerrar en esquina superior derecha */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: VIP_COLORS.verdeBosque,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Imagen usando URL híbrida */}
              <div className="flex-1 p-4 relative">
                <Image
                  src={getPhotoDisplayUrl(selectedPhoto, 'original')}
                  alt={selectedPhoto.originalName}
                  width={800}
                  height={600}
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
              </div>
              
              {/* Info */}
              <div className="md:w-80 p-6 border-l" style={{ borderColor: `${VIP_COLORS.dorado}40` }}>
                <h3 
                  className="text-xl font-semibold mb-4"
                  style={{ color: VIP_COLORS.verdeEsmeralda }}
                >
                  {selectedPhoto.originalName}
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold" style={{ color: VIP_COLORS.verdeBosque }}>Subido por:</span>
                    <br />
                    {selectedPhoto.uploaderName}
                  </div>
                  
                  <div>
                    <span className="font-semibold" style={{ color: VIP_COLORS.verdeBosque }}>Momento:</span>
                    <br />
                    {selectedPhoto.eventMoment}
                  </div>
                  
                  <div>
                    <span className="font-semibold" style={{ color: VIP_COLORS.verdeBosque }}>Fecha:</span>
                    <br />
                    {formatDate(selectedPhoto.uploadedAt)}
                  </div>
                  
                  <div>
                    <span className="font-semibold" style={{ color: VIP_COLORS.verdeBosque }}>Tamaño:</span>
                    <br />
                    {formatFileSize(selectedPhoto.size)}
                  </div>
                  
                  {selectedPhoto.comment && (
                    <div>
                      <span className="font-semibold" style={{ color: VIP_COLORS.verdeBosque }}>Comentario:</span>
                      <br />
                      {selectedPhoto.comment}
                    </div>
                  )}
                </div>
                
                {/* 🗑️ Botón de Eliminar Foto */}
                <button
                  onClick={() => {
                    handleDeleteClick(selectedPhoto, { stopPropagation: () => {} } as React.MouseEvent);
                    setSelectedPhoto(null); // Cerrar modal de vista
                  }}
                  disabled={isPhotoDeleting(selectedPhoto.id)}
                  className="mt-6 w-full px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  style={{
                    background: `linear-gradient(135deg, ${VIP_COLORS.rojoVino}, ${VIP_COLORS.rojoCardenal})`,
                    color: 'white'
                  }}
                >
                  {isPhotoDeleting(selectedPhoto.id) ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Eliminando...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      <span>Eliminar Foto</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="mt-3 w-full px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: VIP_COLORS.dorado,
                    color: VIP_COLORS.verdeEsmeralda,
                    backgroundColor: 'transparent'
                  }}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🗑️ Modal de Confirmación de Eliminación */}
      <DeleteConfirmationModal
        photo={photoToDelete}
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={photoToDelete ? isPhotoDeleting(photoToDelete.id) : false}
      />
    </section>
  );
};

export default DinamicGallery;