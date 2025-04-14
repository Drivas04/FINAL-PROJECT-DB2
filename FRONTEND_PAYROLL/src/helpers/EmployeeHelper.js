import { employees } from "@/data/employees";

export const getEmployeeName = (id_empleado) => {
  const employee = employees.find((emp) => emp.id_empleado === id_empleado);
  return  employee.nombre;
}

export const getEmployeeDocument = (id_empleado) => {
  const employee = employees.find((emp) => emp.id_empleado === id_empleado);
  return  employee.documento;
}