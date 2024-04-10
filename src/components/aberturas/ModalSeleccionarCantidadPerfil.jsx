import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useAberturasContext } from "../../context/AberturasProvider";

export const ModalSeleccionarCantidadPerfil = ({
  isOpenModal,
  closeModalCantidad,
  closeModalProductos,
}) => {
  const [cantidad, setCantidad] = useState(0);
  const [largo, setLargo] = useState(0);

  const [totalKgFinal, setTotalKgFinal] = useState(0);

  const { productoUnicoState, addToPerfiles } = useAberturasContext();
  //   const [error, setError] = useState(false);

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
              <div className="w-5/6 max-md:w-full inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
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
                  Elegir Cantidad perfil
                </Dialog.Title>

                <div className="border-slate-300 border-[1px] rounded-2xl">
                  <table className="min-w-full w-full uppercase">
                    <thead className="border-b-[2px] border-slate-300">
                      <tr>
                        <th className="p-2 text-sm font-extrabold text-center max-md:text-xs">
                          Codigo
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center max-md:text-xs">
                          Detalle
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center max-md:text-xs">
                          Color
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center max-md:text-xs">
                          Peso de la barra
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center max-md:text-xs">
                          Cantidad de barras
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center max-md:text-xs">
                          Largo de la barra en mm
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                        {productoUnicoState.id}
                      </th> */}
                      <th className="p-2 text-sm max-md:text-xs text-center w-[20px]">
                        {productoUnicoState.codigo}
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[50px]">
                        {productoUnicoState.detalle}
                      </th>
                      <th className="p-2 text-sm max-md:text-xs text-center w-[20px]">
                        {productoUnicoState.color}
                      </th>

                      <th className="p-2 text-sm max-md:text-xs text-center w-[50px]">
                        <div className="flex gap-5 items-center justify-center">
                          Peso neto -{" "}
                          {productoUnicoState?.peso_barra_6_mts?.toLocaleString(
                            "arg",
                            {
                              minimumFractionDigits: 2,
                            }
                          )}
                          kg
                          <input
                            onChange={(e) => setTotalKgFinal(e.target.value)}
                            type="text"
                            value={totalKgFinal}
                            className="border-[1px] border-black/30 rounded p-2 w-[100px] outline-none"
                          />
                        </div>
                      </th>
                      <th className=" p-2 text-sm max-md:text-xs text-center w-[100px]">
                        <input
                          onChange={(e) => setCantidad(e.target.value)}
                          type="number"
                          className="border-[1px] border-black/30 rounded p-2 w-[100px] outline-none"
                          placeholder="cantidad"
                        />
                      </th>

                      <th className="p-2 text-sm max-md:text-xs text-center w-[100px]">
                        <input
                          onChange={(e) => setLargo(e.target.value)}
                          type="text"
                          className="border-[1px] border-black/30 rounded p-2 w-[100px] outline-none"
                          placeholder="largo"
                        />
                      </th>
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const totalKG = parseFloat(totalKgFinal);
                      const largoSeleccionado = parseFloat(largo); // Assuming largo is a property of productoUnicoState

                      const totalKGForItem =
                        (largo / 1000) * cantidad * totalKG;

                      addToPerfiles(
                        productoUnicoState.id,
                        productoUnicoState.codigo,
                        productoUnicoState.color,
                        productoUnicoState.detalle,
                        productoUnicoState.categoria,
                        cantidad,
                        totalKGForItem,
                        largoSeleccionado
                      );

                      closeModalCantidad();
                    }}
                    className="bg-indigo-100 text-indigo-600 py-3 px-5 rounded-xl uppercase text-sm"
                  >
                    Crear producto facturar
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
