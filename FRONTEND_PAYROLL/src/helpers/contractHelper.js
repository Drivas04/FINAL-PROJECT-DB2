import { contract } from "@/data/contract";

export const getEmployee = (id) => {
    const employee = contract.find((emp) => emp.id_empleado === id);
    return employee;
}