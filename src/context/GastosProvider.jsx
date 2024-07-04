//imports
import { createContext, useContext, useEffect, useState } from "react";
import { eliminarGasto, obtenerGastosMensuales } from "../api/gastos";

// import axios from "../api/axios";
// import { toast } from "react-toastify";

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

  return (
    <GastosContext.Provider
      value={{
        gastos,
        setGastos,
      }}
    >
      {children}
    </GastosContext.Provider>
  );
};
