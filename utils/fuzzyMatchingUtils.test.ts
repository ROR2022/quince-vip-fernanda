/**
 * 🧪 Tests para Fuzzy Matching Utils
 * 
 * Archivo de pruebas para validar el funcionamiento de los algoritmos
 * de fuzzy matching antes de integrarlos al sistema principal.
 * 
 * Para ejecutar: abrir en navegador o ejecutar con Node.js
 * 
 * @author Sistema de Invitaciones VIP
 * @date 26 de agosto, 2025
 */

import { 
  normalizeText,
  calculateSimilarity,
  levenshteinDistance,
  findBestGuestMatch,
  findMultipleMatches,
  runFuzzyMatchingTests,
  FUZZY_CONFIG
} from './fuzzyMatchingUtils';

import { IGuest } from '@/models/Guest';

// 🎭 Datos de prueba simulando invitados reales
const mockGuests: Partial<IGuest>[] = [
  { _id: '1', name: 'María José González' },
  { _id: '2', name: 'Ana Isabel Martínez' },
  { _id: '3', name: 'Carlos Eduardo Ruiz' },
  { _id: '4', name: 'Sofía Alejandra Torres' },
  { _id: '5', name: 'Roberto José Hernández' },
  { _id: '6', name: 'Lucía Mercedes Herrera' },
  { _id: '7', name: 'Fernando José García' },
  { _id: '8', name: 'Carmen Rosa López' },
  { _id: '9', name: 'José María Rodríguez' },
  { _id: '10', name: 'Isabella Valentina Cruz' },
  { _id: '11', name: 'María Elena Vásquez' },
  { _id: '12', name: 'Juan Carlos Mendoza' },
  { _id: '13', name: 'Gabriela Paola Jiménez' },
  { _id: '14', name: 'Andrés Felipe Morales' },
  { _id: '15', name: 'Valeria Cristina Santos' }
];

console.log('🧪 Iniciando Tests de Fuzzy Matching\n');
console.log('=' .repeat(60));

// 📊 Test 1: Normalización de texto
console.log('\n📝 Test 1: Normalización de texto');
console.log('-'.repeat(40));

const normalizationTests = [
  'María José',
  'MARÍA JOSÉ GONZÁLEZ',
  'maría   josé    gonzález',
  'María-José González!',
  'Sofía Alejandra (Torres)',
  'José María Rodríguez & Co.',
  'Ana.Isabel@Martínez'
];

normalizationTests.forEach(test => {
  console.log(`Original: "${test}"`);
  console.log(`Normalizado: "${normalizeText(test)}"`);
  console.log('');
});

// 🔢 Test 2: Distancia de Levenshtein
console.log('\n🔢 Test 2: Distancia de Levenshtein');
console.log('-'.repeat(40));

const levenshteinTests = [
  ['María José', 'María José'],
  ['María José', 'Maria Jose'],
  ['María José', 'Mária Jossé'],
  ['María José', 'Maria Jorse'],
  ['María José', 'Pedro Sánchez'],
  ['Ana', 'Anna'],
  ['Carlos', 'Karlos']
];

levenshteinTests.forEach(([str1, str2]) => {
  const distance = levenshteinDistance(normalizeText(str1), normalizeText(str2));
  console.log(`"${str1}" vs "${str2}" = ${distance} operaciones`);
});

// 📊 Test 3: Cálculo de similitud
console.log('\n📊 Test 3: Cálculo de similitud');
console.log('-'.repeat(40));

const similarityTests = [
  ['María José', 'María José'],
  ['María José', 'Maria Jose'],
  ['María José', 'Mária Jossé'],
  ['María José', 'Maria Jorse'],
  ['María José', 'José María'],
  ['María', 'María José González'],
  ['José', 'José María Rodríguez'],
  ['Carlos', 'Carlos Eduardo'],
  ['Ana Isabel', 'Ana'],
  ['Pedro Sánchez', 'María José']
];

similarityTests.forEach(([search, target]) => {
  const similarity = calculateSimilarity(search, target);
  const status = similarity >= FUZZY_CONFIG.SIMILARITY_THRESHOLD ? '✅' : '❌';
  console.log(`${status} "${search}" vs "${target}" = ${similarity.toFixed(1)}%`);
});

// 🎯 Test 4: Búsqueda de mejor coincidencia
console.log('\n🎯 Test 4: Búsqueda de mejor coincidencia');
console.log('-'.repeat(40));

const searchTests = [
  'Maria Jose',           // Debería encontrar "María José González"
  'Ana Isabel',           // Debería encontrar "Ana Isabel Martínez"
  'Carlos Eduardo',       // Debería encontrar "Carlos Eduardo Ruiz"
  'Sofia Torres',         // Debería encontrar "Sofía Alejandra Torres"
  'Roberto Jose',         // Debería encontrar "Roberto José Hernández"
  'Jose Maria',           // Debería encontrar "José María Rodríguez"
  'María',                // Podría encontrar múltiples Marías
  'Pedro Pérez',          // No debería encontrar nada
  'Juan Carlos',          // Debería encontrar "Juan Carlos Mendoza"
  'Valeria Santos'        // Debería encontrar "Valeria Cristina Santos"
];

searchTests.forEach(searchName => {
  console.log(`\n🔍 Buscando: "${searchName}"`);
  
  const match = findBestGuestMatch(searchName, mockGuests as IGuest[]);
  
  if (match) {
    console.log(`✅ Encontrado: "${match.guest.name}"`);
    console.log(`   Similitud: ${match.similarity.toFixed(1)}%`);
    console.log(`   Tipo: ${match.matchType}`);
    console.log(`   Exacto: ${match.isExactMatch ? 'Sí' : 'No'}`);
  } else {
    console.log('❌ No se encontró coincidencia suficiente');
  }
});

// 🔍 Test 5: Búsquedas múltiples
console.log('\n🔍 Test 5: Búsquedas múltiples');
console.log('-'.repeat(40));

const multiSearchTests = ['María', 'José', 'Carlos'];

multiSearchTests.forEach(searchName => {
  console.log(`\n🔍 Búsqueda múltiple: "${searchName}"`);
  
  const matches = findMultipleMatches(searchName, mockGuests as IGuest[], 3);
  
  if (matches.length > 0) {
    console.log(`✅ Encontradas ${matches.length} coincidencias:`);
    matches.forEach((match, index) => {
      console.log(`   ${index + 1}. "${match.guest.name}" (${match.similarity.toFixed(1)}%)`);
    });
  } else {
    console.log('❌ No se encontraron coincidencias');
  }
});

// 🧪 Test 6: Casos edge
console.log('\n🧪 Test 6: Casos edge');
console.log('-'.repeat(40));

const edgeTests = [
  '',                     // String vacío
  ' ',                    // Solo espacios
  'A',                    // Muy corto
  'X'.repeat(150),        // Muy largo
  '123',                  // Solo números
  '!@#$%',               // Solo símbolos
  'María   José    ',     // Espacios extra
  null,                   // Valor null
  undefined              // Valor undefined
];

edgeTests.forEach(test => {
  console.log(`\n🧪 Caso edge: ${JSON.stringify(test)}`);
  
  try {
    const normalized = normalizeText(test as string);
    console.log(`   Normalizado: "${normalized}"`);
    
    if (normalized.length >= FUZZY_CONFIG.MIN_NAME_LENGTH) {
      const match = findBestGuestMatch(test as string, mockGuests as IGuest[]);
      console.log(`   Match: ${match ? `"${match.guest.name}" (${match.similarity.toFixed(1)}%)` : 'Ninguno'}`);
    } else {
      console.log(`   ⚠️ Nombre demasiado corto para búsqueda`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error}`);
  }
});

// 📊 Test 7: Performance
console.log('\n📊 Test 7: Test de performance');
console.log('-'.repeat(40));

const performanceTest = () => {
  const testName = 'María José González';
  const iterations = 1000;
  
  console.log(`Ejecutando ${iterations} búsquedas de "${testName}"...`);
  
  const startTime = Date.now();
  
  for (let i = 0; i < iterations; i++) {
    findBestGuestMatch(testName, mockGuests as IGuest[]);
  }
  
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  const avgTime = totalTime / iterations;
  
  console.log(`✅ Performance: ${totalTime}ms total, ${avgTime.toFixed(2)}ms promedio`);
  console.log(`   Throughput: ${(iterations / (totalTime / 1000)).toFixed(0)} búsquedas/segundo`);
};

performanceTest();

// 🎯 Ejecutar tests automáticos del módulo
console.log('\n🎯 Tests automáticos del módulo');
console.log('-'.repeat(40));
runFuzzyMatchingTests();

// 📋 Resumen de configuración
console.log('\n📋 Configuración actual');
console.log('-'.repeat(40));
console.log(`Threshold de similitud: ${FUZZY_CONFIG.SIMILARITY_THRESHOLD}%`);
console.log(`Longitud mínima: ${FUZZY_CONFIG.MIN_NAME_LENGTH} caracteres`);
console.log(`Longitud máxima: ${FUZZY_CONFIG.MAX_NAME_LENGTH} caracteres`);
console.log(`Bonus coincidencia exacta: ${FUZZY_CONFIG.EXACT_MATCH_BONUS}%`);

console.log('\n🎉 Tests de Fuzzy Matching completados');
console.log('=' .repeat(60));

export { mockGuests };
