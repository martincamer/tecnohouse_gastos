import { createContext, useState, useEffect, useContext } from "react";
import { eliminarPerfil, obtenerPerfiles } from "../api/perfiles.api";
import { toast } from "react-toastify";

export const PerfilesContext = createContext();

export const usePerfilesContex = () => {
  const context = useContext(PerfilesContext);
  if (!context) {
    throw new Error("use perfiles propvider");
  }
  return context;
};

export const PerfilesProvider = ({ children }) => {
  const [perfiles, setPerfiles] = useState([]);
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
      const res = await obtenerPerfiles();

      setPerfiles(res.data);
    };

    loadData();
  }, []);

  const handleEliminarPerfil = (id) => {
    eliminarPerfil(id);

    toast.error("¡Perfil eliminado correctamente!", {
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
    <PerfilesContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        perfiles,
        closeModalEliminar,
        openModalEliminar,
        isOpenEliminar,
        obtenerParamsId,
        obtenerParams,
        handleEliminarPerfil,
      }}
    >
      {children}
    </PerfilesContext.Provider>
  );
};
