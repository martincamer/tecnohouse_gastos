import { createContext, useState, useEffect, useContext } from "react";
import { eliminarAccesorio, obtenerAccesorios } from "../api/accesorios.api";
import { toast } from "react-toastify";

export const AccesoriosContext = createContext();

export const useAccesoriosContext = () => {
  const context = useContext(AccesoriosContext);
  if (!context) {
    throw new Error("use accesorios propvider");
  }
  return context;
};

export const AccesoriosProvider = ({ children }) => {
  const [accesorios, setAccesorios] = useState([]);
  const [obtenerId, setObtenerId] = useState("");
  const [obtenerParams, setObtenerParams] = useState("");
  //modales
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEliminar, setIsOpenEliminar] = useState(false);

  function closeModalEliminar() {
    setIsOpenEliminar(false);
  }

  function openModalEliminar() {
    setIsOpenEliminar(true);
  }

  const obtenerParamsId = (id) => {
    setObtenerParams(id);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  //obtener datos

  useEffect(() => {
    const loadData = async () => {
      const res = await obtenerAccesorios();

      setAccesorios(res.data);
    };

    loadData();
  }, []);

  const handleEliminarAccesorio = (id) => {
    eliminarAccesorio(id);

    toast.error("Accesorio eliminado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      location.reload();
    }, 1500);
  };

  return (
    <AccesoriosContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        closeModalEliminar,
        openModalEliminar,
        isOpenEliminar,
        obtenerParamsId,
        obtenerParams,
        handleEliminarAccesorio,
        accesorios,
      }}
    >
      {children}
    </AccesoriosContext.Provider>
  );
};
