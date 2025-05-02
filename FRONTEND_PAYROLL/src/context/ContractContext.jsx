import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useEmployeeContext } from './EmployeeContext';

const ContractContext = createContext();

export const useContractContext = () => useContext(ContractContext);

export const ContractProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [loadingContracts, setLoadingContracts] = useState(true);
  const {fetchEmployees} = useEmployeeContext();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/contratos");
        setContracts(response.data);
      } catch (error) {
        console.error("Error al cargar contratos:", error);
      } finally {
        setLoadingContracts(false);
      }
    };

    fetchContracts();
  }, []);

  const addContract = async (contratoData, empleadoData) => {
    try {
      // Crear el DTO con la estructura que espera el backend
      const contratoEmpleadoDTO = {
        contrato: {
          salario: contratoData.salario,
          tipoContrato: contratoData.tipoContrato,
          nombreCargo: contratoData.nombreCargo,
          fechaInicio: contratoData.fechaInicio || new Date().toISOString().split("T")[0],
          fechaFin: contratoData.fecha_fin,
          estado: contratoData.estado === "Activo" ? "A" : "I"
        },
        empleado: {
          nombre: empleadoData.nombre.split(" ")[0] || "",
          apellido: empleadoData.nombre.split(" ")[1] || "",
          tipoDocumento: empleadoData.tipoDocumento,
          numeroDocumento: empleadoData.numeroDocumento,
          correo: empleadoData.correo,
          telefono: empleadoData.telefono,
          direccion: empleadoData.direccion,
          fechaNacimiento: empleadoData.fechaNacimiento,
          fechaContratacion: new Date().toISOString().split("T")[0],
          epsEmpleado: empleadoData.eps || "Compensar", // Valor por defecto
          departamentoIdDepartamento: empleadoData.departamentoIdDepartamento || 1,
          cuentabancariaNumeroCuenta: empleadoData.cuentabancariaNumeroCuenta || 0,
          bancoIdBanco: empleadoData.bancoIdbanco || 1 // Valor por defecto
        }
      };

      console.log("Enviando datos al servidor:", contratoEmpleadoDTO);

      const response = await axios.post(
        "http://localhost:8080/contratos", 
        contratoEmpleadoDTO
      );
      
      // Si la respuesta es exitosa, actualizamos el estado local
      // Asumimos que el backend nos devuelve el contrato creado
      if (response.status === 200 || response.status === 201) {
        // Recargar los contratos para obtener los datos actualizados
        const contractsResponse = await axios.get("http://localhost:8080/contratos");
        setContracts(contractsResponse.data);
      }

      await fetchEmployees(); 
      
      return response;
    } catch (error) {
      console.error("Error al agregar contrato:", error);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
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
    addContract,
    updateContract,
    setContracts,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};
