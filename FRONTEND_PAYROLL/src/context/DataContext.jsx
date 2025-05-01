// DataContext.jsx
import React, { createContext, useContext } from 'react';
import { useEmployeeContext } from './EmployeeContext';
import { useContractContext } from './ContractContext';
import { usePayrollContext } from './PayrollContext';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {  // Cambiar a exportación nombrada
  const employeeContext = useEmployeeContext();
  const contractContext = useContractContext();
  const payrollContext = usePayrollContext();

  return (
    <DataContext.Provider value={{
      employeeContext,
      contractContext,
      payrollContext
    }}>
      {children}
    </DataContext.Provider>
  );
};
