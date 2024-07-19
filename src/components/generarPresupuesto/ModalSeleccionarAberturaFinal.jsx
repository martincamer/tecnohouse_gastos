import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
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

  const { addToAbertura } = usePresupuestoContext();

  const [detalle, setDetalle] = useState("");
  const [ancho, setAncho] = useState("");
  const [color, setColor] = useState("");
  const [alto, setAlto] = useState("");

  useEffect(() => {
    const obtenerData = async () => {
      const res = await obtenerUnicaAbertura(obtenerId);

      setAbertura(res.data);
      setDetalle(res.data.detalle);
      setColor(res.data.color);
      setAncho(res.data.ancho);
      setAlto(res.data.alto);
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

  const [includeAdditionalPrice, setIncludeAdditionalPrice] = useState(false);

  let finalPrice;

  const [porciento, setPorciento] = useState(0);

  let precioFinalAbertura = 0; // Declaración global

  const calculateFinalPrice = () => {
    const precioTotal = includeAdditionalPrice
      ? precioTotalAbertura + precioTotalAdicionales
      : precioTotalAbertura;

    // Convertir porciento a número o establecerlo en 0 si no está definido
    const additionalCostMultiplier = Number(porciento);

    precioFinalAbertura = Number(precioTotal) * additionalCostMultiplier;

    finalPrice = Number(Number(precioFinalAbertura)) * Number(cantidad);

    return finalPrice;
  };

  // const precioTotalNew = includeAdditionalPrice
  //   ? precioTotalAbertura + precioTotalAdicionales
  //   : precioTotalAbertura;

  // const totalNew =
  //   precioTotalNew * (Number(porciento) || 0) +
  //   (Number(porciento) === 0 ? precioTotalNew : 0);

  // // *= (100 + porcentaje) / 100;

  // const finalNew = Number(totalNew) * Number(cantidad);

  const precioTotalNew = includeAdditionalPrice
    ? precioTotalAbertura + precioTotalAdicionales
    : precioTotalAbertura;

  const totalNew = precioTotalNew * ((100 + Number(porciento)) / 100);

  const finalNew = Number(totalNew) * Number(cantidad);

  const toggleAdditionalCost = () => {
    setApplyAdditionalCost(!applyAdditionalCost);
  };

  const toggleIncludeAdditionalPrice = () => {
    setIncludeAdditionalPrice(!includeAdditionalPrice);
  };

  return (
    <Menu as="div" className="z-50">
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
            <div className="fixed inset-0 bg-black bg-opacity-10" />
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
              <div className="max-md:h-[60vh] max-md:overflow-y-scroll max-md:w-full inline-block w-2/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeModalSeleccionarAberturaFinal}
                    className="bg-red-100 text-red-700 py-2 px-2 rounded-xl cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </p>
                </div>

                <div className=" mx-auto px-3 py-2 w-full">
                  <h2 className="text-base uppercase font-bold mb-4 max-md:text-base max-md:uppercase max-md:underline">
                    Detalles de la Abertura
                  </h2>

                  <div className="mb-4 max-md:flex-col max-md:flex max-md:gap-1">
                    <h3 className="font-semibold flex max-md:flex-col max-md:gap-1 gap-2 text-sm text-indigo-500 mb-2 items-center">
                      Detalle -
                      <input
                        value={detalle || ""}
                        onChange={(e) => setDetalle(e.target.value)}
                        className="border px-2 w-1/2 py-1.5 text-center outline-none rounded-md border-gray-300"
                      />
                    </h3>
                    <h3 className="font-semibold flex max-md:flex-col max-md:gap-1 gap-2 text-sm text-indigo-500 mb-2 items-center">
                      AltoxAncho -
                      <input
                        value={ancho || ""}
                        onChange={(e) => setAncho(e.target.value)}
                        className="border outline-none py-1.5 text-center rounded-md text-sm border-gray-300"
                      />
                      x{" "}
                      <input
                        value={alto || ""}
                        onChange={(e) => setAlto(e.target.value)}
                        className="border outline-none py-1.5 text-center rounded-md text-sm border-gray-300"
                      />
                    </h3>
                    <h3 className="font-semibold flex max-md:flex-col max-md:gap-1 gap-2 text-indigo-500 mb-2 items-center text-sm">
                      Categoria -
                      <span className="text-slate-700 capitalize max-md:text-sm">
                        {abertura?.categoria}
                      </span>
                    </h3>
                    <h3 className="font-semibold flex max-md:flex-col max-md:gap-1 gap-2 text-sm text-indigo-500 mb-2 items-center">
                      Color -
                      {/* <span className="text-slate-700 capitalize max-md:text-sm">
                        {abertura?.color}
                      </span> */}
                      <input
                        value={color || ""}
                        onChange={(e) => setColor(e.target.value)}
                        className="border outline-none py-1.5 text-center rounded-md text-sm border-gray-300"
                      />
                    </h3>
                  </div>

                  <div className="mt-4 flex flex-col items-start gap-2">
                    <label
                      htmlFor=""
                      className="text-indigo-500 text-sm font-bold"
                    >
                      Seleccionar cantidad
                    </label>
                    <input
                      onChange={(e) => setCantidad(e.target.value)}
                      value={cantidad}
                      type="number"
                      placeholder="Ingresa la cantidad"
                      className="px-4 border py-2 outline-none text-sm font-semibold rounded-md border-gray-300"
                    />
                  </div>
                  <div className="mt-4 flex flex-col items-start gap-2">
                    <label
                      htmlFor=""
                      className="text-indigo-500 text-sm font-bold"
                    >
                      Seleccionar el porciento a agregar a la abertura
                    </label>
                    <input
                      onChange={(e) => setPorciento(e.target.value)}
                      value={porciento}
                      type="text"
                      placeholder="Ingresa la %0.60"
                      className="px-4 border py-2 outline-none text-sm font-semibold rounded-md border-gray-300"
                    />
                  </div>
                  <div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={toggleIncludeAdditionalPrice}
                        className="bg-indigo-500 mt-5 text-white py-3 px-4 rounded font-semibold text-sm shadow-md max-md:text-sm"
                      >
                        {includeAdditionalPrice
                          ? "Ocultar precios adicionales"
                          : "Mostrar precios adicionales"}
                      </button>
                      {/* <button
                        type="button"
                        onClick={toggleAdditionalCost}
                        className="bg-green-500 mt-5 text-white py-3 px-4 rounded-xl text-sm shadow-lg uppercase max-md:text-sm"
                      >
                        {applyAdditionalCost ? "Quitar 40%" : "Aplicar 40%"}
                      </button> */}
                    </div>
                    <div className="flex flex-col gap-2 mt-5 bg-white border-[1px] border-slate-300 rounded-xl py-3 px-6 text-slate-700  text-sm shadow font-medium capitalize">
                      <p>
                        Precio total de la abertura:{" "}
                        <span className="font-bold">
                          {" "}
                          {totalNew.toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </p>
                      {includeAdditionalPrice && (
                        <p>
                          Precio total de los adicionales:{" "}
                          <span className="font-bold text-green-500">
                            {precioTotalAdicionales.toLocaleString("es-ar", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                            })}
                          </span>
                        </p>
                      )}

                      <p>
                        Precio final:{" "}
                        <span className="font-bold text-indigo-600">
                          {finalNew.toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start justify-between gap-2 max-md:flex-col">
                    <button
                      type="button"
                      onClick={() => {
                        addToAbertura(
                          detalle,
                          abertura?.categoria,
                          color,
                          ancho,
                          alto,
                          cantidad,
                          Number(totalNew),
                          finalNew
                        ),
                          closeModalSeleccionarAberturaFinal();
                        closeModalSeleccionar();
                      }}
                      className="text-sm bg-orange-500 py-2 px-5 rounded-full text-white font-bold hover:bg-indigo-500 transition-all hover:shadow-md"
                    >
                      Generar abertura
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
