import { contract } from "@/data/contract";

export const getEmployee = (id) => {
    const employee = contract.find((emp) => emp.id_empleado === id);
    return employee;
}

export const getContractById = (id, contracts) => {
    const contractData = contracts.find((cont) => cont.idContrato === id);
    return contractData;
}

export const getCesantias = () => {
    
}