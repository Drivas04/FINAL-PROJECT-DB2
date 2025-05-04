import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
// Eliminar esta importación para evitar dependencias circulares
// import { useContractContext } from './ContractContext';

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

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
  
  useEffect(() => {
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

  const updateEmployee = async (employeeId, updatedData) => {
    try {
      console.log(`Actualizando empleado ${employeeId} con datos:`, updatedData);
      
      const response = await axios.put(
        `http://localhost:8080/empleados/${employeeId}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Actualiza el estado local con los datos devueltos por el servidor
      setEmployees(prevEmployees => 
        prevEmployees.map(emp => 
          emp.idEmpleado === employeeId ? { ...emp, ...updatedData } : emp
        )
      );
      
      console.log("Empleado actualizado con éxito:", response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/empleados/${employeeId}`);
      console.log("Empleado eliminado con éxito:", response.data);
      
      // Actualizar la lista de empleados
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.idEmpleado !== employeeId));
      
      // Emitir evento para notificar a otros contextos sobre la eliminación
      const employeeDeletedEvent = new CustomEvent('employeeDeleted', { 
        detail: employeeId 
      });
      window.dispatchEvent(employeeDeletedEvent);
      
      return true;
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      throw error;
    }
  };

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    loadingEmployees,
    setEmployees,
    fetchEmployees, // Agregar fetchEmployees al contexto
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
