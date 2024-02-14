import { createContext, useState, useEffect, useContext } from "react";
import { obtenerPerfiles, obtenerUnicoPerfil } from "../api/perfiles.api";

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
  const [productoUnicoState, setProductoUnico] = useState([]);
  //modales
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenProductos, setIsOpenProductos] = useState(false);
  let [isOpenReset, setIsOpenReset] = useState(false);
  const [obtenerProductoId, setObtenerProductoId] = useState("");

  function closeModalProductos() {
    setIsOpenProductos(false);
  }

  function openModalProductos() {
    setIsOpenProductos(true);
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

  const respuesta = productoSeleccionado.map(function (e) {
    return {
      id: e.id,
      nombre: e.nombre,
      detalle: e.detalle,
      categoria: e.categoria,
      barras: e.barras,
      totalKG: e.totalKG,
      color: e.color,
      totalPrecioUnitario: e.totalPrecioUnitario,
    };
  });

  // console.log(totalPagar() + clienteSeleccionado[0]?.total_facturado);

  const handleSubmitAbertura = async () => {
    // try {
    //   // Crear factura nueva
    //   const res = await crear({
    //     clientes: {
    //       id: clienteSeleccionado[0]?.id,
    //       nombre: clienteSeleccionado[0]?.nombre,
    //       apellido: clienteSeleccionado[0]?.apellido,
    //       localidad: clienteSeleccionado[0]?.localidad,
    //       provincia: clienteSeleccionado[0]?.provincia,
    //       email: clienteSeleccionado[0]?.email,
    //       telefono: clienteSeleccionado[0]?.telefono,
    //       dni: clienteSeleccionado[0]?.dni,
    //     },
    //     productos: { respuesta },
    //     estadistica: {
    //       total_kg: totalKg(),
    //       total_barras: totalBarras(),
    //       total_pagar: totalPagar(),
    //     },
    //     estado: "pendiente",
    //     tipo_factura: tipoFactura,
    //   });
    //   // Actualizar información del cliente de facturación
    //   await actualizarClienteFacturacion(clienteSeleccionado[0]?.id, {
    //     total_facturado: totalPagar(),
    //     entrega: 0,
    //     deuda_restante: totalPagar(),
    //   });
    //   toast.success("Factura Venta creada correctamente!", {
    //     position: "top-right",
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   setTimeout(() => {
    //     location.reload();
    //   }, 1500);
    // } catch (error) {
    //   console.error("Error creating invoice:", error);
    //   // Handle error, show a toast, etc.
    // }

    const addToPerfiles = (
      id,
      codigo,
      detalle,
      color,
      cantidad,
      totalKG,
      categoria
    ) => {
      const newProducto = {
        id,
        codigo,
        detalle,
        color,
        categoria,
        cantidad,
        totalKG,
      };

      const productoSeleccionadoItem = productoSeleccionado.find((item) => {
        return item.id === id;
      });

      if (productoSeleccionadoItem) {
        setTimeout(() => {
          setErrorProducto(false);
        }, 2000);
        setErrorProducto(true);
      } else {
        setProductoSeleccionado([...productoSeleccionado, newProducto]);
        setErrorProducto(false);
      }
    };

    const deleteProducto = (
      id,
      nombre,
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
          item.nombre === nombre &&
          item.detalle === detalle &&
          item.color === color &&
          item.barras === barras &&
          item.totalKG === totalKG &&
          item.categoria === categoria &&
          item.totalPrecioUnitario === totalPrecioUnitario
      );

      if (itemIndex) {
        const newItem = [...productoSeleccionado];
        newItem.splice(itemIndex);
        setProductoSeleccionado(newItem);
      }
    };
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
      }}
    >
      {children}
    </AberturasContext.Provider>
  );
};
