import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const PayrollContext = createContext();

export const usePayrollContext = () => useContext(PayrollContext);

export const PayrollProvider = ({ children }) => {
  const [payrolls, setPayrolls] = useState([]);
  const [loadingPayrolls, setLoadingPayrolls] = useState(true);

  useEffect(() => {
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
  
    const deletePayroll = (id_nomina) => {
      setPayrolls((prevPayrolls) => 
        prevPayrolls.filter((payroll) => payroll.id_nomina !== id_nomina)
      );
    };

  const value = {
    payrolls,
    loadingPayrolls,
    setPayrolls,
  };

  return (
    <PayrollContext.Provider value={value}>
      {children}
    </PayrollContext.Provider>
  );
};
