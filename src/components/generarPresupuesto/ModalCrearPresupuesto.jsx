import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const ModalCrearPresupuesto = () => {
  const { isOpen, closeModal, openModal } = usePresupuestoContext();
  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
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
                      placeholder="CLIENTE"
                      className="w-1/3 py-2 px-3 bg-slate-100 rounded-lg shadow-black/10 shadow-md border-[1px] border-slate-300 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>LOCALIDAD</label>
                    <input
                      placeholder="LOCALIDAD"
                      className="w-1/3 py-2 px-3 bg-slate-100 rounded-lg shadow-black/10 shadow-md border-[1px] border-slate-300 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <button
                      type="button"
                      className="py-2 px-3 bg-indigo-100 rounded-lg shadow-black/10 shadow-md border-[1px] border-indigo-500 text-indigo-700 outline-none text-sm"
                    >
                      Seleccionar aberturas
                    </button>
                  </div>

                  <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20">
                    <thead>
                      <tr className="text-left">
                        {/* <th className="p-3 border-b-[1px]">Numero</th> */}
                        <th className="p-3 border-b-[1px] text-sm text-slate-700">
                          DETALLE
                        </th>
                        <th className="p-3 border-b-[1px] text-sm text-slate-700">
                          MEDIDA
                        </th>
                        <th className="p-3 border-b-[1px] text-sm text-slate-700">
                          COLOR
                        </th>
                        <th className="p-3 border-b-[1px] text-sm text-slate-700">
                          CATEGORIA
                        </th>
                        <th className="p-3 border-b-[1px] text-sm text-slate-700">
                          PRECIO UND.
                        </th>
                        <th className="p-3 border-b-[1px] text-sm text-slate-700">
                          CANT
                        </th>
                        <th className="p-3 border-b-[1px] text-sm text-slate-700">
                          TOTAL
                        </th>
                        <th className="p-3 border-b-[1px] text-sm text-slate-700">
                          ELIMINAR
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="cursor-pointer hover:bg-slate-100 transiton-all ease-in-out duration-100 text-left">
                        <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm uppercase">
                          1
                        </th>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex gap-2">
                    <p className="text-slate-700">Total aberturas</p>
                    <p className="text-indigo-500">5</p>
                  </div>

                  <div className="flex gap-2">
                    <p className="text-slate-700">Total generado</p>
                    <p className="text-indigo-500">$12.000.000,55</p>
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
        </Dialog>
      </Transition>
    </Menu>
  );
};
