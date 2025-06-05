

export const getContractById = (id, contracts) => {
    const contractData = contracts.find((cont) => cont.idContrato === id);
    return contractData;
}

export const getCesantias = () => {
    
}