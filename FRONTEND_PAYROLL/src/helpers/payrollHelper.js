import { deductions } from "@/data/deductions";

export const getTotalDeductions = (id_nomina) => {
  const totalDeductions = deductions
    .filter((deduction) => deduction.nomina_id_nomina === id_nomina)
    .reduce((acc, deduction) => acc + deduction.valor, 0);
  return totalDeductions;
}


export const getEmployeeNameByPayroll = (contracts, employees, payroll) => {
  const contract = contracts.find((contract) => contract.id_contrato === payroll.id_contrato);
  const employee = employees.find((emp) => emp.id_empleado === contract.id_empleado);
  return employee ? employee.nombre : "Empleado no encontrado";
}