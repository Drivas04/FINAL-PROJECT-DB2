import { createContext, useContext } from "react";

const cesantiasContext = createContext();

export const useCeasntiasContext = () => useContext(cesantiasContext);

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
      const response = await axios.post(
        "http://localhost:8080/cesantias",
        newCesantia
      );
      setCesantias((prevCesantias) => [...prevCesantias, newCesantia]);
    } catch (error) {
      console.error("Error al agregar cesantía:", error);
    }
  };

  const value = {
    cesantias,
    loadingCesantias,
    setCesantias,
  };

  return (
    <cesantiasContext.Provider value={value}>
      {children}
    </cesantiasContext.Provider>
  );
};
