import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { usePreciosContext } from "../../context/PreciosProvider";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { obtenerUnicaAbertura } from "../../api/aberturas.api";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const ModalSeleccionarAberturaFinal = ({
  seleccionarAberturaFinal,
  closeModalSeleccionarAberturaFinal,
  obtenerId,
  closeModalSeleccionar,
}) => {
  const [abertura, setAbertura] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const { accesorios } = useAccesoriosContext();
  const { precios } = usePreciosContext();
  const [applyAdditionalCost, setApplyAdditionalCost] = useState(true);

  const { addToAbertura, productoSeleccionado } = usePresupuestoContext();

  useEffect(() => {
    const obtenerData = async () => {
      const res = await obtenerUnicaAbertura(obtenerId);

      setAbertura(res.data);
    };

    obtenerData();
  }, [obtenerId]);

  // Accesorios seleccionados precio final
  const calculateTotalPrice = (accesoriosSelect, accesorios) => {
    return accesoriosSelect?.map((item) => {
      const accesorioItem = accesorios?.find(
        (acc) => acc.detalle === item.detalle
      );

      if (accesorioItem) {
        const precio_unidad = parseFloat(accesorioItem.precio_unidad);
        const cantidad = parseInt(item.cantidad, 10);
        const totalPrecio = precio_unidad * cantidad;

        return {
          ...item,
          totalPrecio,
        };
      }

      return item;
    });
  };

  const results = calculateTotalPrice(
    abertura?.datos?.accesoriosSelect,
    accesorios
  );

  // Accesorios seleccionados precio final
  const calculateTotalUnidad = (accesoriosSelect, accesorios) => {
    return accesoriosSelect?.map((item) => {
      const accesorioItem = accesorios?.find(
        (acc) => acc.detalle === item.detalle
      );

      if (accesorioItem) {
        const precio_unidad = parseFloat(accesorioItem.precio_unidad);

        return {
          ...item,
          totalPrecio: precio_unidad, // Assigning unit price directly
        };
      }

      return item;
    });
  };

  const resultsUnidad = calculateTotalUnidad(
    abertura?.datos?.accesoriosSelect,
    accesorios
  );

  // Función para buscar el precio por categoría (insensible a mayúsculas y minúsculas)
  const buscarPrecioPorCategoria = (categoria) => {
    const categoriaLowerCase = categoria.toLowerCase();
    return precios.find(
      (precio) => precio.categoria.toLowerCase() === categoriaLowerCase
    );
  };

  // Función para calcular el precio final para cada perfil
  const calcularPrecioFinal = (perfil) => {
    const precioEncontrado = buscarPrecioPorCategoria(perfil.categoria);

    if (precioEncontrado) {
      const precioNumber = Number(precioEncontrado.precio);
      // const cantidad = Number(perfil.cantidad);
      const totalKG = Number(perfil.totalKG);

      // Calcula el precio final multiplicando cantidad, totalKG y precio
      const precioFinal = totalKG * precioNumber;

      return {
        ...perfil,
        precioFinal,
      };
    }

    return perfil;
  };

  // Aplica la función calcularPrecioFinal a cada perfil en perfilesSelect
  const perfilesConPrecioFinal = abertura?.datos?.perfilesSelect?.map(
    (perfil) => calcularPrecioFinal(perfil)
  );

  // Calcula el precio total sumando los precios finales de todos los perfiles
  const precioTotal = perfilesConPrecioFinal?.reduce(
    (total, perfil) => total + (perfil?.precioFinal || 0),
    0
  );

  // Función para calcular el precio final para cada vidrio
  const calcularPrecioFinalVidrio = (vidrio) => {
    const precioEncontrado = buscarPrecioPorCategoria(vidrio.categoria);

    if (precioEncontrado) {
      const precioNumber = Number(precioEncontrado.precio);
      const totalMetros = Number(vidrio.metrosCuadrados);
      // const ancho = Number(vidrio.ancho);
      // const alto = Number(vidrio.alto);

      // Calcula el precio final multiplicando cantidad, ancho, alto y precio
      const precioFinal = totalMetros * precioNumber;

      return {
        ...vidrio,
        precioFinal,
      };
    }

    return vidrio;
  };

  // Aplica la función calcularPrecioFinalVidrio a cada vidrio en vidriosSelect
  const vidriosConPrecioFinal = abertura?.datos?.vidrioSelect?.map((vidrio) =>
    calcularPrecioFinalVidrio(vidrio)
  );

  // Calcula el precio total sumando los precios finales de todos los vidrios
  const precioTotalVidrios = vidriosConPrecioFinal?.reduce(
    (total, vidrio) => total + (vidrio?.precioFinal || 0),
    0
  );

  // Calcula el precio total de los perfiles
  const precioTotalPerfiles = perfilesConPrecioFinal?.reduce(
    (total, perfil) => total + (perfil?.precioFinal || 0),
    0
  );

  // Calcula el precio total de los accesorios
  const precioTotalAccesorios = results?.reduce(
    (total, accesorio) => total + (accesorio?.totalPrecio || 0),
    0
  );

  // Calcula el precio total de la abertura sumando los totales de perfiles, accesorios y vidrios
  const precioTotalAbertura =
    precioTotalPerfiles + precioTotalAccesorios + precioTotalVidrios;

  console.log("Precio total de la abertura:", precioTotalAbertura);

  // Filtra los precios adicionales relevantes (luz, agua, empleados)
  const preciosAdicionalesFiltrados = precios.filter((precioAdicional) =>
    [
      "luz",
      "agua",
      "produccion",
      "wifi",
      "alquiler",
      "gasto adicional",
    ].includes(precioAdicional.categoria)
  );

  // Suma los precios adicionales filtrados
  const precioTotalAdicionales = preciosAdicionalesFiltrados.reduce(
    (total, precioAdicional) => total + parseFloat(precioAdicional.precio),
    0
  );

  // Suma el precio total de la abertura con los precios adicionales

  // Suma el precio total de la abertura con los precios adicionales
  const precioFinalAberturaSin = precioTotalAbertura + precioTotalAdicionales;

  const calculateFinalPrice = () => {
    const additionalCostMultiplier = applyAdditionalCost ? 1.4 : 1.0;
    return (
      (precioTotalAbertura + precioTotalAdicionales) * additionalCostMultiplier
    );
  };

  const precioFinalAbertura = calculateFinalPrice();

  const finalPrice = calculateFinalPrice() * cantidad;

  const toggleAdditionalCost = () => {
    setApplyAdditionalCost(!applyAdditionalCost);
  };

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={seleccionarAberturaFinal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalSeleccionarAberturaFinal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="max-md:h-[60vh] max-md:overflow-y-scroll max-md:w-full inline-block w-1/2 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className=" mx-auto p-8 bg-white shadow border-[1px] bor-slate-300 rounded-xl w-full">
                  <h2 className="text-2xl font-bold mb-4 max-md:text-base max-md:uppercase max-md:underline">
                    Detalles de la Abertura
                  </h2>

                  <div className="mb-4 max-md:flex-col max-md:flex max-md:gap-1">
                    <h3 className="flex max-md:flex-col max-md:gap-1 gap-2 text-base text-indigo-500 font-normal mb-2">
                      DETALLE -
                      <span className="text-slate-700 uppercase max-md:text-sm">
                        {abertura?.detalle}
                      </span>
                    </h3>
                    <h3 className="flex max-md:flex-col max-md:gap-1 gap-2 text-base text-indigo-500 font-normal mb-2">
                      CATEGORIA -
                      <span className="text-slate-700 uppercase max-md:text-sm">
                        {abertura?.categoria}
                      </span>
                    </h3>
                    <h3 className="flex gap-2 max-md:flex-col max-md:gap-1 text-base text-indigo-500 font-normal mb-2">
                      COLOR -
                      <span className="text-slate-700 uppercase max-md:text-sm">
                        {abertura?.color}
                      </span>
                    </h3>
                  </div>

                  {/* Repite la estructura anterior para vidrios y accesorios */}

                  <div className="mt-4 w-2/3">
                    <h3 className="text-2xl font-bold mb-4 max-md:text-base max-md:uppercase max-md:underline">
                      Totales
                    </h3>
                    <div className="flex max-md:flex-col max-md:items-start justify-between items-center mb-2">
                      <span className="max-md:uppercase max-md:text-sm">
                        Total Abertura
                      </span>
                      <span className="text-indigo-700">
                        {precioTotalAbertura.toLocaleString("es-ar", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex max-md:flex-col max-md:items-start justify-between items-center mb-2">
                      <span className="max-md:uppercase max-md:text-sm">
                        Total Adicionales
                      </span>
                      <span className="text-indigo-700">
                        {precioTotalAdicionales.toLocaleString("es-ar", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex max-md:flex-col max-md:items-start justify-between items-center mb-2">
                      <span className="max-md:uppercase max-md:text-sm">
                        Precio Final Abertura (sin adicional)
                      </span>
                      <span className="text-indigo-700">
                        {precioFinalAberturaSin.toLocaleString("es-ar", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex max-md:flex-col max-md:items-start justify-between items-center mb-3 max-md:gap-1">
                      <span className="max-md:uppercase max-md:text-sm">
                        Precio Final Abertura (con 40% adicional)
                      </span>
                      <span className="text-indigo-700 font-semibold">
                        {precioFinalAbertura.toLocaleString("es-ar", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col items-start gap-2">
                    <label
                      htmlFor=""
                      className="text-indigo-500 max-md:uppercase max-md:font-bold"
                    >
                      Seleccionar cantidad
                    </label>
                    <input
                      onChange={(e) => setCantidad(e.target.value)}
                      value={cantidad}
                      type="number"
                      placeholder="Ingresa la cantidad"
                      className="px-4 bg-slate-200 py-1 rounded-lg shadow-sm shadow-slate-400 outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={toggleAdditionalCost}
                    className="bg-indigo-500 text-white py-1 px-4 rounded-lg shadow-lg uppercase my-5 max-md:text-sm"
                  >
                    {applyAdditionalCost
                      ? "Click Quitar 40%"
                      : "Click Aplicar 40%"}
                  </button>

                  <div className="mt-6 flex items-start justify-between gap-2 max-md:flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        addToAbertura(
                          abertura?.detalle,
                          abertura?.categoria,
                          abertura?.color,
                          abertura?.ancho,
                          abertura?.alto,
                          cantidad,
                          precioFinalAbertura,
                          finalPrice
                        ),
                          closeModalSeleccionarAberturaFinal();
                        closeModalSeleccionar();
                      }}
                      className="bg-indigo-500 text-white py-1 px-4 rounded-lg shadow-lg uppercase max-md:text-sm"
                    >
                      Generar abertura
                    </button>

                    <p className="bg-indigo-500 text-white py-1 px-4 rounded-lg shadow-lg uppercase max-md:text-sm max-md:font-bold">
                      {finalPrice.toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={() => closeModalSeleccionarAberturaFinal()}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
