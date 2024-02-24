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
                      className="py-2 px-3 bg-gray-100/10 rounded-lg shadow-black/10 shadow-md border-[1px] border-gray-100 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>LOCALIDAD</label>
                    <input
                      placeholder="LOCALIDAD"
                      className="py-2 px-3 bg-gray-100/10 rounded-lg shadow-black/10 shadow-md border-[1px] border-gray-100 outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="py-2 px-3 bg-gray-100/10 rounded-lg shadow-black/10 shadow-md border-[1px] border-gray-100 outline-none"
                    />
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
