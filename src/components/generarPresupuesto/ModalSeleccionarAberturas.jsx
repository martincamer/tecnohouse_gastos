import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAberturasContext } from "../../context/AberturasProvider";
import { ModalSeleccionarAberturaFinal } from "./ModalSeleccionarAberturaFinal";
import { Search } from "../ui/Search";

export const ModalSeleccionarAberturas = ({
  openSeleccionar,
  closeModalSeleccionar,
  closeModal,
}) => {
  const { results, search, searcher } = useAberturasContext();

  const [obtenerId, setObtenerId] = useState("");
  const [seleccionarAberturaFinal, setSeleccionarAberturaFinal] =
    useState(false);

  const openModalSeleccionarAberturaFinal = () => {
    setSeleccionarAberturaFinal(true);
  };

  const closeModalSeleccionarAberturaFinal = () => {
    setSeleccionarAberturaFinal(false);
  };

  const handleId = (id) => {
    setObtenerId(id);
  };

  const itemsPerPage = 5; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [showDetail, setShowDetail] = useState(
    Array(results.length).fill(false)
  ); // Inicializa un array de estados locales, uno para cada fila

  const toggleDetail = (index) => {
    const newShowDetail = [...showDetail]; // Crea una copia del array de estados locales
    newShowDetail[index] = !newShowDetail[index]; // Cambia el estado para la fila correspondiente
    setShowDetail(newShowDetail); // Actualiza el estado
  };

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={openSeleccionar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalSeleccionar}
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
              <div className="inline-block max-md:w-full w-5/6 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="mb-5">
                  <Search
                    variable="Buscar por el detalle..."
                    search={search}
                    searcher={searcher}
                  />
                </div>
                <form className="space-y-3 overflow-x-scroll">
                  <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20">
                    <thead>
                      <tr className="text-left">
                        {/* <th className="p-3 border-b-[1px]">Numero</th> */}
                        <th className="p-3 border-b-[1px] text-sm max-md:text-xs text-slate-700">
                          DETALLE
                        </th>
                        <th className="p-3 border-b-[1px] text-sm max-md:text-xs text-slate-700">
                          MEDIDA
                        </th>
                        <th className="p-3 border-b-[1px] text-sm max-md:text-xs text-slate-700">
                          COLOR
                        </th>
                        <th className="p-3 border-b-[1px] text-sm max-md:text-xs text-slate-700">
                          CATEGORIA
                        </th>

                        <th className="p-3 border-b-[1px] text-sm max-md:text-xs text-slate-700">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentResults?.map((r, index) => (
                        <tr
                          key={r?.id}
                          className="cursor-pointer hover:bg-slate-100 transiton-all ease-in-out duration-100 text-left"
                        >
                          <th
                            onClick={() => toggleDetail(index)}
                            className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase md:hidden"
                          >
                            {showDetail[index] ? (
                              r.detalle
                            ) : (
                              <span className="bg-white border-slate-300 border-[1px] rounded-xl py-2 px-2 shadow text-slate-900">
                                CLICK
                              </span>
                            )}{" "}
                          </th>
                           <th
                            className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase md:block max-md:hidden"
                          >
                             {r.detalle}
                          </th>
                          <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            {r?.ancho}x{r?.alto}
                          </th>
                          <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            {r?.color}
                          </th>
                          <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            {r?.categoria}
                          </th>

                          <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            <button
                              onClick={() => {
                                handleId(r?.id),
                                  openModalSeleccionarAberturaFinal();
                              }}
                              type="button"
                              className="bg-indigo-500 text-white px-4 py-1 text-sm max-md:text-xs rounded-lg shadow"
                            >
                              Seleccionar
                            </button>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center mt-4 mb-4 gap-4 max-md:gap-1">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        type="button"
                        key={index}
                        className={`mx-1 px-3 py-1 rounded ${
                          currentPage === index + 1
                            ? "bg-indigo-500 hover:bg-slate-700 transition-all ease-in-out text-white shadow shadow-black/20 max-md:text-xs"
                            : "bg-gray-100 shadow shadow-black/20 max-md:text-xs"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-xl hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={() => closeModalSeleccionar()}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>

            <ModalSeleccionarAberturaFinal
              obtenerId={obtenerId}
              seleccionarAberturaFinal={seleccionarAberturaFinal}
              closeModalSeleccionar={closeModalSeleccionar}
              closeModalSeleccionarAberturaFinal={
                closeModalSeleccionarAberturaFinal
              }
            />
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
