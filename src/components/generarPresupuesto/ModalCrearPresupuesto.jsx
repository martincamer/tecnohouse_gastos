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
    total,
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

  return (
    <Menu as="div" className="z-50">
      {/* <ToastContainer /> */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <div className="inline-block w-2/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <form className="space-y-3">
                  <div className="flex flex-col gap-2">
                    <label>CLIENTE</label>
                    <input
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      placeholder="CLIENTE"
                      className="w-1/3 py-2 px-3 bg-white rounded-xl shadow border-[1px] border-slate-300 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>LOCALIDAD</label>
                    <input
                      value={localidad}
                      onChange={(e) => setLocalidad(e.target.value)}
                      placeholder="LOCALIDAD"
                      className="w-1/3 py-2 px-3 bg-white rounded-xl shadow border-[1px] border-slate-300 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <Link
                      onClick={() => openModalSeleccionar()}
                      className="py-2 px-3 bg-indigo-100 rounded-lg shadow-black/10 shadow-md border-[1px] border-indigo-500 text-indigo-700 outline-none text-sm"
                    >
                      Seleccionar aberturas
                    </Link>
                  </div>

                  <div className="h-[30vh] overflow-y-scroll">
                    <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20">
                      <thead>
                        <tr className="text-left">
                          {/* <th className="p-3 border-b-[1px]">Numero</th> */}
                          <th className="p-3 border-b-[1px] text-sm text-slate-700">
                            DETALLE
                          </th>
                          <th className="p-3 border-b-[1px] text-sm text-slate-700">
                            COLOR
                          </th>
                          <th className="p-3 border-b-[1px] text-sm text-slate-700">
                            MEDIDA
                          </th>
                          <th className="p-3 border-b-[1px] text-sm text-slate-700">
                            CATEGORIA
                          </th>
                          <th className="p-3 border-b-[1px] text-sm text-slate-700">
                            CANT
                          </th>
                          <th className="p-3 border-b-[1px] text-sm text-slate-700">
                            Precio Und
                          </th>
                          <th className="p-3 border-b-[1px] text-sm text-slate-700">
                            Precio Final
                          </th>
                          <th className="p-3 border-b-[1px] text-sm text-slate-700">
                            ELIMINAR
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {productoSeleccionado?.map((p, index) => (
                          <tr
                            key={index}
                            className="cursor-pointer hover:bg-slate-100 transiton-all ease-in-out duration-100 text-left"
                          >
                            <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-[13px] uppercase">
                              {p?.detalle}
                            </th>
                            <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-[13px] uppercase">
                              {p?.color}
                            </th>
                            <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-[13px] uppercase">
                              {p?.ancho}x{p?.alto}
                            </th>
                            <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-[13px] uppercase">
                              {p?.categoria}
                            </th>
                            <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-[13px] uppercase">
                              {p?.cantidad}
                            </th>
                            <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-[13px] uppercase">
                              {p?.precioUnidad?.toLocaleString("es-ar", {
                                style: "currency",
                                currency: "ARS",
                                minimumFractionDigits: 2,
                              })}
                            </th>
                            <th className="border-b-[1px] py-5 border-gray-300 px-3 font-semibold text-indigo-600 text-[13px] uppercase">
                              {p?.precioFinal?.toLocaleString("es-ar", {
                                style: "currency",
                                currency: "ARS",
                                minimumFractionDigits: 2,
                              })}
                            </th>
                            <th className="border-b-[1px] py-5 border-gray-300 px-3 font-semibold text-red-600 text-[13px] uppercase">
                              <button
                                onClick={() => eliminarAberturaPorId(p?.id)}
                                type="button"
                                className="bg-red-100 bg-red-100/50 px-4 py-1 border-red-500 border-[1px] rounded-lg"
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
                    <p className="text-slate-700">Total aberturas</p>
                    <p className="text-indigo-600 font-semibold">
                      {cantidadTotal}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <p className="text-slate-700">Total generado</p>
                    <p className="text-indigo-600 font-semibold">
                      {precioFinalTotal?.toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => crearNuevoPresupuestoSubmit()}
                      type="button"
                      className="text-sm bg-indigo-500 px-3 py-2 text-white rounded-lg shadow-lg mt-3"
                    >
                      CREAR PRESUPUESTO
                    </button>
                  </div>
                </form>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={closeModal}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
          <ModalSeleccionarAberturas
            openSeleccionar={openSeleccionar}
            closeModalSeleccionar={closeModalSeleccionar}
          />
        </Dialog>
      </Transition>
    </Menu>
  );
};
