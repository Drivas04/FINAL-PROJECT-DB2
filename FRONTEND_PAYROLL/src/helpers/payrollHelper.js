import { deductions } from "@/data/deductions";

export const getTotalDeductions = (id_nomina) => {
  const totalDeductions = deductions
    .filter((deduction) => deduction.nomina_id_nomina === id_nomina)
    .reduce((acc, deduction) => acc + deduction.valor, 0);
  return totalDeductions;
}


export const getEmployeeByPayroll = (contracts, employees, payroll) => {
  const contract = contracts.find((contract) => contract.id_contrato === payroll.id_contrato);
  const employee = employees.find((emp) => emp.id_empleado === contract.id_empleado);
  return employee ? employee : "Empleado no encontrado";
}

export const getPayrrolPayrrollById = (payrollNews, id_nomina) => {
  const payroll = payrollNews.find((payroll) => payroll.nominaIdNomina === id_nomina);
  return payroll ? payroll : "Nómina no encontrada";
}