/**
 * Utilidades para depuración y diagnóstico de la aplicación
 */
import axios from 'axios';

/**
 * Muestra información completa sobre un objeto de respuesta HTTP
 * @param {Object} response - Objeto de respuesta de Axios
 * @param {String} label - Etiqueta para identificar el log
 */
export const logApiResponse = (response, label = "API Response") => {
  console.group(`${label} (${new Date().toISOString()})`);
  
  try {
    // Información básica
    console.log("Status:", response.status);
    console.log("Status Text:", response.statusText);
    console.log("URL:", response.config?.url);
    console.log("Method:", response.config?.method?.toUpperCase());
    
    // Headers
    console.log("Headers:", response.headers);
    
    // Data
    console.log("Data Type:", typeof response.data);
    console.log("Data:", response.data);
    
    if (typeof response.data === 'object' && response.data !== null) {
      console.log("Data Structure:", Object.keys(response.data));
      console.log("Data JSON:", JSON.stringify(response.data, null, 2));
    }
  } catch (error) {
    console.error("Error al analizar respuesta:", error);
  }
  
  console.groupEnd();
};

/**
 * Intenta extraer un ID de nómina de diferentes formatos de respuesta
 * @param {Object} response - La respuesta completa de la API
 * @returns {Number|null} - El ID extraído o null si no se encuentra
 */
export const extractNominaId = (response) => {
  // Intentar en diferentes lugares y formatos
  let idNomina = null;
  const data = response.data;
  
  // Caso 1: Objeto con propiedad idNomina o id_nomina
  if (typeof data === 'object' && data !== null) {
    // Probar diferentes formatos de propiedad
    const posiblesPropiedades = ['idNomina', 'id_nomina', 'id', 'nominaId', 'nomina_id'];
    
    for (const prop of posiblesPropiedades) {
      if (data[prop] !== undefined && data[prop] !== null) {
        idNomina = data[prop];
        console.log(`ID encontrado en propiedad '${prop}':`, idNomina);
        break;
      }
    }
    
    // Buscar en objetos anidados
    if (!idNomina) {
      const objetosAnidados = ['nomina', 'data', 'resultado', 'result', 'response'];
      
      for (const obj of objetosAnidados) {
        if (data[obj] && typeof data[obj] === 'object') {
          for (const prop of posiblesPropiedades) {
            if (data[obj][prop] !== undefined && data[obj][prop] !== null) {
              idNomina = data[obj][prop];
              console.log(`ID encontrado en ${obj}.${prop}:`, idNomina);
              break;
            }
          }
        }
        if (idNomina) break;
      }
    }
  }
  
  // Caso 2: La respuesta es un número directo
  if (!idNomina && typeof data === 'number') {
    idNomina = data;
    console.log("ID encontrado como número directo:", idNomina);
  }
  
  // Caso 3: La respuesta es un string que podría ser un ID
  if (!idNomina && typeof data === 'string') {
    // Intentar convertir a número si es un string numérico
    const parsedId = parseInt(data);
    if (!isNaN(parsedId)) {
      idNomina = parsedId;
      console.log("ID encontrado como string numérico:", idNomina);
    } else {
      // Intentar extraer un número de la respuesta usando regex
      const matches = data.match(/\d+/);
      if (matches && matches.length > 0) {
        idNomina = parseInt(matches[0]);
        console.log("ID encontrado mediante regex en string:", idNomina);
      }
    }
  }
  
  // Caso 4: En las cabeceras, especialmente con RESTful APIs
  if (!idNomina && response.headers && response.headers.location) {
    const locationUrl = response.headers.location;
    console.log("Encontrada cabecera Location:", locationUrl);
    
    const locationParts = locationUrl.split('/');
    const lastPart = locationParts[locationParts.length - 1];
    const parsedId = parseInt(lastPart);
    
    if (!isNaN(parsedId)) {
      idNomina = parsedId;
      console.log("ID encontrado en la cabecera Location:", idNomina);
    }
  }
  
  return idNomina;
};

/**
 * Registra intentos de extracción de ID y su resultado
 * @param {Object} data - Datos de respuesta
 * @returns {Number|null} - El ID encontrado o null
 */
export const logIDExtraction = (data) => {
  console.group("Intentos de extracción de ID");
  
  let idExtraido = null;
  const intentos = [
    { nombre: "idNomina", valor: data.idNomina },
    { nombre: "id_nomina", valor: data.id_nomina },
    { nombre: "id", valor: data.id },
    { nombre: "nominaId", valor: data.nominaId },
    { nombre: "Conversión directa", valor: typeof data === 'number' ? data : null },
    { nombre: "String numérico", valor: typeof data === 'string' ? (isNaN(parseInt(data)) ? null : parseInt(data)) : null },
  ];
  
  intentos.forEach(intento => {
    const resultado = intento.valor !== undefined && intento.valor !== null;
    console.log(`${intento.nombre}: ${resultado ? 'ENCONTRADO' : 'NO ENCONTRADO'} ${resultado ? intento.valor : ''}`);
    
    if (resultado && idExtraido === null) {
      idExtraido = intento.valor;
    }
  });
  
  console.log("ID extraído final:", idExtraido);
  console.groupEnd();
  
  return idExtraido;
};

/**
 * Verifica si una nómina fue creada exitosamente buscando la nómina más reciente del contrato
 * @param {Number} contratoId - ID del contrato
 * @param {String} periodo - Periodo de la nómina (YYYY-MM-DD)
 * @returns {Promise<Number|null>} - ID de la nómina encontrada o null
 */
export const verificarNominaCreada = async (contratoId, periodo) => {
  console.log("Verificando si la nómina fue creada:", { contratoId, periodo });
  
  try {
    // Obtener todas las nóminas del contrato
    const response = await axios.get(`http://localhost:8080/nominas/contrato/${contratoId}`);
    
    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      console.log("No se encontraron nóminas para el contrato:", contratoId);
      return null;
    }
    
    console.log("Nóminas encontradas para el contrato:", response.data.length);
    
    // Buscar la nómina con el periodo especificado (puede estar en diferentes formatos)
    const nominaEncontrada = response.data.find(nomina => {
      // Normalizar el periodo para comparación (eliminar tiempo si existe)
      const periodoNomina = nomina.periodo ? nomina.periodo.split('T')[0] : null;
      const periodoComparar = periodo ? periodo.split('T')[0] : null;
      
      return periodoNomina === periodoComparar;
    });
    
    if (nominaEncontrada) {
      const idNomina = nominaEncontrada.idNomina || nominaEncontrada.id_nomina || nominaEncontrada.id;
      console.log("Nómina encontrada con periodo coincidente:", { id: idNomina, periodo: nominaEncontrada.periodo });
      return idNomina;
    }
    
    // Si no se encuentra por periodo exacto, obtener la más reciente
    // Ordenar por fecha de creación descendente (asumiendo que la más reciente es la que acabamos de crear)
    const nominasOrdenadas = [...response.data].sort((a, b) => {
      // Usar fechaCreacion si existe, o periodo en su defecto
      const fechaA = a.fechaCreacion || a.fecha_creacion || a.periodo;
      const fechaB = b.fechaCreacion || b.fecha_creacion || b.periodo;
      
      // Si ambas fechas son válidas, comparar
      if (fechaA && fechaB) {
        return new Date(fechaB) - new Date(fechaA);
      }
      
      // Si hay algún problema con las fechas, usar el ID (asumiendo que IDs mayores son más recientes)
      return (b.idNomina || b.id || 0) - (a.idNomina || a.id || 0);
    });
    
    if (nominasOrdenadas.length > 0) {
      const nominaMasReciente = nominasOrdenadas[0];
      const idNomina = nominaMasReciente.idNomina || nominaMasReciente.id_nomina || nominaMasReciente.id;
      console.log("Usando la nómina más reciente:", { id: idNomina, periodo: nominaMasReciente.periodo });
      return idNomina;
    }
    
    console.log("No se pudo encontrar ninguna nómina para el contrato");
    return null;
  } catch (error) {
    console.error("Error al verificar la creación de la nómina:", error);
    return null;
  }
};
