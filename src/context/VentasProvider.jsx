//imports
import { createContext, useContext, useEffect, useState } from "react";
import {
  editarVenta,
  crearVentaNueva,
  obtenerVentas,
  obtenerUnicoVenta,
  obtenerVentaMensuales,
  eliminarVenta,
} from "../api/ventas";
import { toast } from "react-toastify";

// import axios from "../api/axios";
// import { toast } from "react-toastify";

//context
export const VentasContext = createContext();

//use context
export const useVentasContext = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error("use Auth propvider");
  }
  return context;
};

//provider
export const VentasProvider = ({ children }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEliminar, setIsOpenEliminar] = useState(false);

  const [ventas, setVentas] = useState([]);
  const [venta, setVenta] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [anioSeleccionado, setAnioSeleccionado] = useState("");
  const [obtenerId, setObtenerId] = useState("");
  const [obtenerParams, setObtenerParams] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalEliminar() {
    setIsOpenEliminar(false);
  }

  function openModalEliminar() {
    setIsOpenEliminar(true);
  }

  const obtenerParamsId = (id) => {
    setObtenerParams(id);
  };

  // State to hold filtered results

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await obtenerVentas();
        setVentas(response.data);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
      }
    };

    obtenerDatos();
  }, []);

  useEffect(() => {
    const resultadosFiltrados = ventas?.filter((dato) => {
      const fechaGasto = new Date(dato.created_at);
      const esAnioActual =
        fechaGasto.getFullYear() === new Date().getFullYear();
      const esMesActual = fechaGasto.getMonth() === new Date().getMonth();

      const esCategoriaValida =
        categoriaSeleccionada === "" ||
        fechaGasto.getMonth() + 1 === parseInt(categoriaSeleccionada);

      const esAnioValido =
        anioSeleccionado === "" ||
        fechaGasto.getFullYear() === parseInt(anioSeleccionado);

      const esResultadoValido =
        esCategoriaValida &&
        esAnioValido &&
        esMesActual &&
        (search === "" ||
          dato.detalle.toLowerCase().includes(search.toLowerCase()) ||
          dato.numero.toLowerCase().includes(search.toLowerCase()) ||
          dato.tipo.toLowerCase().includes(search.toLowerCase()));

      return esResultadoValido;
    });

    setResults(resultadosFiltrados || []);
  }, [categoriaSeleccionada, anioSeleccionado, search, ventas]);

  const handleCategoriaChange = (e) => {
    const nuevaCategoria = e.target.value;
    setCategoriaSeleccionada(nuevaCategoria);
  };

  const handleAnioChange = (e) => {
    const nuevoAnio = e.target.value;
    setAnioSeleccionado(nuevoAnio);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const handleEliminar = (id) => {
    eliminarVenta(id);

    toast.error("¡Venta eliminada correctamente!", {
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

  const handleSeleccionarId = (id) => {
    setObtenerId(id);
  };

  return (
    <VentasContext.Provider
      value={{
        closeModal,
        openModal,
        isOpen,
        ventas,
        results,
        handleCategoriaChange,
        categoriaSeleccionada,
        search,
        searcher,
        anioSeleccionado,
        handleAnioChange,
        handleEliminar,
        closeModalEliminar,
        openModalEliminar,
        isOpenEliminar,
        handleSeleccionarId,
        obtenerId,
        venta,
        obtenerParamsId,
        setVenta,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
};
