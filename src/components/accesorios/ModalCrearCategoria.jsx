import React from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { crearCategorias } from "../../api/categorias.api";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const ModalCrearCategoria = ({
  closeCrearCategoria,
  isOpenCrearCategoria,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { categorias, setCategorias } = useAccesoriosContext();

  const crearNuevoAccesorioSubmit = handleSubmit(async (data) => {
    try {
      const res = await crearCategorias(data);

      const precioExistente = categorias.find(
        (perfil) => perfil.id === res.data.id
      );

      if (!precioExistente) {
        // Actualizar el estado de tipos agregando el nuevo tipo al final
        setCategorias((prevTipos) => [...prevTipos, res.data]);
      }

      toast.success(
        "¡Categoria creada correctamente, crea la siguiente categoria!",
        {
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
        }
      );

      closeModal();
    } catch (error) {
      console.log(error.response.data);
    }
  });

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenCrearCategoria} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeCrearCategoria}
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
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeCrearCategoria}
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
                <div className="flex flex-col  gap-5">
                  <div className="font-bold text-sm uppercase">
                    CREAR NUEVO ACCESORIO
                  </div>

                  <form
                    onSubmit={crearNuevoAccesorioSubmit}
                    className="space-y-4 text-sm"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">
                        NOMBRE DE LA CATEGORIA
                      </label>
                      <input
                        {...register("categoria", { required: true })}
                        placeholder="CATEGORIA"
                        type="text"
                        className="py-2 px-4 border-[1px] border-black/10 rounded-xl text-sm uppercase shadow shadow-black/10 outline-none"
                      />
                    </div>

                    <div>
                      <button
                        className="bg-indigo-100 text-indigo-600 hover:text-white py-2 px-8 hover:bg-indigo-700 transition-all ease-in-out rounded-lg shadow shadow-black/10"
                        type="submit"
                      >
                        CREAR CATEGORIA
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
