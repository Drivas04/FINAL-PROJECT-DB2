
export const getEmployeeName = (idEmpleado, employees) => {
  const employee = employees.find((emp) => emp.idEmpleado === idEmpleado);
  return  employee ? employee.nombre: "Empleado no encontrado";
}

export const getEmployeeDocument = (idEmpleado, employees) => {
  const employee = employees.find((emp) => emp.idEmpleado === idEmpleado);
  return  employee ? employee.numeroDocumento: "Documento no encontrado";
}

export const getEmployeeId = (numeroDocumento, employees) => {
  const employee = employees.find((emp) => emp.numeroDocumento === numeroDocumento);
  return  employee.idEmpleado;
}

export const getDepartmentName = (department_id, departments) => {
  const departamento = departments.find((dep) => dep.id === department_id);
  return departamento ? departamento.nombreDepartamento : "Departamento no encontrado";
};