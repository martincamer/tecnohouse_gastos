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

  setTotalCantidad(cantidadTotal);
  setTotal(precioFinalTotal);

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

                <form className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <label className="max-md:text-sm">
                      CLIENTE/NOMBRE-APELLIDO
                    </label>
                    <input
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      placeholder="CLIENTE"
                      className="w-1/3 py-2 px-3 bg-white rounded-xl shadow border-[1px] border-slate-300 outline-none max-md:w-full max-md:text-sm uppercase"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="max-md:text-sm">
                      LOCALIDAD/PROVINCIA
                    </label>
                    <input
                      value={localidad}
                      onChange={(e) => setLocalidad(e.target.value)}
                      placeholder="LOCALIDAD"
                      className="w-1/3 py-2 px-3 bg-white rounded-xl shadow border-[1px] border-slate-300 outline-none max-md:w-full max-md:text-sm uppercase"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <Link
                      onClick={() => openModalSeleccionar()}
                      className="py-3 px-5  text-indigo-700 bg-indigo-100 rounded-2xl outline-none text-sm uppercase"
                    >
                      Seleccionar aberturas
                    </Link>
                  </div>

                  <div className="h-[50vh] overflow-y-scroll scroll-bar">
                    <table className="min-w-full">
                      <thead className="border-b-[1px] border-slate-300 uppercase text-sm">
                        <tr className="text-left">
                          {/* <th className="p-3 border-b-[1px]">Numero</th> */}
                          <th className="p-3 text-sm max-md:text-xs text-slate-700">
                            DETALLE
                          </th>
                          <th className="p-3 text-sm max-md:text-xs text-slate-700">
                            COLOR
                          </th>
                          <th className="p-3 text-sm max-md:text-xs text-slate-700">
                            MEDIDA
                          </th>
                          <th className="p-3 text-sm max-md:text-xs text-slate-700">
                            CATEGORIA
                          </th>
                          <th className="p-3 text-sm max-md:text-xs text-slate-700">
                            CANT
                          </th>
                          <th className="p-3 text-sm max-md:text-xs text-slate-700">
                            Precio Und
                          </th>
                          <th className="p-3 text-sm max-md:text-xs text-slate-700">
                            Precio Final
                          </th>
                          <th className="p-3 text-sm max-md:text-xs text-slate-700">
                            ELIMINAR
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-[1px] divide-slate-300">
                        {productoSeleccionado?.map((p, index) => (
                          <tr key={index} className="cursor-pointer">
                            <th className="px-3 py-5 text-[13px] uppercase">
                              {p.detalle}
                            </th>
                            <th className="px-3 py-5 text-[13px] uppercase">
                              {p?.color}
                            </th>
                            <th className="px-3 py-5 text-[13px] uppercase">
                              {p?.ancho}x{p?.alto}
                            </th>
                            <th className="px-3 py-5 text-[13px] uppercase">
                              {p?.categoria}
                            </th>
                            <th className="px-3 py-5 text-[13px] uppercase">
                              {p?.cantidad}
                            </th>
                            <th className="px-3 py-5 text-[13px] uppercase">
                              {p?.precioUnidad?.toLocaleString("es-ar", {
                                style: "currency",
                                currency: "ARS",
                                minimumFractionDigits: 2,
                              })}
                            </th>
                            <th className="px-3 py-5 text-[13px] uppercase">
                              {p?.precioFinal?.toLocaleString("es-ar", {
                                style: "currency",
                                currency: "ARS",
                                minimumFractionDigits: 2,
                              })}
                            </th>
                            <th className="px-3 py-5 text-[13px] uppercase">
                              <button
                                onClick={() => eliminarAberturaPorId(p?.id)}
                                type="button"
                                className="rounded-xl text-sm uppercase py-2 px-4 font-normal bg-red-100 text-red-800"
                              >
                                Eliminar
                              </button>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-2">
                    <p className="text-slate-700 max-md:uppercase max-md:text-sm uppercase">
                      Total aberturas
                    </p>
                    <p className="text-indigo-600 font-semibold">
                      {cantidadTotal}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <p className="text-slate-700 max-md:uppercase max-md:text-sm uppercase">
                      Total generado
                    </p>
                    <p className="text-indigo-600 font-semibold">
                      {precioFinalTotal?.toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="mb-5">
                    <button
                      onClick={() => crearNuevoPresupuestoSubmit()}
                      type="button"
                      className="text-sm bg-indigo-500 px-3 py-2 font-normal text-white rounded-lg shadow-lg mt-3"
                    >
                      CREAR PRESUPUESTO
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
