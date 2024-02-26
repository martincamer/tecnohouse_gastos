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
              <div className="w-3/4 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Elegir ACCESORIOS
                </Dialog.Title>
                <Search
                  variable={"Buscar por el detalle..."}
                  value={search}
                  searcher={searcher}
                />

                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full h-[30vh] overflow-y-scroll">
                  <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase">
                    <thead>
                      <tr>
                        {/* <th className="p-2 text-sm font-extrabold text-center">
                          Numero
                        </th> */}
                        {/* <th className="p-2 text-sm font-extrabold text-center">
                          Numero
                        </th> */}
                        <th className="p-2 text-sm font-extrabold text-center">
                          Detalle
                        </th>

                        <th className="p-2 text-sm font-extrabold text-center">
                          Categoria
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Precio x unidad
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentResults?.map((c) => (
                        <tr key={c.id}>
                          {/* <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                            {c.id}
                          </th> */}
                          {/* <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.codigo}
                          </th> */}
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.detalle}
                          </th>
                          {/* <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.color}
                          </th> */}
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.categoria}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {Number(c?.precio_unidad)?.toLocaleString("es-ar", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                            })}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm w-[120px] text-center">
                            <Link
                              onClick={() => {
                                openModalCantidad(),
                                  handleSeleccionarProducto(c.id);
                              }}
                              className="bg-secondary py-1 px-2 text-center text-white rounded-md"
                            >
                              Seleccionar
                            </Link>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {totalPages > 1 && (
                    <div className="flex flex-wrap justify-center mt-4 mb-4 gap-4">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          className={`mx-1 px-3 py-1 rounded ${
                            currentPage === index + 1
                              ? "bg-indigo-500 hover:bg-slate-700 transition-all ease-in-out text-white shadow shadow-black/20"
                              : "bg-gray-100 shadow shadow-black/20"
                          }`}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <ModalSeleccionarCantidadAccesorio
                  isOpenModal={isOpenModal}
                  closeModalCantidad={closeModalCantidad}
                  openModalCantidad={openModalCantidad}
                  closeModalProductos={closeModalProductos}
                />
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer uppercase"
                  onClick={closeModalProductos}
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
