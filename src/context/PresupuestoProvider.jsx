//imports
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { crearPresupuesto, obtenerPresupuestosApi } from "../api/presupuesto";

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
  const [cliente, setCliente] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [total, setTotal] = useState(0);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const HANDLEOBTENERID = (id) => {
    setObtenerId(id);
  };

  const generarIdAleatorio = () => {
    // Genera un número aleatorio entre 1 y 100000 y lo convierte a cadena
    const randomNumber = Math.floor(Math.random() * 100000) + 1;
    return randomNumber.toString();
  };

  const addToAbertura = (
    detalle,
    categoria,
    color,
    ancho,
    alto,
    cantidad,
    precioUnidad,
    precioFinal
  ) => {
    // Genera un nuevo ID aleatorio
    const newId = generarIdAleatorio();

    const newProducto = {
      id: newId,
      detalle,
      categoria,
      color,
      ancho,
      alto,
      cantidad,
      precioUnidad,
      precioFinal,
    };

    // Verifica si ya existe un producto con el mismo ID
    const productoExistente = productoSeleccionado.find(
      (item) => item.id === newId
    );

    // Si ya existe, podrías manejar el caso de alguna manera (por ejemplo, no agregar duplicados)
    if (productoExistente) {
      console.log("Ya existe un producto con el mismo ID");
    } else {
      // Si no existe, agrega el nuevo producto a la lista
      setProductoSeleccionado([...productoSeleccionado, newProducto]);

      toast.success("¡Creado correctamente!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const eliminarAberturaPorId = (id) => {
    // Filtra la lista de productos para excluir el producto con el ID proporcionado
    const nuevaLista = productoSeleccionado?.filter((item) => item.id !== id);

    // Actualiza el estado con la nueva lista sin el producto eliminado
    setProductoSeleccionado(nuevaLista);

    toast.error("¡Eliminado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const resultado = productoSeleccionado.map(function (e) {
    return {
      id: e.id,
      detalle: e.detalle,
      alto: e.alto,
      ancho: e.ancho,
      cantidad: e.cantidad,
      categoria: e.categoria,
      color: e.color,
      precioFinal: e.precioFinal,
      precioUnidad: e.precioUnidad,
    };
  });

  const crearNuevoPresupuestoSubmit = async () => {
    try {
      const res = await crearPresupuesto({
        cliente: cliente,
        localidad: localidad,
        totalCantidad: totalCantidad,
        total: total,
        datos: {
          resultado,
        },
      });

      toast.success("Creado correctamente!", {
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
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const [datosPresupuestos, setDatosPrepuestos] = useState([]);

  //obtener datos
  useEffect(() => {
    const obtenerDatos = async () => {
      const res = await obtenerPresupuestosApi();

      setDatosPrepuestos(res.data);
    };

    obtenerDatos();
  }, []);

  const [resultadosFiltrados, setResultadosFiltrados] = useState([]);
  const [yearToSearch, setYearToSearch] = useState(new Date().getFullYear());
  const [monthToSearch, setMonthToSearch] = useState(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleFilter = () => {
      const filteredResults = datosPresupuestos.filter((presupuesto) => {
        const fechaCreacion = new Date(presupuesto.created_at);
        const año = fechaCreacion.getFullYear();
        const mes = fechaCreacion.getMonth() + 1;

        // Filtrar por año y mes
        const filterByDate =
          año === parseInt(yearToSearch, 10) &&
          mes === parseInt(monthToSearch, 10);

        // Filtrar por término de búsqueda en cliente o valor total
        const filterBySearchTerm =
          presupuesto.cliente
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          presupuesto.total.toString().includes(searchTerm);

        return filterByDate && filterBySearchTerm;
      });

      setResultadosFiltrados(filteredResults);
    };

    handleFilter();
  }, [yearToSearch, monthToSearch, searchTerm, datosPresupuestos]);

  return (
    <PresupuestoContext.Provider
      value={{
        isOpen,
        closeModal,
        openModal,
        addToAbertura,
        productoSeleccionado,
        eliminarAberturaPorId,
        cliente,
        localidad,
        total,
        totalCantidad,
        setCliente,
        setLocalidad,
        setTotal,
        setTotalCantidad,
        crearNuevoPresupuestoSubmit,
        datosPresupuestos,
        resultadosFiltrados,
        yearToSearch,
        monthToSearch,
        setYearToSearch,
        setMonthToSearch,
        // handleFilter,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </PresupuestoContext.Provider>
  );
};
