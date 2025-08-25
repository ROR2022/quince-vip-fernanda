// 📞 Constants - Configuraciones y constantes del proyecto

// 📱 Números de teléfono
export const PHONE_NUMBERS = {
  rsvp: "525542142715" // Reemplazar con el número real de WhatsApp
}

// 📍 Ubicaciones para Google Maps
export const LOCATIONS = {
  ceremony: "[Dirección de la iglesia]",
  party: "[Dirección del salón de fiestas]"
}

// 💬 Templates de mensajes para WhatsApp
export const WHATSAPP_MESSAGES = {
  rsvp: "¡Hola! Confirmo mi asistencia a los XV años de Fernanda Pérez Benítez el 15 de diciembre de 2025."
}

// 🎨 Configuraciones de tema - Paleta VIP Quinceañera
export const THEME_CONFIG = {
  colors: {
    // Colores principales para XV años
    primary: "rosa-elegante", // #FF69B4
    secondary: "dorado-champagne", // #F7E7CE
    background: "blanco-perla", // #F8F8FF
    
    // Acentos premium
    accent: "dorado", // #C2A878
    muted: "rosa-suave", // #FFB6C1
    neutral: "gris-perla", // #E6E6FA
    
    // Para compatibilidad con código existente
    "sage-green": "rosa-elegante", 
    gold: "dorado-champagne"
  },
  gradients: {
    principal: "var(--gradient-principal)",
    secundario: "var(--gradient-secundario)",
    fondo: "var(--gradient-fondo)",
    vip: "var(--gradient-vip)"
  },
  fonts: {
    script: "Playfair Display",
    body: "Open Sans"
  }
}

// 📱 Configuraciones de navegación
export const NAVIGATION_SECTIONS = [
  { id: "home", label: "Inicio" },
  { id: "parents", label: "Padres" },
  { id: "date", label: "Fecha" },
  { id: "ceremony", label: "Ceremonia" },
  { id: "party", label: "Fiesta" },
  { id: "timeline", label: "Cronograma" },
  { id: "dresscode", label: "Vestimenta" },
  { id: "gifts", label: "Regalos" },
  { id: "gallery", label: "Galería" }
]

// 🖼️ Rutas de imágenes
export const IMAGE_PATHS = {
  quinceañera: {
    main: "/images/fernanda-main.png",
    glamour: "/images/fernanda-glamour.png"
  },
  decorative: {
    floralBorder: "/images/floral-border-quince.png",
    celebration: "/images/celebration-quince.png"
  },
  gallery: [
    "/images/fernanda-1.png",
    "/images/fernanda-2.png"
  ]
}

// ⚙️ Configuraciones de la aplicación
export const APP_CONFIG = {
  title: "Fernanda Pérez Benítez - Invitación de XV Años",
  description: "Te invitamos a celebrar mis XV años - 15 de Diciembre 2025",
  language: "es"
}
