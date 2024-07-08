//imports
import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/axios";

//context
export const GastosContext = createContext();

//use context
export const useGastosContext = () => {
  const context = useContext(GastosContext);
  if (!context) {
    throw new Error("use Auth propvider");
  }
  return context;
};

//provider
export const GastosProvider = ({ children }) => {
  const [gastos, setGastos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [produccion, setProduccion] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get("/proveedores");

      setProveedores(res.data);
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get("/produccion");

      setProduccion(res.data);
    };

    loadData();
  }, []);

  return (
    <GastosContext.Provider
      value={{
        gastos,
        setGastos,
        proveedores,
        setProveedores,
        produccion,
        setProduccion,
      }}
    >
      {children}
    </GastosContext.Provider>
  );
};
