import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const ModalEliminarAccesorios = () => {
  const {
    closeModalEliminar,
    obtenerParams,
    isOpenEliminar,
    handleEliminarAccesorio,
  } = useAccesoriosContext();

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
              <div className="w-1/3 max-md:w-full inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title as="h3" className="text-sm uppercase font-bold">
                  ELIMINAR GASTO
                </Dialog.Title>
                <div className=" flex gap-3 w-full">
                  <button
                    onClick={() => handleEliminarAccesorio(obtenerParams)}
                    type="button"
                    className="bg-red-100 text-red-800 py-2 px-4 rounded-xl text-sm w-full"
                  >
                    ELIMINAR
                  </button>
                  <button
                    className="bg-green-100 text-green-800 py-2 px-4 rounded-xl text-sm w-full"
                    onClick={() => closeModalEliminar()}
                    type="button"
                  >
                    CERRAR
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
