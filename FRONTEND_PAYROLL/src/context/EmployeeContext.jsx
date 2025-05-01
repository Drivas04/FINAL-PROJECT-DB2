import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/empleados");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error al cargar empleados:", error);
      } finally {
        setLoadingEmployees(false);
      }
    };
    
    fetchEmployees();
  }, []);

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

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    loadingEmployees,
    setEmployees,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
