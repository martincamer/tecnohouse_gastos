import { createContext, useState, useEffect, useContext } from "react";
import { eliminarAccesorio, obtenerAccesorios } from "../api/accesorios.api";
import { toast } from "react-toastify";
import { obtenerCategorias } from "../api/categorias.api";

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
  const [obtenerParams, setObtenerParams] = useState("");
  const [obtenerId, setObtenerId] = useState("");
  //modales
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEliminar, setIsOpenEliminar] = useState(false);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerCategorias();

      setCategorias(res.data);
    }

    loadData();
  }, []);

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
    setAccesorios((prevSalidas) =>
      prevSalidas.filter((abertura) => abertura.id !== id)
    );

    toast.error("¡Accesorio eliminado correctamente, no la podrás recuperar!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        padding: "10px",
        borderRadius: "15px",
        boxShadow: "none",
        border: "1px solid rgb(203 213 225)",
      },
    });
    closeModalEliminar();
  };

  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Verifica si el término de búsqueda está vacío
    if (!searchTerm) {
      // Si está vacío, muestra todos los perfiles
      setResults(accesorios);
    } else {
      // Si hay un término de búsqueda, filtra los perfiles
      const resultadosFiltrados = accesorios?.filter((acc) => {
        return acc.detalle.toLowerCase().includes(searchTerm);
      });

      // Actualiza el state con los resultados filtrados
      setResults(resultadosFiltrados || []);
    }
  };

  // Asegúrate de que results tenga todos los perfiles si está vacío al principio
  useEffect(() => {
    if (!search && accesorios) {
      setResults(accesorios);
    }
  }, [search, accesorios]);

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
        setAccesorios,
        results,
        search,
        searcher,
        categorias,
        setCategorias,
      }}
    >
      {children}
    </AccesoriosContext.Provider>
  );
};
