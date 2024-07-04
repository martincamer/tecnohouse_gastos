import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Search } from "../ui/Search";
import { Link } from "react-router-dom";
import { useAberturasContext } from "../../context/AberturasProvider";
import { usePerfilesContex } from "../../context/PerfilesProvider";
import { ModalSeleccionarCantidadPerfil } from "./ModalSeleccionarCantidadPerfil";

export const ModalSeleccionarPerfil = ({
  closeModalProductos,
  isOpenProductos,
}) => {
  //   const { search, searcher, results } = useAluminioContext();
  const { handleSeleccionarProducto } = useAberturasContext();
  const { results, searcher, search } = usePerfilesContex();

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
                  className="font-bold leading-6 text-gray-700 text-sm uppercase"
                >
                  Elegir Perfil
                </Dialog.Title>
                <Search
                  variable={"Buscar por el codigo o detalle..."}
                  search={search}
                  searcher={searcher}
                />

                <div className="border-slate-300 border-[1px] rounded-2xl">
                  <table className="min-w-full w-full uppercase">
                    <thead className="border-b-[2px] border-slate-300">
                      <tr>
                        <th className="px-2 py-4 max-md:text-xs text-sm font-extrabold text-center">
                          Codigo
                        </th>
                        <th className="px-2 py-4 max-md:text-xs text-sm font-extrabold text-center">
                          Detalle
                        </th>
                        <th className="px-2 py-4 max-md:text-xs text-sm font-extrabold text-center">
                          Color
                        </th>
                        <th className="px-2 py-4 max-md:text-xs text-sm font-extrabold text-center">
                          Categoria
                        </th>
                        <th className="px-2 py-4 max-md:text-xs text-sm font-extrabold text-center">
                          Peso Barra
                        </th>
                        <th className="px-2 py-4 max-md:text-xs text-sm font-extrabold text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-slate-300 divide-y-[1px]">
                      {currentResults?.map((c) => (
                        <tr key={c.id}>
                          <th className="py-4 px-3 text-sm text-center max-md:text-xs font-bold">
                            {c.codigo}
                          </th>
                          <th className="py-4 px-3 text-sm text-center max-md:text-xs font-normal">
                            {c.detalle}
                          </th>
                          <th className="py-4 px-3 text-sm text-center max-md:text-xs font-normal">
                            {c.color}
                          </th>
                          <th className="py-4 px-3 text-sm text-center max-md:text-xs font-normal">
                            {c.categoria}
                          </th>
                          <th className="py-4 px-3 text-sm text-center max-md:text-xs font-normal">
                            {c?.peso_barra_6_mts?.toLocaleString("arg", {
                              minimumFractionDigits: 3,
                            })}{" "}
                            kg
                          </th>
                          <th className="py-4 px-3 text-sm w-[120px] text-center max-md:text-xs font-normal">
                            <Link
                              onClick={() => {
                                openModalCantidad(),
                                  handleSeleccionarProducto(c.id);
                              }}
                              className="bg-green-100 text-green-700 py-2 px-4 rounded-xl shadow-md"
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

                <ModalSeleccionarCantidadPerfil
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
