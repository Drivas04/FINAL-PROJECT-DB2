import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const SocialSecurityContext = createContext();

export const useSocialSecurityContext = () => useContext(SocialSecurityContext);

export const SocialSecurityProvider = ({ children }) => {
  const [apropiaciones, setApropiaciones] = useState([]);
  const [loadingApropiaciones, setLoadingApropiaciones] = useState(true);
  const [deducciones, setDeducciones] = useState([]);
  const [loadingDeducciones, setLoadingDeducciones] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar apropiaciones
  const fetchApropiaciones = async () => {
    try {
      setLoadingApropiaciones(true);
      setError(null);
      const response = await axios.get("http://localhost:8080/apropiaciones");
      setApropiaciones(response.data);
      return response.data;
    } catch (error) {
      console.error("Error al cargar apropiaciones:", error);
      setError("Error al cargar apropiaciones. Por favor, intente nuevamente.");
      // Ya no establecemos valores predeterminados aquí
      return [];
    } finally {
      setLoadingApropiaciones(false);
    }
  };

  // Función para cargar deducciones
  const fetchDeducciones = async () => {
    try {
      setLoadingDeducciones(true);
      setError(null);
      const response = await axios.get("http://localhost:8080/deducciones");
      setDeducciones(response.data);
      return response.data;
    } catch (error) {
      console.error("Error al cargar deducciones:", error);
      setError("Error al cargar deducciones. Por favor, intente nuevamente.");
      // Ya no establecemos valores predeterminados aquí
      return [];
    } finally {
      setLoadingDeducciones(false);
    }
  };

  // Cargar apropiaciones y deducciones al iniciar
  useEffect(() => {
    fetchApropiaciones();
    fetchDeducciones();
  }, []);

  // Función para añadir apropiación
  const addApropiacion = async (newApropiacion) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/apropiaciones",
        newApropiacion
      );
      
      // Actualizar la lista de apropiaciones después de añadir una nueva
      await fetchApropiaciones();
      
      return response;
    } catch (error) {
      console.error("Error al agregar apropiación:", error);
      throw error;
    }
  };

  // Función para añadir deducción
  const addDeduccion = async (newDeduccion) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/deducciones",
        newDeduccion
      );
      
      // Actualizar la lista de deducciones después de añadir una nueva
      await fetchDeducciones();
      
      return response;
    } catch (error) {
      console.error("Error al agregar deducción:", error);
      throw error;
    }
  };

  const value = {
    apropiaciones,
    loadingApropiaciones,
    setApropiaciones,
    addApropiacion,
    deducciones,
    loadingDeducciones,
    setDeducciones,
    addDeduccion,
    fetchApropiaciones,
    fetchDeducciones,
    error
  };

  return (
    <SocialSecurityContext.Provider value={value}>
      {children}
    </SocialSecurityContext.Provider>
  );
};