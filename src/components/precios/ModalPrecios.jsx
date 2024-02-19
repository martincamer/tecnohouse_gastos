import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePreciosContext } from "../../context/PreciosProvider";
import { CrearNuevoPrecio } from "./CrearNuevoPrecio";
import { eliminarPrecio } from "../../api/precios.api";
import { ToastContainer, toast } from "react-toastify";
import { ModalEditarPrecio } from "./ModalEditarPrecio";

export const ModalPrecios = () => {
  const { isOpenPrecios, closeModalPrecios, precios } = usePreciosContext();

  const [obtenerId, setObtenerId] = useState("");
  let [isCrearPrecio, setIsCrearPrecio] = useState(false);
  let [isEditarPrecio, setIsEditarPrecio] = useState(false);

  function openCrearPrecio() {
    setIsCrearPrecio(true);
  }

  function closeCrearPrecio() {
    setIsCrearPrecio(false);
  }

  function openEditarPrecio() {
    setIsEditarPrecio(true);
  }

  function closeEditarPrecio() {
    setIsEditarPrecio(false);
  }

  const handleObtenerId = (id) => {
    setObtenerId(id);
  };

  const handleEliminar = async (id) => {
    try {
      const res = await eliminarPrecio(id);

      toast.error("¡Precio eliminado correctamente!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        location.reload();
      }, 1500);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const itemsPerPage = 5; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = precios.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(precios.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenPrecios} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalPrecios}
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
            <div className="fixed inset-0 bg-black bg-opacity-40" />
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
              <div className="w-3/5 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-700 font-bold"
                >
                  PRECIOS ACTUALES
                </Dialog.Title>
                <div
                  onClick={() => openCrearPrecio()}
                  className="text-sm bg-teal-500 text-white inline-block px-4 py-2 rounded-lg shadow shadow-black/20 font-semibold cursor-pointer"
                >
                  CREAR NUEVO VALOR
                </div>
                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full py-10 px-10">
                  <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-sm">
                    <thead>
                      <tr>
                        <th className="py-4 px-5 border-b-[1px]">precio</th>
                        <th className="py-4 px-5 border-b-[1px]">categoria</th>
                        <th className="py-4 px-5 border-b-[1px]">detalle</th>
                        <th className="py-4 px-5 border-b-[1px]">color</th>
                        <th className="py-4 px-5 border-b-[1px]">editar</th>
                        <th className="py-4 px-5 border-b-[1px]">eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentResults?.map((p) => (
                        <tr className="hover:bg-gray-100 transition-all ease-in-out cursor-pointer">
                          <th className="border-b-[1px] border-gray-300 py-4 px-5 text-sm uppercase font-bold text-gray-800">
                            {Number(p.precio).toLocaleString("es-ar", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                            })}
                          </th>
                          <th className="border-b-[1px] border-gray-300 py-4 px-5 font-medium text-sm uppercase">
                            {p.categoria}
                          </th>
                          <th className="border-b-[1px] border-gray-300 py-4 px-5 font-medium text-sm uppercase">
                            {p.detalle}
                          </th>
                          <th className="border-b-[1px] border-gray-300 py-4 px-5 font-medium text-sm uppercase">
                            {p.color}
                          </th>
                          <th
                            onClick={() => {
                              handleObtenerId(p.id), openEditarPrecio();
                            }}
                            className="border-b-[1px] py-4 px-5 font-semibold text-sm uppercase bg-teal-500 text-white text-center"
                          >
                            EDITAR
                          </th>
                          <th
                            onClick={() => handleEliminar(p.id)}
                            className="border-b-[1px] border-gray-300 py-4 px-5 font-semibold text-sm uppercase bg-red-500 hover:bg-red-300 transition-all ease-in-out hover:text-red-600 text-white text-center"
                          >
                            ELIMINAR
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
                              ? "bg-teal-500 hover:bg-teal-600 transition-all ease-in-out text-white shadow shadow-black/20"
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

                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={() => closeModalPrecios()}
                >
                  Cerrar Ventana
                </button>
              </div>
            </Transition.Child>
          </div>

          <CrearNuevoPrecio
            isCrearPrecio={isCrearPrecio}
            closeCrearPrecio={closeCrearPrecio}
          />
          <ModalEditarPrecio
            obtenerId={obtenerId}
            isEditarPrecio={isEditarPrecio}
            closeEditarPrecio={closeEditarPrecio}
          />
        </Dialog>
      </Transition>
    </Menu>
  );
};
