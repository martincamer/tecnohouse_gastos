import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";
import { ModalSeleccionarAberturas } from "./ModalSeleccionarAberturas";
import { Link } from "react-router-dom";

export const ModalCrearPresupuesto = () => {
  const {
    isOpen,
    closeModal,
    productoSeleccionado,
    eliminarAberturaPorId,
    crearNuevoPresupuestoSubmit,
    cliente,
    localidad,
    setCliente,
    setLocalidad,
    setTotal,
    setTotalCantidad,
  } = usePresupuestoContext();

  const [openSeleccionar, setOpenSeleccionar] = useState(false);

  const openModalSeleccionar = () => {
    setOpenSeleccionar(true);
  };

  const closeModalSeleccionar = () => {
    setOpenSeleccionar(false);
  };

  // Calcula la cantidad total utilizando reduce
  const cantidadTotal = productoSeleccionado?.reduce(
    (total, producto) => total + parseInt(producto?.cantidad, 10),
    0
  );

  // Calcula la suma total de 'precioFinal' utilizando reduce
  const precioFinalTotal = productoSeleccionado?.reduce(
    (total, perfil) => total + (perfil?.precioFinal || 0),
    0
  );

  const [operacion, setOperacion] = useState("descuento");
  const [porcentaje, setPorcentaje] = useState(0);

  const handleOperacionChange = (e) => {
    setOperacion(e.target.value);
  };

  const handlePorcentajeChange = (e) => {
    const valor = parseFloat(e.target.value);
    if (!isNaN(valor)) {
      setPorcentaje(valor);
    }
  };

  // Calcula el total final dependiendo de la operación seleccionada
  let totalFinal = precioFinalTotal;
  if (operacion === "descuento") {
    totalFinal *= (100 - porcentaje) / 100; // Aplica descuento
  } else if (operacion === "suma") {
    totalFinal *= (100 + porcentaje) / 100; // Suma porcentaje adicional
  }

  setTotal(totalFinal);
  setTotalCantidad(cantidadTotal);
  const [showDetail, setShowDetail] = useState(
    Array(productoSeleccionado.length).fill(false)
  ); // Inicializa un array de estados locales, uno para cada fila

  const toggleDetail = (index) => {
    const newShowDetail = [...showDetail]; // Crea una copia del array de estados locales
    newShowDetail[index] = !newShowDetail[index]; // Cambia el estado para la fila correspondiente
    setShowDetail(newShowDetail); // Actualiza el estado
  };

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto h-full"
          onClose={closeModal}
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

          <div className="h-full px-4 text-center w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-white h-full max-h-full" />
            </Transition.Child>

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
              <div className="w-full h-full inline-block py-2 px-2 text-left align-middle transition-all transform bg-white space-y-6">
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeModal}
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

                <form className="space-y-6">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Nombre y apellido del cliente
                      </label>
                      <input
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        placeholder="Cliente"
                        className="border py-2 px-3 text-sm font-semibold outline-none rounded-md border-gray-300"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">
                        Localidad y provincia del cliente
                      </label>
                      <input
                        value={localidad}
                        onChange={(e) => setLocalidad(e.target.value)}
                        placeholder="Localidad/provincia"
                        className="border py-2 px-3 text-sm font-semibold outline-none rounded-md border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <Link
                      onClick={() => openModalSeleccionar()}
                      className="py-1.5 text-sm font-bold bg-indigo-500 px-6 text-white rounded"
                    >
                      Seleccionar aberturas
                    </Link>
                  </div>

                  <div className="h-[50vh] overflow-y-scroll scroll-bar">
                    <table className="min-w-full table">
                      <thead className="text-xs uppercase">
                        <tr className="">
                          <th className="py-5 text-indigo-600">DETALLE</th>
                          <th className="py-5 text-indigo-600">COLOR</th>
                          <th className="py-5 text-indigo-600">MEDIDA</th>
                          <th className="py-5 text-indigo-600">CATEGORIA</th>
                          <th className="py-5 text-indigo-600">CANT</th>
                          <th className="py-5 text-indigo-600">Precio Und</th>
                          <th className="py-5 text-indigo-600">Precio Final</th>
                          <th className="py-5 text-indigo-600">ELIMINAR</th>
                        </tr>
                      </thead>
                      <tbody className="uppercase text-xs">
                        {productoSeleccionado?.map((p, index) => (
                          <tr key={index} className="cursor-pointer">
                            <th>{p.detalle}</th>
                            <th>{p?.color}</th>
                            <th>
                              {p?.ancho}x{p?.alto}
                            </th>
                            <th>{p?.categoria}</th>
                            <th>{p?.cantidad}</th>
                            <th>
                              {p?.precioUnidad?.toLocaleString("es-ar", {
                                style: "currency",
                                currency: "ARS",
                                minimumFractionDigits: 2,
                              })}
                            </th>
                            <th>
                              {p?.precioFinal?.toLocaleString("es-ar", {
                                style: "currency",
                                currency: "ARS",
                                minimumFractionDigits: 2,
                              })}
                            </th>
                            <th>
                              <button
                                onClick={() => eliminarAberturaPorId(p?.id)}
                                type="button"
                                className="rounded bg-red-500 text-white px-5 py-0.5"
                              >
                                Eliminar
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="descuento"
                        name="operacion"
                        value="descuento"
                        checked={operacion === "descuento"}
                        onChange={handleOperacionChange}
                        className="mr-2"
                      />
                      <label className="text-sm font-bold" htmlFor="descuento">
                        Aplicar descuento
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="suma"
                        name="operacion"
                        value="suma"
                        checked={operacion === "suma"}
                        onChange={handleOperacionChange}
                        className="mr-2"
                      />
                      <label className="text-sm font-bold" htmlFor="suma">
                        Sumar porcentaje
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 font-semibold">
                    <label
                      htmlFor="porcentaje"
                      className="text-slate-700 max-md:uppercase max-md:text-sm uppercase"
                    >
                      {operacion === "descuento"
                        ? "Porcentaje de descuento"
                        : "Porcentaje a sumar"}
                    </label>
                    <input
                      id="porcentaje"
                      type="number"
                      value={porcentaje}
                      onChange={handlePorcentajeChange}
                      className="border py-2 px-3 text-sm font-semibold w-1/3 outline-none"
                    />
                  </div>

                  <div className="flex gap-2 font-semibold">
                    <p className="text-slate-700 max-md:uppercase max-md:text-sm uppercase">
                      Total aberturas
                    </p>
                    <p className="text-indigo-600 font-semibold">
                      {cantidadTotal}
                    </p>
                  </div>

                  <div className="flex gap-2 font-semibold">
                    <p className="text-slate-700 max-md:uppercase max-md:text-sm uppercase">
                      Total generado
                    </p>
                    <p className="text-indigo-600 font-semibold">
                      {totalFinal?.toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="pb-10">
                    <button
                      onClick={() => crearNuevoPresupuestoSubmit()}
                      type="button"
                      className="text-sm bg-orange-500 py-2 px-6 font-bold rounded-full text-white hover:bg-indigo-500 transition-all hover:shadow-md"
                    >
                      Generar el presupuesto
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
          <ModalSeleccionarAberturas
            closeModal={closeModal}
            openSeleccionar={openSeleccionar}
            closeModalSeleccionar={closeModalSeleccionar}
          />
        </Dialog>
      </Transition>
    </Menu>
  );
};
