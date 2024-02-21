import { createContext, useState, useEffect, useContext } from "react";
import { obtenerUnicoPerfil } from "../api/perfiles.api";
import { obtenerUnicoAccesorio } from "../api/accesorios.api";
import {
  crearAbertura,
  eliminarAbertura,
  obtenerAberturasApi,
} from "../api/aberturas.api";
import { toast } from "react-toastify";

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

  const result = [vidrioSelect, accesoriosSelect, perfilesSelect];

  const handleSubmitAbertura = async () => {
    // try {
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
    // } catch (error) {
    //   console.error("Error creating invoice:", error);
    // }
  };

  //PERFILES ADDTO
  const deleteProducto = (
    id,
    codigo,
    detalle,
    color,
    barras,
    totalKG,
    categoria,
    totalPrecioUnitario
  ) => {
    const itemIndex = productoSeleccionado?.findIndex(
      (item) =>
        item.id === id &&
        item.codigo === codigo &&
        item.color === color &&
        item.detalle === detalle &&
        item.barras === barras &&
        item.categoria === categoria &&
        item.totalKG === totalKG &&
        item.totalPrecioUnitario === totalPrecioUnitario
    );

    if (itemIndex) {
      const newItem = [...productoSeleccionado];
      newItem.splice(itemIndex);
      setProductoSeleccionado(newItem);
    }
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

    // const productoSeleccionadoItem =
    // if (productoSeleccionadoItem) {
    //   setTimeout(() => {
    //     // setErrorProducto(false);
    //   }, 2000);
    //   // setErrorProducto(true);
    // } else {

    //   // setErrorProducto(false);
    // }

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

    // const productoSeleccionadoItem =
    // if (productoSeleccionadoItem) {
    //   setTimeout(() => {
    //     // setErrorProducto(false);
    //   }, 2000);
    //   // setErrorProducto(true);
    // } else {

    //   // setErrorProducto(false);
    // }

    setAccesorioSeleccionado([...accesorioSeleccionado, newProducto]);
  };

  const deleteAccesorio = (id, detalle, categoria, cantidad) => {
    const itemIndex = accesorioSeleccionado?.findIndex(
      (item) =>
        item.id === id &&
        item.detalle === detalle &&
        item.categoria === categoria &&
        item.cantidad === cantidad
    );

    if (itemIndex) {
      const newItem = [...accesorioSeleccionado];
      newItem.splice(itemIndex);
      setAccesorioSeleccionado(newItem);
    }
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
      console.log("Ya existe un producto con el mismo ID");
    } else {
      // Si no existe, agrega el nuevo producto a la lista
      setVidrioSeleccionado([...vidrioSeleccionado, newProducto]);
    }
  };

  const deleteVidrio = (
    id,
    ancho,
    alto,
    cantidad,
    metrosCuadrados,
    categoria
  ) => {
    const itemIndex = vidrioSeleccionado?.findIndex(
      (item) =>
        item.id === id &&
        item.ancho === ancho &&
        item.alto === alto &&
        item.metrosCuadrados === metrosCuadrados &&
        item.categoria === categoria
    );

    if (itemIndex) {
      const newItem = [...vidrioSeleccionado];
      newItem.splice(itemIndex);
      setVidrioSeleccionado(newItem);
    }
  };

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
    await eliminarAbertura(id);

    setTimeout(() => {
      location.reload();
    }, 1500);

    toast.error("Eliminado correctamente!", {
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

  //SEARCH
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  useEffect(() => {
    const resultadosFiltrados = obtenerAberturas?.filter((dato) => {
      const esResultadoValido =
        (categoriaSeleccionada === "" ||
          dato.categoria === categoriaSeleccionada) &&
        (tipoSeleccionado === "" || dato.tipo === tipoSeleccionado) &&
        (search === "" ||
          dato.detalle.toLowerCase().includes(search.toLowerCase()));

      return esResultadoValido;
    });

    setResults(resultadosFiltrados || []);
  }, [categoriaSeleccionada, tipoSeleccionado, search, obtenerAberturas]);

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

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Añade un efecto adicional para limpiar la selección de categoría si es vacía
  useEffect(() => {
    if (categoriaSeleccionada === "") {
      setResults(obtenerAberturas || []);
    }
  }, [categoriaSeleccionada, obtenerAberturas, setResults]);

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
      }}
    >
      {children}
    </AberturasContext.Provider>
  );
};
