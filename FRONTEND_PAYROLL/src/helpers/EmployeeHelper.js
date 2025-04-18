import { department } from "@/data/department";
import { employees } from "@/data/employees";

export const getEmployeeName = (id_empleado) => {
  const employee = employees.find((emp) => emp.id_empleado === id_empleado);
  return  employee.nombre;
}

export const getEmployeeDocument = (id_empleado) => {
  const employee = employees.find((emp) => emp.id_empleado === id_empleado);
  return  employee.documento;
}

export const getEmployeeId = (documento) => {
  const employee = employees.find((emp) => emp.documento === documento);
  return  employee.id_empleado;
}

export const getDepartmentName = (department_id) => {
  const departamento = department.find((dep) => dep.id_departamento === department_id);
  return departamento ? departamento.nombre : "Departamento no encontrado";
};