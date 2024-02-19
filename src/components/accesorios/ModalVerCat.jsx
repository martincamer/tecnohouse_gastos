import React, { useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { eliminarCategoria, obtenerCategorias } from "../../api/categorias.api";

export const ModalVerCat = ({ isOpenVerCat, closeVerCategorias }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerCategorias();

      setCategorias(res.data);
    }

    loadData();
  }, []);

  const handleEliminarCat = async (id) => {
    try {
      await eliminarCategoria(id);

      toast.error("¡Categoria eliminado correctamente!", {
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

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenVerCat} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeVerCategorias}
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
              <div className="inline-block w-1/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col  gap-5">
                  <div className="font-semibold text-teal-500 text-lg border-b-[1px] w-full border-gray-300">
                    VER CATEGORIAS CREADAS
                  </div>

                  <div className="grid grid-cols-3 gap-3 uppercase text-sm">
                    {categorias.map((c) => (
                      <div
                        className="flex gap-2 border-[1px] rounded-lg shadow border-gray-300 py-2 px-2 items-center justify-center"
                        key={c.id}
                      >
                        <p>{c.categoria}</p>
                        <button
                          className="bg-teal-100 px-2 text-sm rounded-lg border-[1px] border-teal-400 text-teal-800"
                          type="button"
                        >
                          E
                        </button>
                        <button
                          className="bg-red-100 px-2 text-sm rounded-lg border-[1px] border-red-400 text-red-800"
                          type="button"
                          onClick={() => handleEliminarCat(c.id)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={closeVerCategorias}
                  >
                    Cerrar Ventana
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
