import { createContext, useState, useEffect, useContext } from "react";
import { obtenerUnicoPerfil } from "../api/perfiles.api";
import { obtenerUnicoAccesorio } from "../api/accesorios.api";
import {
  crearAbertura,
  eliminarAbertura,
  obtenerAberturasApi,
} from "../api/aberturas.api";
import { toast } from "react-toastify";
import client from "../api/axios";

export const AberturasContext = createContext();

export const useAberturasContext = () => {
  const context = useContext(AberturasContext);
  if (!context) {
    throw new Error("use Auth propvider");
  }
  return context;
};

export const AberturasProvider = ({ children }) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [accesorioSeleccionado, setAccesorioSeleccionado] = useState([]);
  const [productoUnicoState, setProductoUnico] = useState([]);
  const [accesorioUnicoState, setAccesorioUnicoState] = useState([]);
  const [vidrioSeleccionado, setVidrioSeleccionado] = useState([]);
  const [obtenerAberturas, setObtenerAberturas] = useState([]);

  //modales
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenProductos, setIsOpenProductos] = useState(false);
  let [isOpenAccesorios, setIsOpenAccesorios] = useState(false);
  let [isOpenVidrios, setIsOpenVidrios] = useState(false);
  let [isOpenReset, setIsOpenReset] = useState(false);
  const [obtenerProductoId, setObtenerProductoId] = useState("");

  //handleSubmitStates
  const [detalle, setDetalle] = useState("");
  const [color, setColor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "detalle":
        setDetalle(value);
        break;
      case "color":
        setColor(value);
        break;
      case "categoria":
        setCategoria(value);
        break;
      case "tipo":
        setTipo(value);
        break;
      case "ancho":
        setAncho(value);
        break;
      case "alto":
        setAlto(value);
        break;
      default:
        break;
    }
  };

  function closeModalVidrios() {
    setIsOpenVidrios(false);
  }

  function openModalVidrios() {
    setIsOpenVidrios(true);
  }

  function closeModalProductos() {
    setIsOpenProductos(false);
  }

  function openModalProductos() {
    setIsOpenProductos(true);
  }
  function closeModalAccesorios() {
    setIsOpenAccesorios(false);
  }

  function openModalAccesorios() {
    setIsOpenAccesorios(true);
  }

  function closeModalReset() {
    setIsOpenReset(false);
  }

  function openModalReset() {
    setIsOpenReset(true);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const perfilesSelect = productoSeleccionado.map(function (e) {
    return {
      id: e.id,
      cantidad: e.cantidad,
      categoria: e.categoria,
      codigo: e.codigo,
      color: e.color,
      detalle: e.detalle,
      totalKG: e.totalKG,
      largo: e.largo,
    };
  });

  const accesoriosSelect = accesorioSeleccionado.map(function (e) {
    return {
      id: e.id,
      detalle: e.detalle,
      categoria: e.categoria,
      cantidad: e.cantidad,
    };
  });

  const vidrioSelect = vidrioSeleccionado.map(function (e) {
    return {
      id: e.id,
      alto: e.alto,
      ancho: e.ancho,
      cantidad: e.cantidad,
      categoria: e.categoria,
      metrosCuadrados: e.metrosCuadrados,
    };
  });

  const handleSubmitEditarAbertura = async (id, closeModal) => {
    try {
      // Editar la abertura existente
      const res = await client.put(`/aberturas/${id}`, {
        detalle: detalle,
        color: color,
        categoria: categoria,
        ancho: ancho,
        alto: alto,
        tipo: tipo,
        datos: {
          perfilesSelect,
          accesoriosSelect,
          vidrioSelect,
        },
      });

      console.log(res);

      toast.success("¡Abertura editada correctamente, crea la siguiente!", {
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

      setAccesorioSeleccionado([]);
      setProductoSeleccionado([]);
      setVidrioSeleccionado([]);

      setDetalle("");
      setColor("");
      setCategoria("");
      setTipo("");
      setAncho("");
      setAlto("");

      closeModal();

      setTimeout(() => {
        location.reload();
      }, 4000);
    } catch (error) {
      console.error(error);
      toast.error("Error al crear/editar la abertura.");
    }
  };

  const handleSubmitAbertura = async () => {
    // Crear factura nueva
    const res = await crearAbertura({
      detalle: detalle,
      color: color,
      categoria: categoria,
      ancho: ancho,
      alto: alto,
      tipo: tipo,
      datos: {
        perfilesSelect,
        accesoriosSelect,
        vidrioSelect,
      },
    });

    const tipoExistente = obtenerAberturas.find(
      (tipo) => tipo.id === res.data.id
    );

    if (!tipoExistente) {
      // Actualizar el estado de tipos agregando el nuevo tipo al final
      setObtenerAberturas((prevTipos) => [...prevTipos, res.data]);
    }

    toast.success("¡Abertura creada correctamente, crea la siguiente!", {
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

    setAccesorioSeleccionado([]);
    setProductoSeleccionado([]);
    setVidrioSeleccionado([]);

    setDetalle("");
    setColor("");
    setCategoria("");
    setTipo("");
    setAncho("");
    setAlto("");

    closeModal();
  };

  const deleteProducto = (id) => {
    const updateProducto = productoSeleccionado.filter(
      (item) => item.id !== id
    );
    setProductoSeleccionado(updateProducto);
  };

  const deleteToResetProductos = () => {
    const newDato = [];
    setProductoSeleccionado(newDato);
  };

  const handleSeleccionarProducto = (id) => {
    setObtenerProductoId(id);
  };

  useEffect(() => {
    async function productoUnico() {
      const res = await obtenerUnicoPerfil(obtenerProductoId);
      setProductoUnico(res.data);
    }
    productoUnico();
  }, [obtenerProductoId]);

  const addToPerfiles = (
    id,
    codigo,
    color,
    detalle,
    categoria,
    cantidad,
    totalKG,
    largo
  ) => {
    const newProducto = {
      id,
      codigo,
      color,
      detalle,
      categoria,
      cantidad,
      totalKG,
      largo,
    };

    productoSeleccionado.find((item) => {
      return item.id === id;
    });

    setProductoSeleccionado([...productoSeleccionado, newProducto]);
  };

  const deleteToResetAccesorios = () => {
    const newDato = [];
    setAccesorioSeleccionado(newDato);
  };

  const handleSeleccionarAccesorio = (id) => {
    setObtenerProductoId(id);
  };

  //ACCESORIOS ADD TO
  const addToAccesorio = (id, detalle, categoria, cantidad) => {
    const newProducto = {
      id,
      detalle,
      categoria,
      cantidad,
    };

    accesorioSeleccionado.find((item) => {
      return item.id === id;
    });

    setAccesorioSeleccionado([...accesorioSeleccionado, newProducto]);
  };

  const deleteAccesorio = (id) => {
    const updatedAccesorios = accesorioSeleccionado.filter(
      (item) => item.id !== id
    );
    setAccesorioSeleccionado(updatedAccesorios);
  };

  const generarIdAleatorio = () => {
    // Genera un número aleatorio entre 1 y 100000 y lo convierte a cadena
    const randomNumber = Math.floor(Math.random() * 100000) + 1;
    return randomNumber.toString();
  };

  const addToVidrio = (ancho, alto, cantidad, metrosCuadrados, categoria) => {
    // Genera un nuevo ID aleatorio
    const newId = generarIdAleatorio();

    const newProducto = {
      id: newId,
      ancho,
      alto,
      cantidad,
      metrosCuadrados,
      categoria,
    };

    // Verifica si ya existe un producto con el mismo ID
    const productoExistente = vidrioSeleccionado.find(
      (item) => item.id === newId
    );

    // Si ya existe, podrías manejar el caso de alguna manera (por ejemplo, no agregar duplicados)
    if (productoExistente) {
    } else {
      // Si no existe, agrega el nuevo producto a la lista
      setVidrioSeleccionado([...vidrioSeleccionado, newProducto]);
    }
  };

  const deleteVidrio = (id) => {
    const updateVidrio = vidrioSeleccionado.filter((item) => item.id !== id);
    setVidrioSeleccionado(updateVidrio);
  };

  console.log(vidrioSeleccionado);

  useEffect(() => {
    async function productoUnico() {
      const res = await obtenerUnicoPerfil(obtenerProductoId);
      setProductoUnico(res.data);
    }
    productoUnico();
  }, [obtenerProductoId]);

  useEffect(() => {
    async function accesorioUnico() {
      const res = await obtenerUnicoAccesorio(obtenerProductoId);
      setAccesorioUnicoState(res.data);
    }
    accesorioUnico();
  }, [obtenerProductoId]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerAberturasApi();
      setObtenerAberturas(res.data);
    }
    loadData();
  }, []);

  const handleEliminarAbertura = async (id) => {
    // Mostrar la confirmación antes de eliminar
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta abertura?"
    );

    // Si el usuario confirma la eliminación, proceder con la eliminación
    if (confirmacion) {
      await eliminarAbertura(id);

      setObtenerAberturas((prevSalidas) =>
        prevSalidas.filter((abertura) => abertura.id !== id)
      );

      toast.error(
        "¡Abertura eliminada correctamente, no la podrás recuperar!",
        {
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
        }
      );
    }
  };

  // SEARCH
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");

  useEffect(() => {
    const resultadosFiltrados = obtenerAberturas?.filter((dato) => {
      const esResultadoValido =
        (categoriaSeleccionada === "" ||
          dato.categoria === categoriaSeleccionada) &&
        (tipoSeleccionado === "" || dato.tipo === tipoSeleccionado) &&
        (colorSeleccionado === "" || dato.color === colorSeleccionado) &&
        (search === "" ||
          dato.detalle.toLowerCase().includes(search.toLowerCase()));

      return esResultadoValido;
    });

    setResults(resultadosFiltrados || []);
  }, [
    categoriaSeleccionada,
    tipoSeleccionado,
    colorSeleccionado,
    search,
    obtenerAberturas,
  ]);

  const handleCategoriaChange = (e) => {
    const nuevaCategoria = e.target.value;
    setCategoriaSeleccionada(
      nuevaCategoria === "TODAS LAS CATEGORIAS" ? "" : nuevaCategoria
    );
  };

  const handleTipoChange = (e) => {
    const nuevoTipo = e.target.value;
    setTipoSeleccionado(nuevoTipo === "TODOS LOS TIPOS" ? "" : nuevoTipo);
  };

  const handleColorChange = (e) => {
    const nuevoColor = e.target.value;
    setColorSeleccionado(nuevoColor === "TODOS LOS COLORES" ? "" : nuevoColor);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Añade un efecto adicional para limpiar la selección de categoría si es vacía
  useEffect(() => {
    if (categoriaSeleccionada === "") {
      setResults(obtenerAberturas || []);
    }
  }, [categoriaSeleccionada, obtenerAberturas, setResults]);

  console.log(results);

  return (
    <AberturasContext.Provider
      value={{
        handleSeleccionarProducto,
        obtenerProductoId,
        isOpen,
        openModal,
        closeModal,
        isOpenProductos,
        closeModalProductos,
        openModalProductos,
        productoUnicoState,
        addToPerfiles,
        deleteProducto,
        deleteToResetProductos,
        productoSeleccionado,
        closeModalAccesorios,
        openModalAccesorios,
        isOpenAccesorios,
        accesorioUnicoState,
        addToAccesorio,
        accesorioSeleccionado,
        closeModalVidrios,
        openModalVidrios,
        isOpenVidrios,
        vidrioSeleccionado,
        addToVidrio,
        handleSubmitAbertura,
        handleChange,
        detalle,
        color,
        categoria,
        tipo,
        ancho,
        alto,
        obtenerAberturas,
        handleEliminarAbertura,
        handleCategoriaChange,
        searcher,
        search,
        results,
        categoriaSeleccionada,
        handleTipoChange,
        tipoSeleccionado,
        deleteAccesorio,
        deleteVidrio,
        colorSeleccionado,
        handleColorChange,
        setVidrioSeleccionado,
        setProductoSeleccionado,
        setAccesorioSeleccionado,
        handleSubmitEditarAbertura,
        setColor,
        setTipo,
        setAncho,
        setAlto,
        setCategoria,
        setDetalle,
      }}
    >
      {children}
    </AberturasContext.Provider>
  );
};
