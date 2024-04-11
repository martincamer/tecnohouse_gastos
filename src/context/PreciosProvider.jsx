import { createContext, useState, useEffect, useContext } from "react";
import { obtenerPrecios } from "../api/precios.api";

export const PreciosContext = createContext();

export const usePreciosContext = () => {
  const context = useContext(PreciosContext);
  if (!context) {
    throw new Error("use precios propvider");
  }
  return context;
};

export const PreciosProvider = ({ children }) => {
  const [precios, setPrecios] = useState([]);

  //modales
  let [isOpenPrecios, setIsOpen] = useState(false);

  function openModalPrecios() {
    setIsOpen(true);
  }

  function closeModalPrecios() {
    setIsOpen(false);
  }

  useEffect(() => {
    const loadData = async () => {
      const res = await obtenerPrecios();
      setPrecios(res.data);
    };

    loadData();
  }, []);

  return (
    <PreciosContext.Provider
      value={{
        isOpenPrecios,
        openModalPrecios,
        closeModalPrecios,
        precios,
        setPrecios,
      }}
    >
      {children}
    </PreciosContext.Provider>
  );
};
