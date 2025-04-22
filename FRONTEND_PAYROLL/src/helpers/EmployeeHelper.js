import { department } from "@/data/department";

export const getEmployeeName = (id_empleado, employees) => {
  const employee = employees.find((emp) => emp.id_empleado === id_empleado);
  return  employee ? employee.nombre: "Empleado no encontrado";
}

export const getEmployeeDocument = (id_empleado, employees) => {
  const employee = employees.find((emp) => emp.id_empleado === id_empleado);
  return  employee ? employee.documento: "Documento no encontrado";
}

export const getEmployeeId = (documento, employees) => {
  const employee = employees.find((emp) => emp.documento === documento);
  return  employee.id_empleado;
}

export const getDepartmentName = (department_id) => {
  const departamento = department.find((dep) => dep.id_departamento === department_id);
  return departamento ? departamento.nombre : "Departamento no encontrado";
};