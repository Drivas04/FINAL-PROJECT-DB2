import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DepartmentContext = createContext();

export const useDepartmentContext = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/departamentos/");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  const values = {
    departments,
    loadingDepartments,
    setDepartments,
  };
  return (
    <DepartmentContext.Provider value={values}>
      {children}
    </DepartmentContext.Provider>
  );
}