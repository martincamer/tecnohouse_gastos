import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { usePreciosContext } from "../../context/PreciosProvider";
import { CrearNuevoPrecio } from "./CrearNuevoPrecio";
import { eliminarPrecio } from "../../api/precios.api";
import { ToastContainer, toast } from "react-toastify";
import { ModalEditarPrecio } from "./ModalEditarPrecio";

export const ModalPrecios = () => {
  const { isOpenPrecios, closeModalPrecios, precios, setPrecios } =
    usePreciosContext();

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

      setPrecios((precioPrev) =>
        precioPrev.filter((precio) => precio.id !== id)
      );

      toast.error("¡Precio eliminado correctamente!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "10px",
          borderRadius: "15px",
          boxShadow: "none",
          border: "1px solid rgb(203 213 225)",
        },
      });
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
              <div className="w-3/5 max-md:w-full inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl rounded-2xl space-y-6">
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeModalPrecios}
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
                  className="text-sm leading-6 text-gray-700 font-bold"
                >
                  PRECIOS ACTUALES / ESTO VARIA DEPENDIENDO SU CATEGORIA
                </Dialog.Title>
                <div
                  onClick={() => openCrearPrecio()}
                  className="text-sm bg-indigo-100 text-indigo-700 inline-block px-4 py-2 rounded-xl cursor-pointer"
                >
                  CREAR NUEVO PRECIO
                </div>
                <div className="border-slate-300 border-[1px] hover:shadow-md transition-all ease-linear cursor-pointer rounded-xl">
                  <table className="min-w-full uppercase text-sm">
                    <thead className="border-b-[1px] border-slate-300">
                      <tr>
                        <th className="py-4 px-5 max-md:text-xs font-bold text-slate-700">
                          precio
                        </th>
                        <th className="py-4 px-5 max-md:text-xs font-bold text-slate-700">
                          categoria
                        </th>
                        <th className="py-4 px-5 max-md:text-xs font-bold text-slate-700">
                          detalle
                        </th>
                        <th className="py-4 px-5 max-md:text-xs font-bold text-slate-700">
                          color
                        </th>
                        <th className="py-4 px-5 max-md:text-xs font-bold text-slate-700">
                          editar
                        </th>
                        <th className="py-4 px-5 max-md:text-xs font-bold text-slate-700">
                          eliminar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[1px] divide-slate-200">
                      {currentResults?.map((p) => (
                        <tr>
                          <th className="py-4 px-5 text-sm uppercase font-bold">
                            {Number(p.precio).toLocaleString("es-ar", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                            })}
                          </th>
                          <th className="py-4 px-5 font-medium text-sm max-md:text-xs uppercase">
                            {p.categoria}
                          </th>
                          <th className="py-4 px-5 font-medium text-sm max-md:text-xs uppercase">
                            {p.detalle}
                          </th>
                          <th className="py-4 px-5 font-medium text-sm max-md:text-xs uppercase">
                            {p.color}
                          </th>
                          <th
                            onClick={() => {
                              handleObtenerId(p.id), openEditarPrecio();
                            }}
                            className="py-4 px-5"
                          >
                            <p className="bg-green-100 text-green-700 py-3 rounded-xl text-center px-4">
                              EDITAR
                            </p>
                          </th>
                          <th
                            onClick={() => handleEliminar(p.id)}
                            className="py-4 px-5"
                          >
                            <span className="bg-red-100 text-red-800 py-3 rounded-xl text-center px-4">
                              {" "}
                              ELIMINAR
                            </span>
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
                        className={`mx-1 px-3 py-1 rounded-xl text-sm ${
                          currentPage === index + 1
                            ? "bg-green-500 text-white"
                            : "bg-white border-[1px] border-slate-300"
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
