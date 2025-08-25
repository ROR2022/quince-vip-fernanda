/**
 * 🔄 Script de Migración - Fotos Existentes a MongoDB
 * 
 * Este script escanea el filesystem existente y migra todas las fotos
 * encontradas a MongoDB, manteniendo la integridad de los datos.
 */

const fs = require('fs').promises;
const path = require('path');
const { connectToMongoDB } = require('../lib/mongodb-migration');
const mongoose = require('mongoose');

// Configuración
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'boda-maribel-godofredo');
const FOTOS_DIR = path.join(UPLOADS_DIR, 'fotos');
const METADATA_DIR = path.join(UPLOADS_DIR, 'metadata');
const THUMBNAILS_DIR = path.join(UPLOADS_DIR, 'thumbnails');

// Esquema simplificado del modelo Photo para la migración
const PhotoSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true },
  originalName: { type: String, required: true },
  cloudinaryId: String,
  cloudinaryUrl: String,
  localPath: String,
  thumbnailUrl: String,
  uploadSource: { type: String, enum: ['cloudinary', 'local'], required: true },
  fileSize: { type: Number, required: true },
  mimeType: { type: String, required: true },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  uploader: {
    name: String,
    ip: { type: String, required: true },
    userAgent: { type: String, required: true }
  },
  eventMoment: { type: String, default: 'general' },
  comment: String,
  uploadedAt: { type: Date, required: true },
  isPublic: { type: Boolean, default: true },
  status: { type: String, enum: ['uploading', 'ready', 'processing', 'error'], default: 'ready' },
  moderationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' },
  viewCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Photo = mongoose.models.Photo || mongoose.model('Photo', PhotoSchema);

/**
 * Obtiene las dimensiones de una imagen
 */
async function getImageDimensions(imagePath) {
  try {
    const sizeOf = require('image-size');
    const dimensions = sizeOf(imagePath);
    return {
      width: dimensions.width || 0,
      height: dimensions.height || 0
    };
  } catch (error) {
    console.warn(`❌ Could not get dimensions for ${imagePath}:`, error.message);
    return { width: 0, height: 0 };
  }
}

/**
 * Lee metadatos de un archivo si existe
 */
async function readPhotoMetadata(filename) {
  try {
    const metadataPath = path.join(METADATA_DIR, `${filename}.json`);
    const metadataExists = await fs.access(metadataPath).then(() => true).catch(() => false);
    
    if (metadataExists) {
      const metadataContent = await fs.readFile(metadataPath, 'utf-8');
      return JSON.parse(metadataContent);
    }
  } catch (error) {
    console.warn(`⚠️ Could not read metadata for ${filename}:`, error.message);
  }
  
  return {};
}

/**
 * Obtiene estadísticas de un archivo
 */
async function getFileStats(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return {
      size: stats.size,
      birthtime: stats.birthtime,
      mtime: stats.mtime
    };
  } catch (error) {
    console.error(`❌ Could not get file stats for ${filePath}:`, error.message);
    return {
      size: 0,
      birthtime: new Date(),
      mtime: new Date()
    };
  }
}

/**
 * Determina el tipo MIME basado en la extensión
 */
function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp'
  };
  return mimeTypes[ext] || 'image/jpeg';
}

/**
 * Detecta si la foto es de origen Cloudinary o local
 */
function detectUploadSource(filePath, metadata) {
  // Si tiene metadata de Cloudinary, es de Cloudinary
  if (metadata.cloudinaryId || metadata.cloudinaryUrl) {
    return 'cloudinary';
  }
  
  // Si el nombre del archivo tiene patrones de Cloudinary
  const filename = path.basename(filePath);
  if (filename.includes('cloudinary') || filename.length === 20) { // IDs de Cloudinary son típicamente de 20 chars
    return 'cloudinary';
  }
  
  // Por defecto, asumimos que es local
  return 'local';
}

/**
 * Construye la URL del thumbnail si existe
 */
async function getThumbnailUrl(filename) {
  try {
    const thumbnailPath = path.join(THUMBNAILS_DIR, filename);
    const thumbnailExists = await fs.access(thumbnailPath).then(() => true).catch(() => false);
    
    if (thumbnailExists) {
      return `/uploads/boda-maribel-godofredo/thumbnails/${filename}`;
    }
  } catch (error) {
    console.warn(`⚠️ Could not check thumbnail for ${filename}`);
  }
  
  return null;
}

/**
 * Escanea recursivamente el directorio de fotos
 */
async function scanPhotosDirectory(dir) {
  const photos = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Buscar recursivamente en subdirectorios
        const subPhotos = await scanPhotosDirectory(fullPath);
        photos.push(...subPhotos);
      } else if (entry.isFile()) {
        // Verificar si es una imagen
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          photos.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error scanning directory ${dir}:`, error.message);
  }
  
  return photos;
}

/**
 * Migra una foto individual a MongoDB
 */
async function migratePhoto(photoPath) {
  try {
    const filename = path.basename(photoPath);
    const stats = await getFileStats(photoPath);
    const metadata = await readPhotoMetadata(filename);
    const dimensions = await getImageDimensions(photoPath);
    const uploadSource = detectUploadSource(photoPath, metadata);
    const thumbnailUrl = await getThumbnailUrl(filename);
    
    // Construir el documento para MongoDB
    const photoDoc = {
      filename: filename,
      originalName: metadata.originalName || filename,
      uploadSource: uploadSource,
      fileSize: stats.size,
      mimeType: getMimeType(filename),
      dimensions: dimensions,
      uploadedAt: metadata.uploadedAt ? new Date(metadata.uploadedAt) : stats.birthtime,
      isPublic: metadata.isPublic !== undefined ? metadata.isPublic : true,
      status: 'ready',
      moderationStatus: 'approved',
      viewCount: 0,
      
      // Información del uploader (con defaults para migración)
      uploader: {
        name: metadata.uploaderName || metadata.userName || 'Usuario Migrado',
        ip: metadata.uploaderIp || '0.0.0.0',
        userAgent: metadata.userAgent || 'Migration Script v1.0'
      },
      
      // Contexto del evento
      eventMoment: metadata.eventMoment || 'general',
      comment: metadata.comment || undefined,
      
      // URLs específicas según el tipo
      ...(uploadSource === 'cloudinary' ? {
        cloudinaryId: metadata.cloudinaryId,
        cloudinaryUrl: metadata.cloudinaryUrl
      } : {
        localPath: `/uploads/boda-maribel-godofredo/fotos/${path.relative(FOTOS_DIR, photoPath).replace(/\\/g, '/')}`
      }),
      
      // Thumbnail si existe
      ...(thumbnailUrl && { thumbnailUrl })
    };
    
    // Verificar si ya existe
    const existingPhoto = await Photo.findOne({ filename: filename });
    if (existingPhoto) {
      console.log(`⏭️  Skipping ${filename} (already exists)`);
      return { status: 'skipped', filename };
    }
    
    // Crear el documento
    await Photo.create(photoDoc);
    console.log(`✅ Migrated: ${filename} (${uploadSource}, ${(stats.size / 1024).toFixed(1)}KB)`);
    
    return { status: 'migrated', filename, uploadSource, size: stats.size };
    
  } catch (error) {
    console.error(`❌ Error migrating ${photoPath}:`, error.message);
    return { status: 'error', filename: path.basename(photoPath), error: error.message };
  }
}

/**
 * Genera reporte de migración
 */
function generateReport(results) {
  const summary = results.reduce((acc, result) => {
    acc[result.status] = (acc[result.status] || 0) + 1;
    if (result.uploadSource) {
      acc.sources = acc.sources || {};
      acc.sources[result.uploadSource] = (acc.sources[result.uploadSource] || 0) + 1;
    }
    if (result.size) {
      acc.totalSize = (acc.totalSize || 0) + result.size;
    }
    return acc;
  }, {});
  
  console.log('\n📊 REPORTE DE MIGRACIÓN');
  console.log('========================');
  console.log(`✅ Migradas exitosamente: ${summary.migrated || 0}`);
  console.log(`⏭️  Ya existían: ${summary.skipped || 0}`);
  console.log(`❌ Errores: ${summary.error || 0}`);
  
  if (summary.sources) {
    console.log('\n📁 Por fuente:');
    Object.entries(summary.sources).forEach(([source, count]) => {
      console.log(`   ${source}: ${count}`);
    });
  }
  
  if (summary.totalSize) {
    console.log(`\n💾 Tamaño total migrado: ${(summary.totalSize / (1024 * 1024)).toFixed(2)} MB`);
  }
  
  if (summary.error > 0) {
    console.log('\n❌ Fotos con errores:');
    results.filter(r => r.status === 'error').forEach(result => {
      console.log(`   ${result.filename}: ${result.error}`);
    });
  }
  
  return summary;
}

/**
 * Función principal de migración
 */
async function migrateAllPhotos() {
  console.log('🚀 Iniciando migración de fotos existentes...\n');
  
  try {
    // Conectar a MongoDB
    await connectToMongoDB();
    console.log('✅ Conectado a MongoDB\n');
    
    // Verificar si el directorio de fotos existe
    try {
      await fs.access(FOTOS_DIR);
    } catch (error) {
      console.log('⚠️  No se encontró directorio de fotos existentes. Nada que migrar.');
      return;
    }
    
    // Escanear todas las fotos
    console.log('🔍 Escaneando directorio de fotos...');
    const photosPaths = await scanPhotosDirectory(FOTOS_DIR);
    console.log(`📸 Encontradas ${photosPaths.length} fotos para migrar\n`);
    
    if (photosPaths.length === 0) {
      console.log('✅ No hay fotos para migrar.');
      return;
    }
    
    // Migrar cada foto
    const results = [];
    for (let i = 0; i < photosPaths.length; i++) {
      const photoPath = photosPaths[i];
      console.log(`[${i + 1}/${photosPaths.length}] Migrando: ${path.basename(photoPath)}`);
      
      const result = await migratePhoto(photoPath);
      results.push(result);
      
      // Pequeña pausa para no sobrecargar la BD
      if (i % 10 === 0 && i > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    // Generar reporte final
    const summary = generateReport(results);
    
    console.log('\n🎉 ¡Migración completada!');
    
    // Verificar integridad
    const totalInDB = await Photo.countDocuments();
    console.log(`\n🔍 Verificación: ${totalInDB} fotos en MongoDB`);
    
  } catch (error) {
    console.error('💥 Error durante la migración:', error);
    process.exit(1);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('👋 Conexión a MongoDB cerrada');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  migrateAllPhotos()
    .then(() => {
      console.log('\n✨ Proceso completado exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error fatal:', error);
      process.exit(1);
    });
}

module.exports = {
  migrateAllPhotos,
  migratePhoto,
  scanPhotosDirectory
};
