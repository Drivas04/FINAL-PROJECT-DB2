import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const cesantiasContext = createContext();

export const useCesantiasContext = () => useContext(cesantiasContext);

export const CesantiasProvider = ({ children }) => {
  const [cesantias, setCesantias] = useState([]);
  const [loadingCesantias, setLoadingCesantias] = useState(true);

  useEffect(() => {
    const fetchCesantias = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cesantias");
        setCesantias(response.data);
      } catch (error) {
        console.error("Error al cargar cesantías:", error);
      } finally {
        setLoadingCesantias(false);
      }
    };

    fetchCesantias();
  }, []);

  const addCesantia = async (newCesantia) => {
    try {
      // Hacer la petición POST para agregar la cesantía
      const response = await axios.post(
        "http://localhost:8080/cesantias",
        newCesantia
      );
      
      // Importante: Refrescar la lista de cesantías desde el servidor
      try {
        const updatedResponse = await axios.get("http://localhost:8080/cesantias");
        // Reemplazar todo el array con los datos actualizados
        setCesantias(updatedResponse.data);
      } catch (refreshError) {
        console.error("Error al actualizar la lista de cesantías:", refreshError);
      }
      
      return response;
    } catch (error) {
      console.error("Error al agregar cesantía:", error);
      throw error;
    }
  };

  const value = {
    cesantias,
    loadingCesantias,
    setCesantias,
    addCesantia
  };

  return (
    <cesantiasContext.Provider value={value}>
      {children}
    </cesantiasContext.Provider>
  );
};
