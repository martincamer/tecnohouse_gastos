import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/axios";

export const EmpleadosContext = createContext();

//use context
export const useEmpleadosContext = () => {
  const context = useContext(EmpleadosContext);
  if (!context) {
    throw new Error("use Auth propvider");
  }
  return context;
};

export const EmpleadosProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get("/empleados");

      setEmpleados(res.data);
    };

    loadData();
  }, []);

  return (
    <EmpleadosContext.Provider value={{ empleados, setEmpleados }}>
      {children}
    </EmpleadosContext.Provider>
  );
};
