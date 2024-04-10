import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Search } from "../ui/Search";
import { Link } from "react-router-dom";
import { useAberturasContext } from "../../context/AberturasProvider";
import { ModalSeleccionarCantidadPerfil } from "./ModalSeleccionarCantidadPerfil";
// import { usePerfilesContex } from "../../context/PerfilesProvider";
// import { useFacturaContext } from "../../context/FacturaProvider";

export const ModalSeleccionarVidrio = ({
  closeModalProductos,
  isOpenProductos,
}) => {
  //   const { search, searcher, results } = useAluminioContext();
  const { addToVidrio } = useAberturasContext();

  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleChangeAncho = (event) => {
    setAncho(event.target.value);
  };

  const handleChangeAlto = (event) => {
    setAlto(event.target.value);
  };

  const handleChangeCantidad = (event) => {
    setCantidad(event.target.value);
  };

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  let id;

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenProductos} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalProductos}
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
                    onClick={closeModalProductos}
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
                  className="text-sm uppercase font-bold leading-6 text-gray-700"
                >
                  Elegir Vidrio / en cm
                </Dialog.Title>

                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow max-md:py-5 flex gap-6 w-full py-10 px-10 overflow-y-scroll">
                  <div className="flex gap-2 items-center">
                    <label
                      className="uppercase text-indigo-500 font-semibold"
                      htmlFor=""
                    >
                      Ancho
                    </label>
                    <input
                      value={ancho}
                      onChange={handleChangeAncho}
                      type="text"
                      placeholder="ANCHO DEL VIDRIO"
                      className="border-[1px] border-gray-200 rounded-lg shadow shadow-black/20 py-1 px-3 placeholder:text-sm outline-none"
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <label
                      className="uppercase text-indigo-500 font-semibold max-md:text-sm"
                      htmlFor=""
                    >
                      Alto
                    </label>
                    <input
                      value={alto}
                      onChange={handleChangeAlto}
                      type="text"
                      placeholder="ALTO DEL VIDRIO"
                      className="border-[1px] border-gray-200 rounded-lg shadow shadow-black/20 py-1 px-3 placeholder:text-sm outline-none"
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <label
                      className="uppercase text-indigo-500 font-semibold max-md:text-sm"
                      htmlFor=""
                    >
                      Cantidad
                    </label>
                    <input
                      value={cantidad}
                      onChange={handleChangeCantidad}
                      type="text"
                      placeholder="CANTIDAD DE VIDRIOS"
                      className="border-[1px] border-gray-200 rounded-lg shadow shadow-black/20 py-1 px-3 placeholder:text-sm outline-none"
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <label
                      className="uppercase text-indigo-500 font-semibold max-md:text-sm"
                      htmlFor=""
                    >
                      Seleccionar
                    </label>
                    <select
                      value={categoria}
                      onChange={handleChangeCategoria}
                      type="text"
                      placeholder="CANTIDAD DE VIDRIOS"
                      className="border-[1px] border-gray-200 bg-white rounded-lg shadow shadow-black/20 py-2 px-3 placeholder:text-sm outline-none"
                    >
                      <option>SELECCIONAR</option>
                      <option>6 mls</option>
                      <option>3 mls</option>
                      <option>4 mls</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-indigo-100 text-indigo-500 rounded-xl py-3 px-5 uppercase text-sm"
                    type="button"
                    onClick={() => {
                      const anchoMeters = parseFloat(ancho) / 1000; // Convert width to meters
                      const altoMeters = parseFloat(alto) / 1000; // Convert height to meters
                      const cantidadTwo = parseInt(cantidad, 10);

                      console.log(altoMeters);

                      // Calculate square meters for one glass
                      const metrosCuadradosUnidad = anchoMeters * altoMeters;

                      // Calculate total square meters for the given quantity
                      const totalMetrosCuadrados =
                        metrosCuadradosUnidad * cantidadTwo;

                      addToVidrio(
                        ancho,
                        alto,
                        cantidad,
                        totalMetrosCuadrados,
                        categoria
                      );
                      closeModalProductos();
                    }}
                  >
                    Crear vidrio
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
