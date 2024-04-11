import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
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

  return (
    <Menu as="div" className="z-50">
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
                <div className="mb-5 w-1/3">
                  <Search
                    variable="Buscar por el detalle..."
                    search={search}
                    searcher={searcher}
                  />
                </div>
                <form className="space-y-3 overflow-x-scroll border-[1px] border-slate-300 rounded-2xl">
                  <table className="min-w-full uppercase text-sm">
                    <thead className="border-b-[2px] border-slate-300">
                      <tr className="text-left">
                        {/* <th className="p-3 border-b-[1px]">Numero</th> */}
                        <th className="p-3 text-sm max-md:text-xs text-slate-700">
                          DETALLE
                        </th>
                        <th className="p-3 text-sm max-md:text-xs text-slate-700">
                          MEDIDA
                        </th>
                        <th className="p-3 text-sm max-md:text-xs text-slate-700">
                          COLOR
                        </th>
                        <th className="p-3 text-sm max-md:text-xs text-slate-700">
                          CATEGORIA
                        </th>

                        <th className="p-3 text-sm max-md:text-xs text-slate-700">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[1px] divide-slate-300">
                      {currentResults?.map((r) => (
                        <tr
                          key={r?.id}
                          className="cursor-pointer hover:bg-slate-100 transiton-all ease-in-out duration-100 text-left"
                        >
                          <th className="py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            {r?.detalle}
                          </th>
                          <th className="py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            {r?.ancho}x{r?.alto}
                          </th>
                          <th className="py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            {r?.color}
                          </th>
                          <th className="py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            {r?.categoria}
                          </th>
                          <th className="py-5 border-gray-300 px-3 font-medium text-sm max-md:text-xs uppercase">
                            <button
                              onClick={() => {
                                handleId(r?.id),
                                  openModalSeleccionarAberturaFinal();
                              }}
                              type="button"
                              className="bg-indigo-100 uppercase text-indigo-700 px-4 py-2 text-sm max-md:text-xs rounded-xl shadow"
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
                        className={`mx-1 px-3 py-1 rounded-xl ${
                          currentPage === index + 1
                            ? "bg-green-600 text-white"
                            : "border-[1px] border-slate-300 shadow"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
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
