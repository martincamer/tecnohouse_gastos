//imports
import { createContext, useContext, useEffect, useState } from "react";

export const PresupuestoContext = createContext();

//use context
export const usePresupuestoContext = () => {
  const context = useContext(PresupuestoContext);
  if (!context) {
    throw new Error("use presupuesto propvider");
  }
  return context;
};

//provider
export const PresupuestoProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [obtenerId, setObtenerId] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const HANDLEOBTENERID = (id) => {
    setObtenerId(id);
  };

  return (
    <PresupuestoContext.Provider value={{ isOpen, closeModal, openModal }}>
      {children}
    </PresupuestoContext.Provider>
  );
};
