import React, { createContext, useState, useContext } from 'react';
import { employees as initialEmployees } from '@/data/employees';
import { contract as initialContracts } from '@/data/contract';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [employees, setEmployees] = useState(initialEmployees);
  
  const [contracts, setContracts] = useState(initialContracts);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => {
      const employeeWithId = {
        ...newEmployee,
        id_empleado: prevEmployees.length + 1,
        documento: newEmployee.numero_documento
      };
      return [...prevEmployees, employeeWithId];
    });
    return employees.length + 1; 
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) => 
      prevEmployees.map((emp) => 
        emp.id_empleado === updatedEmployee.id_empleado ? updatedEmployee : emp
      )
    );
  };

  const addContract = (newContract) => {
    setContracts((prevContracts) => {
      const contractWithId = {
        ...newContract,
        id_contrato: prevContracts.length + 1
      };
      return [...prevContracts, contractWithId];
    });
  };

  const updateContract = (updatedContract) => {
    setContracts((prevContracts) => 
      prevContracts.map((contract) => 
        contract.id_contrato === updatedContract.id_contrato ? updatedContract : contract
      )
    );
  };

  const value = {
    employees,
    contracts,
    addEmployee,
    updateEmployee,
    addContract,
    updateContract
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};