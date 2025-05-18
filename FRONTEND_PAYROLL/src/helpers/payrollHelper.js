

// Versión corregida de la función
export const getEmployeeByPayroll = (contracts, employees, payroll) => {
  try {
    // Verificar que todos los parámetros son válidos
    if (!contracts || !Array.isArray(contracts) || contracts.length === 0) {
      console.warn("Contratos no válidos:", contracts);
      return { nombre: "Contrato no encontrado", id: null };
    }
    
    if (!employees || !Array.isArray(employees) || employees.length === 0) {
      console.warn("Empleados no válidos:", employees);
      return { nombre: "Empleado no disponible", id: null };
    }
    
    if (!payroll || !payroll.contratoIdContrato) {
      console.warn("Nómina no válida o sin ID de contrato:", payroll);
      return { nombre: "Nómina sin contrato", id: null };
    }

    // Buscar el contrato asociado a la nómina
    const contratoAsociado = contracts.find(
      (contrato) => contrato.idContrato === payroll.contratoIdContrato
    );
    
    if (!contratoAsociado) {
      console.warn(`No se encontró contrato con ID ${payroll.contratoIdContrato}`);
      return { nombre: "Contrato no encontrado", id: null };
    }

    // Buscar el empleado asociado al contrato
    const empleadoAsociado = employees.find(
      (empleado) => empleado.idEmpleado === contratoAsociado.empleadoIdEmpleado
    );
    
    if (!empleadoAsociado) {
      console.warn(`No se encontró empleado para el contrato ${contratoAsociado.idContrato}`);
      return { nombre: "Empleado no encontrado", id: null };
    }

    // Retornar el empleado encontrado
    return {
      nombre: empleadoAsociado.nombre,
      id: empleadoAsociado.idEmpleado,
      documento: empleadoAsociado.numeroDocumento
    };
  } catch (error) {
    console.error("Error al obtener empleado por nómina:", error);
    return { nombre: "Error al obtener empleado", id: null };
  }
};

export const getPayrrolPayrrollById = (payrollNews, id_nomina) => {
  const payroll = payrollNews.find((payroll) => payroll.nominaIdNomina === id_nomina);
  return payroll ? payroll : "Nómina no encontrada";
}