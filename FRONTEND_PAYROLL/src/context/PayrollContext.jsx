import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const PayrollContext = createContext();

export const usePayrollContext = () => useContext(PayrollContext);

export const PayrollProvider = ({ children }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [loadingPayrolls, setLoadingPayrolls] = useState(true);

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get("http://localhost:8080/nominas"); // Ajusta la URL
      setPayrolls(response.data);
    } catch (error) {
      console.error("Error al cargar contratos:", error);
    } finally {
      setLoadingPayrolls(false);
    }
  };
  useEffect(() => {

    fetchPayrolls();
  }, []);

  const addPayroll = (newPayroll) => {
      setPayrolls((prevPayrolls) => {
        const payrollWithId = {
          ...newPayroll,
          id_nomina: prevPayrolls.length + 1
        };
        return [...prevPayrolls, payrollWithId];
      });
    };
  
    const updatePayroll = (updatedPayroll) => {
      setPayrolls((prevPayrolls) => 
        prevPayrolls.map((payroll) => 
          payroll.id_nomina === updatedPayroll.id_nomina ? updatedPayroll : payroll
        )
      );
    };
  
    const deletePayroll = async (id_nomina) => {
      try {
        // Esperar a que se complete la eliminación antes de continuar
        await axios.delete(`http://localhost:8080/nominas/${id_nomina}`);
        console.log("Nómina eliminada con ID:", id_nomina);
        
        // Actualizar el estado después de confirmar la eliminación
        await fetchPayrolls();
      }
      catch (error) {
        console.error("Error al eliminar la nómina:", error);
      }
    };

  const value = {
    payrolls,
    loadingPayrolls,
    setPayrolls,
    deletePayroll
  };

  return (
    <PayrollContext.Provider value={value}>
      {children}
    </PayrollContext.Provider>
  );
};
