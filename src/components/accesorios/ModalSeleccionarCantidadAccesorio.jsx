import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useAberturasContext } from "../../context/AberturasProvider";

export const ModalSeleccionarCantidadAccesorio = ({
  isOpenModal,
  closeModalCantidad,
  closeModalProductos,
}) => {
  const [cantidad, setCantidad] = useState(0);

  const { accesorioUnicoState, addToAccesorio } = useAberturasContext();

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalCantidad}
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
              <div className="max-md:w-full w-5/6 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeModalCantidad}
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

                <Dialog.Title
                  as="h3"
                  className="text-sm uppercase font-bold leading-6 "
                >
                  Elegir Cantidad
                </Dialog.Title>

                <div className="border-slate-300 border-[1px] rounded-2xl">
                  <table className="min-w-full w-full uppercase">
                    <thead className="border-b-[2px] border-slate-300">
                      <tr>
                        <th className="px-3 py-3 text-sm font-extrabold text-left max-md:text-xs">
                          Numero
                        </th>
                        <th className="px-3 py-3 text-sm font-extrabold text-left max-md:text-xs">
                          Detalle
                        </th>{" "}
                        <th className="px-3 py-3 text-sm font-extrabold text-left max-md:text-xs">
                          Categoria
                        </th>
                        <th className="px-3 py-3 text-sm font-extrabold text-left max-md:text-xs">
                          Cantidad
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <th className="border-[1px] border-gray-300 p-2 text-sm text-center max-md:text-xs w-[20px]">
                        {productoUnicoState.id}
                      </th> */}
                      <th className="px-3 py-3 text-sm text-lefts max-md:text-xs font-normal w-[20px]">
                        {accesorioUnicoState.id}
                      </th>
                      <th className="px-3 py-3 text-sm text-lefts max-md:text-xs font-normal w-[50px]">
                        {accesorioUnicoState.detalle}
                      </th>
                      <th className="px-3 py-3 text-sm text-lefts max-md:text-xs font-normal w-[50px]">
                        {accesorioUnicoState.categoria}
                      </th>
                      <th className="px-3 py-3 text-sm text-lefts max-md:text-xs font-normal w-[100px]">
                        <input
                          onChange={(e) => setCantidad(e.target.value)}
                          type="number"
                          className="border-[1px] border-black/30 rounded p-2 w-[100px] outline-none max-md:text-xs"
                          placeholder="cantidad"
                        />
                      </th>
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    onClick={() => {
                      addToAccesorio(
                        accesorioUnicoState.id,
                        accesorioUnicoState.detalle,
                        accesorioUnicoState.categoria,
                        cantidad
                      ),
                        closeModalCantidad();
                    }}
                    className="bg-indigo-100 text-indigo-600 py-3 px-5 rounded-xl uppercase text-sm"
                  >
                    Crear accesorio
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
