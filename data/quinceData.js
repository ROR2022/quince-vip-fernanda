// 💃 Quinceañera Data - Datos centralizados de los XV años
export const quinceData = {
  // 👑 Información de la quinceañera
  quinceañera: {
    name: "Fernanda Pérez Benítez",
    nickname: "Fernanda",
    initials: "F.P.B",
    quote: "Hoy dejo atrás mi niñez para convertirme en una mujer, acompáñame en este momento tan especial...",
    mainImage: "/images/logoAurora.png",
    glamourImage: "/images/quince1.jpeg"
  },

  // 👨‍👩‍👧‍👦 Información de los padres
  parents: {
    father: "Sr. [Nombre del Padre]",
    mother: "Sra. [Nombre de la Madre]",
    message: "Queridos familiares y amigos: con gran alegría los invitamos a acompañarnos en la celebración de los XV años de nuestra querida hija Fernanda. Este momento marca el inicio de una nueva etapa en su vida."
  },

  // 📅 Información de fecha y evento
  celebration: {
    date: "2025-12-6T19:00:00",
    dayName: "SABADO",
    day: "6",
    month: "DICIEMBRE", 
    year: "2025",
    title: "Mis XV Años"
  },

  // ⛪ Información de la ceremonia religiosa
  ceremony: {
    time: "6:00 p.m",
    name: "Iglesia [Nombre de la Iglesia]",
    address: "Dirección de la iglesia, Ciudad, Estado",
    type: "Misa de Acción de Gracias",
    ubiLink: "https://maps.app.goo.gl/[LinkDeLaIglesia]"
  },

  // 🎉 Información de la fiesta
  party: {
    time: "8:00 p.m",
    name: "Salón de Eventos [Nombre del Salón]",
    address: "Dirección del salón, Ciudad, Estado",
    type: "Fiesta de XV Años",
    ubiLink: "https://maps.app.goo.gl/[LinkDelSalon]"
  },

  // ⏰ Timeline del evento
  timeline: [
    {
      id: "bienvenida",
      name: "Bienvenida",
      time: "18:00",
      icon: "🥳", // Fiesta - símbolo de celebración
      color: "primary"
    },
    {
      id: "ceremonia",
      name: "Misa de Acción de Gracias",
      time: "18:30",
      icon: "⛪", // Iglesia - símbolo religioso
      color: "primary"
    },
    {
      id: "llegada-salon",
      name: "Llegada al Salón",
      time: "20:00",
      icon: "🚗", // Auto - traslado
      color: "primary"
    },
    {
      id: "recepcion",
      name: "Recepción",
      time: "20:30",
      icon: "🌹", // Rosa - elegancia
      color: "primary"
    },
    {
      id: "protocolo",
      name: "Protocolo de XV",
      time: "21:00",
      icon: "👑", // Corona - quinceañera
      color: "primary"
    },
    {
      id: "vals",
      name: "Vals de Honor",
      time: "21:30",
      icon: "💃", // Bailarina - vals tradicional
      color: "secondary"
    },
    {
      id: "brindis",
      name: "Brindis",
      time: "22:00",
      icon: "🥂", // Copas de champagne - celebración
      color: "secondary"
    },
    {
      id: "cena",
      name: "Cena",
      time: "22:30",
      icon: "🍽️", // Plato con cubiertos - cena elegante
      color: "primary"
    },
    {
      id: "pastel",
      name: "Partición del Pastel",
      time: "23:30",
      icon: "🎂", // Pastel - símbolo de celebración
      color: "primary"
    },
    {
      id: "baile",
      name: "Baile y Diversión",
      time: "00:00",
      icon: "🎵", // Nota musical - fiesta
      color: "primary"
    }
  ],

  // 👗 Código de vestimenta
  dressCode: {
    type: "Formal / Cocktail",
    note: "Se reserva el color rosa para la quinceañera",
    confirmationMessage: "¡Quiero compartir este momento tan especial contigo! Por favor ayúdanos confirmando tu asistencia"
  },

  // 🎁 Información de regalos
  gifts: {
    type: "Lluvia de sobres",
    message: "Tu presencia es lo más importante, pero si deseas hacernos un obsequio te agradeceríamos que fuera en lluvia de sobre."
  },

  // 📸 Galería de imágenes
  gallery: {
    images: [
      "/images/fernanda-1.png",
      "/images/fernanda-2.png",
      "/images/fernanda-glamour.png"
    ]
  },

  // 🏢 Información de la agencia
  agency: {
    name: "Agencia Online",
    message: "Te esperamos"
  },

  // 💬 Mensajes y frases
  messages: {
    timelineQuote: "Un momento único que marcará el inicio de mi nueva etapa.",
    dateMessage: "Acompáñame a celebrar mis XV años, una fecha que quedará grabada en mi corazón para siempre.",
    countdownTitle: "TAN SÓLO FALTAN"
  },

  // 🎨 Configuraciones de estilo y fondo
  styling: {
    heroSection: {
      backgroundImage: "/images/fernanda-main.png",
      // Opacidad del overlay (0 = transparente, 1 = opaco)
      overlayOpacity: 0.95,
      // Tipo de overlay: 'solid', 'gradient-top', 'gradient-bottom', 'gradient-radial'
      overlayType: "gradient-radial",
      // Color del overlay (usar formato CSS) - Rosa Aurora
      overlayColor: "rgba(255, 179, 217, 1)", // Rosa Aurora (#FFB3D9)
      // Color secundario para degradados
      overlayColorSecondary: "rgba(255, 179, 217, 0)", // Transparente
      // Configuración de degradado personalizada
      gradientDirection: "circle at center" // Para radial: 'circle at center', para lineal: 'to bottom'
    },
    dateSection: {
      backgroundImage: "/images/flores-quince.jpg",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(230, 217, 255, 1)", // Lavanda Aurora (#E6D9FF)
      overlayColorSecondary: "rgba(230, 217, 255, 0)",
      gradientDirection: "circle at center"
    },
    ceremonySection: {
      backgroundImage: "/images/iglesia-quince.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(253, 252, 252, 1)", // Blanco Seda (#FDFCFC)
      overlayColorSecondary: "rgba(253, 252, 252, 0)",
      gradientDirection: "circle at center"
    },
    partySection: {
      backgroundImage: "/images/salon-quince.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(255, 242, 204, 1)", // Oro Aurora (#FFF2CC)
      overlayColorSecondary: "rgba(255, 242, 204, 0)",
      gradientDirection: "circle at center"
    },
    timelineSection: {
      backgroundImage: "/images/timeline-quince.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(240, 240, 245, 1)", // Plata Brillo (#F0F0F5)
      overlayColorSecondary: "rgba(240, 240, 245, 0)",
      gradientDirection: "circle at center"
    },
    dressCodeSection: {
      backgroundImage: "/images/dresscode-quince.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(248, 246, 240, 1)", // Perla (#F8F6F0)
      overlayColorSecondary: "rgba(248, 246, 240, 0)",
      gradientDirection: "circle at center"
    },
    giftsSection: {
      backgroundImage: "/images/gifts-quince.png",
      overlayOpacity: 0.95,
      overlayType: "gradient-radial",
      overlayColor: "rgba(255, 179, 217, 1)", // Rosa Aurora (#FFB3D9)
      overlayColorSecondary: "rgba(255, 179, 217, 0)",
      gradientDirection: "circle at center"
    }
  },

  // 🎵 Configuración de audio
  audio: {
    src: "/audio/musica.mp3",
    fallbacks: [
      "/audio/musica-quince.ogg",
      "/audio/musica-quince.wav"
    ],
    title: "Música de Fondo de XV Años",
    startTime: 0,         // Desde el inicio
    endTime: 120,         // 2 minutos
    volume: 0.6,          // 60% de volumen
    loop: true,           // Loop en el rango especificado
    preload: "metadata",  // Precargar solo metadatos
    enabled: true,        // Control habilitado
    position: {
      desktop: { bottom: "2rem", right: "2rem" },
      mobile: { bottom: "1rem", right: "1rem" }
    },
    styling: {
      size: {
        desktop: "60px",
        mobile: "50px"
      },
      colors: {
        primary: "var(--secondary)",  // Rosa/Dorado
        hover: "var(--secondary)/90"
      }
    }
  }
}
