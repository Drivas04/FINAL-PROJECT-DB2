// DataContext.jsx
import React, { createContext, useContext } from 'react';
import { useEmployeeContext } from './EmployeeContext';
import { useContractContext } from './ContractContext';
import { usePayrollContext } from './PayrollContext';
import { useDepartmentContext } from './DepartmentsContext';
import { useSocialSecurityContext } from './SocialSecurityContext';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => { 
  const departmentContext = useDepartmentContext();
  const employeeContext = useEmployeeContext();
  const contractContext = useContractContext();
  const payrollContext = usePayrollContext();
  const socialSecurityContext = useSocialSecurityContext();

  // Crea un método para agregar contratos más fácilmente desde componentes
  const addContract = async (contratoData, empleadoData) => {
    return await contractContext.addContract(contratoData, empleadoData);
  };

  return (
    <DataContext.Provider value={{
      employeeContext,
      contractContext,
      payrollContext,
      socialSecurityContext,
      // Exponer métodos específicos para facilitar su uso
      addContract
    }}>
      {children}
    </DataContext.Provider>
  );
};
