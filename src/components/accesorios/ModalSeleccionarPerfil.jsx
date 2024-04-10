import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Search } from "../ui/Search";
import { Link } from "react-router-dom";
// import { useFacturaContext } from "../../context/FacturaProvider";
import { useAberturasContext } from "../../context/AberturasProvider";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { ModalSeleccionarCantidadAccesorio } from "./ModalSeleccionarCantidadAccesorio";
// import { ModalSeleccionarCantidadPerfil } from "./ModalSeleccionarCantidadPerfil";

export const ModalSeleccionarAccesorio = ({
  closeModalProductos,
  isOpenProductos,
}) => {
  //   const { search, searcher, results } = useAluminioContext();
  const { handleSeleccionarProducto } = useAberturasContext();
  const { searcher, search, results } = useAccesoriosContext();

  let [isOpenModal, setIsModal] = useState(false);

  function closeModalCantidad() {
    setIsModal(false);
  }

  function openModalCantidad() {
    setIsModal(true);
  }

  const itemsPerPage = 5; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
              <div className="w-3/4 max-md:w-full inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
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
                  className="text-sm font-bold leading-6 text-gray-700 uppercase"
                >
                  Elegir ACCESORIOS
                </Dialog.Title>
                <div>
                  <Search
                    variable={"Buscar por el detalle..."}
                    value={search}
                    searcher={searcher}
                  />
                </div>
                <div className="border-slate-300 border-[1px] rounded-2xl">
                  <table className="min-w-full w-full uppercase">
                    <thead className="border-b-[2px] border-slate-300">
                      <tr>
                        <th className="px-3 py-3 text-sm font-extrabold text-left max-md:text-xs">
                          Detalle
                        </th>

                        <th className="px-3 py-3 text-sm font-extrabold text-left max-md:text-xs">
                          Categoria
                        </th>
                        <th className="px-3 py-3 text-sm font-extrabold text-left max-md:text-xs">
                          Precio x unidad
                        </th>
                        <th className="px-3 py-3 text-sm font-extrabold text-left max-md:text-xs">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[1px] divide-slate-300">
                      {currentResults?.map((c) => (
                        <tr key={c.id}>
                          <th className="px-3 py-3 text-left text-sm max-md:text-xs font-normal">
                            {c.detalle}
                          </th>
                          <th className="px-3 py-3 text-left text-sm max-md:text-xs font-normal">
                            {c.categoria}
                          </th>
                          <th className="px-3 py-3 text-left text-sm max-md:text-xs font-normal">
                            {Number(c?.precio_unidad)?.toLocaleString("es-ar", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                            })}
                          </th>
                          <th className="px-3 py-3 text-left text-sm w-[120px] max-md:text-xs font-normal">
                            <Link
                              onClick={() => {
                                openModalCantidad(),
                                  handleSeleccionarProducto(c.id);
                              }}
                              className="bg-indigo-100 text-indigo-600 uppercase text-sm rounded-xl py-2 px-4 font-normal"
                            >
                              Seleccionar
                            </Link>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        className={`mx-1 px-3 py-1 rounded ${
                          currentPage === index + 1
                            ? "bg-green-500 text-white rounded-xl"
                            : "bg-white text-slate-700 border-[1px] border-slate-300 rounded-xl"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
                <ModalSeleccionarCantidadAccesorio
                  isOpenModal={isOpenModal}
                  closeModalCantidad={closeModalCantidad}
                  openModalCantidad={openModalCantidad}
                  closeModalProductos={closeModalProductos}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
