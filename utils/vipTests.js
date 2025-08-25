// 🚀 VIP Performance & Responsive Test Script

// Detectar dispositivos de bajo rendimiento
const isLowPerformanceDevice = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isOldDevice = navigator.hardwareConcurrency < 4;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return isMobile && isOldDevice || prefersReducedMotion;
};

// Optimizar animaciones basado en el dispositivo
const optimizeAnimations = () => {
  if (isLowPerformanceDevice()) {
    document.documentElement.style.setProperty('--animation-duration-multiplier', '0.5');
    
    // Desactivar animaciones complejas
    const complexAnimations = document.querySelectorAll('.vip-shimmer, .vip-gradient-flow');
    complexAnimations.forEach(el => {
      el.style.animation = 'none';
    });
    
    console.log('🔧 VIP: Animaciones optimizadas para dispositivo de bajo rendimiento');
  }
};

// Verificar responsividad VIP
const checkVIPResponsiveness = () => {
  const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  };
  
  const currentWidth = window.innerWidth;
  let deviceType = 'desktop';
  
  if (currentWidth < breakpoints.mobile) {
    deviceType = 'mobile';
  } else if (currentWidth < breakpoints.tablet) {
    deviceType = 'tablet';
  }
  
  document.documentElement.setAttribute('data-device-type', deviceType);
  console.log(`📱 VIP: Dispositivo detectado - ${deviceType} (${currentWidth}px)`);
  
  return deviceType;
};

// Verificar carga de colores VIP
const verifyVIPColors = () => {
  const requiredColors = [
    '--color-verde-esmeralda',
    '--color-rojo-vino', 
    '--color-dorado',
    '--color-marfil',
    '--color-marfil-suave'
  ];
  
  const missingColors = [];
  
  requiredColors.forEach(color => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(color);
    if (!value.trim()) {
      missingColors.push(color);
    }
  });
  
  if (missingColors.length > 0) {
    console.warn('⚠️ VIP: Colores faltantes:', missingColors);
    return false;
  }
  
  console.log('🎨 VIP: Paleta de colores mexicana cargada correctamente');
  return true;
};

// Test de rendimiento de animaciones
const testAnimationPerformance = () => {
  let frameCount = 0;
  let startTime = performance.now();
  
  const measureFPS = () => {
    frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - startTime;
    
    if (elapsed >= 1000) {
      const fps = Math.round((frameCount * 1000) / elapsed);
      console.log(`⚡ VIP: FPS actual - ${fps}`);
      
      if (fps < 30) {
        console.warn('⚠️ VIP: Rendimiento bajo detectado, aplicando optimizaciones...');
        optimizeAnimations();
      }
      
      frameCount = 0;
      startTime = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
  };
  
  requestAnimationFrame(measureFPS);
};

// Verificar componentes VIP
const verifyVIPComponents = () => {
  const vipComponents = [
    'nav[class*="vip-gradient-flow"]',
    '.vip-shimmer',
    '.vip-hover-lift',
    '.vip-pulse-tricolor'
  ];
  
  const loadedComponents = [];
  const missingComponents = [];
  
  vipComponents.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      loadedComponents.push(selector);
    } else {
      missingComponents.push(selector);
    }
  });
  
  console.log('✅ VIP: Componentes cargados:', loadedComponents);
  if (missingComponents.length > 0) {
    console.warn('⚠️ VIP: Componentes faltantes:', missingComponents);
  }
  
  return {
    loaded: loadedComponents.length,
    missing: missingComponents.length,
    total: vipComponents.length
  };
};

// Inicializar tests VIP
const initVIPTests = () => {
  console.log('🚀 Iniciando VIP Performance & Responsive Tests...');
  
  // Ejecutar tests básicos
  const colorsOK = verifyVIPColors();
  const deviceType = checkVIPResponsiveness();
  const componentStats = verifyVIPComponents();
  
  // Optimizar si es necesario
  optimizeAnimations();
  
  // Monitorear rendimiento
  testAnimationPerformance();
  
  // Reporte final
  setTimeout(() => {
    console.log(`
🎉 VIP SYSTEM STATUS REPORT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Paleta Mexicana: ${colorsOK ? '✅' : '❌'}
📱 Dispositivo: ${deviceType}
🏗️ Componentes: ${componentStats.loaded}/${componentStats.total}
🚀 Optimizaciones: ${isLowPerformanceDevice() ? 'Aplicadas' : 'No necesarias'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
  }, 2000);
};

// Auto-ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVIPTests);
} else {
  initVIPTests();
}

// Exportar para uso manual
window.VIPTests = {
  initVIPTests,
  verifyVIPColors,
  checkVIPResponsiveness,
  verifyVIPComponents,
  optimizeAnimations,
  isLowPerformanceDevice
};

export default initVIPTests;
