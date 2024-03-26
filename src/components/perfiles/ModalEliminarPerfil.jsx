import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { usePerfilesContex } from "../../context/PerfilesProvider";

export const ModalEliminarPerfil = () => {
  const {
    closeModalEliminar,
    obtenerParams,
    isOpenEliminar,
    handleEliminarPerfil,
  } = usePerfilesContex();

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenEliminar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalEliminar}
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
              <div className="max-md:w-full w-1/2 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-700 font-bold max-md:text-sm"
                >
                  ELIMINAR PERFIL
                </Dialog.Title>
                <div className="border-[1px] max-md:py-4 border-gray-200 rounded shadow-black/10 shadow flex gap-3 w-full py-10 px-10">
                  <button
                    onClick={() => handleEliminarPerfil(obtenerParams)}
                    type="button"
                    className="max-md:text-xs w-full bg-red-200 py-2 px-4 rounded-md shadow border-red-500 border-[1px] text-red-500 font-bold"
                  >
                    ELIMINAR
                  </button>
                  <button
                    onClick={() => closeModalEliminar()}
                    type="button"
                    className="max-md:text-xs w-full bg-teal-200 py-2 px-4 rounded-md shadow border-teal-950 border-[1px] text-teal-950 font-bold"
                  >
                    CERRAR
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={() => closeModalEliminar()}
                >
                  Cerrar Ventana
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
