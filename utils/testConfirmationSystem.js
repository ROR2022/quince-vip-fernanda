/**
 * 🧪 Script de Prueba del Sistema de Confirmación Automática
 * 
 * Este script permite probar el endpoint de confirmación sin usar el frontend.
 * Útil para testing y debugging durante el desarrollo.
 * 
 * Para usar:
 * 1. Iniciar el servidor de desarrollo: npm run dev
 * 2. Modificar los datos de prueba abajo
 * 3. Ejecutar este archivo o copiar el código en la consola del navegador
 * 
 * @author Sistema de Invitaciones VIP
 * @date 26 de agosto, 2025
 */

// 🎯 Configuración de la prueba
const API_BASE_URL = 'http://localhost:3000'; // Cambiar por tu URL de desarrollo
const ENDPOINT = '/api/guests/confirm';

// 📋 Casos de prueba para el sistema
const testCases = [
    {
        name: 'Test 1: Nombre exacto existente',
        description: 'Debería encontrar match exacto si el invitado existe',
        data: {
            name: 'María José González',
            numberOfGuests: 2,
            willAttend: true,
            comments: 'Muy emocionada por el evento',
            phone: '7131234567'
        },
        expectedAction: 'updated'
    },
    {
        name: 'Test 2: Nombre con error de tipeo',
        description: 'Debería encontrar match con fuzzy matching',
        data: {
            name: 'Maria Jose',
            numberOfGuests: 1,
            willAttend: true,
            comments: 'Sin acentos pero debería funcionar',
            phone: '7139876543'
        },
        expectedAction: 'updated'
    },
    {
        name: 'Test 3: Nuevo invitado',
        description: 'Debería crear nuevo registro para nombre no encontrado',
        data: {
            name: 'Pedro López Nuevo',
            numberOfGuests: 3,
            willAttend: true,
            comments: 'Invitado nuevo que no estaba en la lista',
            phone: '7135555555'
        },
        expectedAction: 'created'
    },
    {
        name: 'Test 4: Confirmación negativa',
        description: 'Debería procesar correctamente una declinación',
        data: {
            name: 'Ana Isabel Martínez',
            numberOfGuests: 0,
            willAttend: false,
            comments: 'Lamentablemente no podré asistir',
            phone: '7137777777'
        },
        expectedAction: 'updated'
    },
    {
        name: 'Test 5: Datos mínimos',
        description: 'Debería funcionar solo con nombre y confirmación',
        data: {
            name: 'Carlos Eduardo',
            numberOfGuests: 1,
            willAttend: true
        },
        expectedAction: 'updated'
    },
    {
        name: 'Test 6: Datos inválidos',
        description: 'Debería rechazar datos inválidos',
        data: {
            name: '', // Nombre vacío - debería fallar
            numberOfGuests: 2,
            willAttend: true
        },
        expectedAction: 'error'
    }
];

/**
 * 🎯 Función para ejecutar una prueba individual
 */
async function runSingleTest(testCase, index) {
    console.log(`\n🧪 ${testCase.name}`);
    console.log(`📝 ${testCase.description}`);
    console.log(`📤 Datos de entrada:`, testCase.data);
    
    try {
        const response = await fetch(`${API_BASE_URL}${ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testCase.data),
        });

        const result = await response.json();
        
        // Evaluar resultado
        const success = result.action === testCase.expectedAction;
        const status = success ? '✅' : '❌';
        
        console.log(`${status} Resultado:`, {
            action: result.action,
            success: result.success,
            guestName: result.guest?.name,
            similarity: result.matchInfo?.similarity,
            matchType: result.matchInfo?.matchType,
            expected: testCase.expectedAction,
            actual: result.action
        });

        if (result.matchInfo) {
            console.log(`🔍 Info del match:`, {
                similarity: `${result.matchInfo.similarity?.toFixed(1)}%`,
                wasExact: result.matchInfo.wasExactMatch,
                type: result.matchInfo.matchType,
                searchName: result.matchInfo.searchName,
                foundName: result.matchInfo.foundName
            });
        }

        return {
            testName: testCase.name,
            success,
            result,
            expected: testCase.expectedAction,
            actual: result.action
        };

    } catch (error) {
        console.error(`❌ Error en ${testCase.name}:`, error);
        return {
            testName: testCase.name,
            success: false,
            error: error.message,
            expected: testCase.expectedAction,
            actual: 'error'
        };
    }
}

/**
 * 🚀 Función principal para ejecutar todos los tests
 */
async function runAllTests() {
    console.log('🎯 Sistema de Confirmación Automática - Suite de Pruebas');
    console.log('=' .repeat(70));
    console.log(`📡 Endpoint: ${API_BASE_URL}${ENDPOINT}`);
    console.log(`🕒 Iniciando pruebas: ${new Date().toLocaleString()}`);
    
    const results = [];
    
    for (let i = 0; i < testCases.length; i++) {
        const result = await runSingleTest(testCases[i], i + 1);
        results.push(result);
        
        // Pausa entre tests para no sobrecargar la API
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 📊 Resumen de resultados
    console.log('\n📊 RESUMEN DE PRUEBAS');
    console.log('=' .repeat(70));
    
    const passed = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`✅ Pruebas exitosas: ${passed}/${results.length}`);
    console.log(`❌ Pruebas fallidas: ${failed}/${results.length}`);
    console.log(`📈 Tasa de éxito: ${((passed / results.length) * 100).toFixed(1)}%`);
    
    if (failed > 0) {
        console.log('\n❌ Pruebas fallidas:');
        results.filter(r => !r.success).forEach(r => {
            console.log(`   • ${r.testName}: esperado "${r.expected}", obtenido "${r.actual}"`);
        });
    }
    
    console.log(`\n🕒 Pruebas completadas: ${new Date().toLocaleString()}`);
    
    return results;
}

/**
 * 📈 Función para obtener estadísticas del sistema
 */
async function getSystemStats() {
    try {
        console.log('\n📊 Obteniendo estadísticas del sistema...');
        
        const response = await fetch(`${API_BASE_URL}${ENDPOINT}`, {
            method: 'GET'
        });
        
        const stats = await response.json();
        
        if (stats.success) {
            console.log('📈 Estadísticas del sistema:', stats.data);
        } else {
            console.error('❌ Error obteniendo estadísticas:', stats.error);
        }
        
        return stats;
    } catch (error) {
        console.error('❌ Error en estadísticas:', error);
        return null;
    }
}

/**
 * 🎮 Función interactiva para probar casos específicos
 */
function createCustomTest(name, numberOfGuests, willAttend, comments = '', phone = '') {
    return runSingleTest({
        name: 'Test Personalizado',
        description: 'Prueba personalizada',
        data: { name, numberOfGuests, willAttend, comments, phone },
        expectedAction: 'unknown'
    });
}

// 🎯 Exportar funciones para uso en consola
if (typeof window !== 'undefined') {
    // Ejecutar en navegador
    window.testConfirmationSystem = {
        runAllTests,
        runSingleTest,
        getSystemStats,
        createCustomTest,
        testMultiFieldMatching,
        runCompleteSuite,
        testCases
    };
    
    console.log('🎮 Sistema de pruebas multi-campo cargado!');
    console.log('📋 Funciones disponibles:');
    console.log('   • testConfirmationSystem.runAllTests() - Pruebas originales');
    console.log('   • testConfirmationSystem.testMultiFieldMatching() - Pruebas multi-campo');
    console.log('   • testConfirmationSystem.runCompleteSuite() - Suite completa');
    console.log('   • testConfirmationSystem.getSystemStats() - Ver estadísticas');
    console.log('   • testConfirmationSystem.createCustomTest(name, guests, willAttend, comments, phone) - Prueba personalizada');
    console.log('   • testConfirmationSystem.testCases - Ver casos de prueba');
    
} else {
    // Ejecutar en Node.js (si se requiere)
    module.exports = {
        runAllTests,
        runSingleTest,
        getSystemStats,
        createCustomTest,
        testCases
    };
}

/**
 * 🧪 Prueba específica para búsqueda multi-campo (nombre + teléfono)
 */
async function testMultiFieldMatching() {
    console.log('\n🔍 === PRUEBAS DE BÚSQUEDA MULTI-CAMPO ===\n');
    
    const testCases = [
        {
            name: '📱 Match por teléfono exacto',
            description: 'Mismo teléfono, nombre similar',
            data: { name: 'Sandy Sandoval', numberOfGuests: 2, willAttend: true, phone: '7771356658' }
        },
        {
            name: '� Match por nombre, sin teléfono previo',
            description: 'Nombre similar, agregar teléfono nuevo',
            data: { name: 'María José', numberOfGuests: 1, willAttend: true, phone: '5551234567' }
        },
        {
            name: '⚠️ Conflicto: nombre similar, teléfono diferente',
            description: 'Puede ser persona diferente con nombre similar',
            data: { name: 'Sandy', numberOfGuests: 1, willAttend: true, phone: '9999999999' }
        },
        {
            name: '🆕 Nuevo registro: nombre y teléfono únicos',
            description: 'No existe ninguna coincidencia',
            data: { name: 'Roberto Nuevo', numberOfGuests: 3, willAttend: true, phone: '1234567890' }
        }
    ];
    
    return runTestSuite('Multi-Campo', testCases);
}

/**
 * 🎯 Suite de pruebas completa incluyendo multi-campo
 */
async function runCompleteSuite() {
    console.log('🎯 === SUITE COMPLETA DE PRUEBAS ===\n');
    
    // Pruebas originales
    await runAllTests();
    
    // Nuevas pruebas multi-campo
    await testMultiFieldMatching();
    
    console.log('\n✅ Suite completa finalizada');
}

/**
 * �📝 Ejemplos de uso:
 * 
 * // Ejecutar todas las pruebas
 * await testConfirmationSystem.runAllTests();
 * 
 * // Pruebas multi-campo
 * await testConfirmationSystem.testMultiFieldMatching();
 * 
 * // Suite completa
 * await testConfirmationSystem.runCompleteSuite();
 * 
 * // Ver estadísticas
 * await testConfirmationSystem.getSystemStats();
 * 
 * // Prueba personalizada con teléfono
 * await testConfirmationSystem.createCustomTest('Juan Pérez', 2, true, 'Mensaje de prueba', '7131234567');
 * 
 * // Ejecutar una prueba específica
 * await testConfirmationSystem.runSingleTest(testConfirmationSystem.testCases[0]);
 */
