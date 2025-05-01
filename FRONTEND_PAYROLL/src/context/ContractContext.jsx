import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ContractContext = createContext();

export const useContractContext = () => useContext(ContractContext);

export const ContractProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [loadingContracts, setLoadingContracts] = useState(true);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/contratos"); // Ajusta la URL
        setContracts(response.data);
      } catch (error) {
        console.error("Error al cargar contratos:", error);
      } finally {
        setLoadingContracts(false);
      }
    };

    fetchContracts();
  }, []);

  const addContract = (newContract) => {
    setContracts((prevContracts) => {
      const contractWithId = {
        ...newContract,
        id_contrato: prevContracts.length + 1,
        fecha_inicio: new Date()
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
    contracts,
    loadingContracts,
    setContracts,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};
