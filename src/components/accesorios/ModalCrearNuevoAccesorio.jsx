import React, { useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { crearNuevoAccesorio } from "../../api/accesorios.api";
import { obtenerCategorias } from "../../api/categorias.api";

export const ModalCrearNuevoAccesorio = ({ closeModal, isOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerCategorias();

      setCategorias(res.data);
    }

    loadData();
  }, []);

  const crearNuevoAccesorioSubmit = handleSubmit(async (data) => {
    try {
      // Limpia la cadena de precio_unidad y conviértela a número entero
      const precioUnidadNumerico = parseInt(
        data.precio_unidad.replace(/[^\d]/g, ""),
        10
      );

      // Actualiza el valor en el objeto data
      data.precio_unidad = precioUnidadNumerico;

      // Resto del código...

      const res = await crearNuevoAccesorio(data);

      toast.success("¡Accesorio creado correctamente!", {
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

      closeModal();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
                  <div className="font-semibold text-indigo-500 text-lg border-b-[1px] w-full border-gray-300">
                    CREAR NUEVO ACCESORIO
                  </div>

                  <form
                    onSubmit={crearNuevoAccesorioSubmit}
                    className="space-y-4"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-base">DETALLE</label>
                      <input
                        {...register("detalle", { required: true })}
                        placeholder="DETALLE DEL PERFIL"
                        type="text"
                        className="py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-base">
                        CATEGORIA
                      </label>
                      <select
                        {...register("categoria", { required: true })}
                        className="py-[10.5px] px-4 border-[1px] bg-white  border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        {categorias.map((c) => (
                          <option key={c.id}>{c.categoria}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-base">
                        PRECIO POR UNIDAD
                      </label>
                      <input
                        type="text"
                        placeholder="Precio"
                        {...register("precio_unidad", {
                          validate: (value) => {
                            const numeroLimpiado = value.replace(/[^0-9]/g, "");
                            return !!numeroLimpiado || "El precio es requerido";
                          },
                        })}
                        onChange={(e) => {
                          const inputPrecio = e.target.value;

                          // Remover caracteres no numéricos
                          const numeroLimpiado = inputPrecio.replace(
                            /[^0-9]/g,
                            ""
                          );

                          // Formatear como moneda
                          const precioFormateado = new Intl.NumberFormat(
                            "es-CO",
                            {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 0,
                            }
                          ).format(numeroLimpiado);

                          // Asignar el valor formateado al campo
                          e.target.value = precioFormateado;
                        }}
                        className="py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none"
                      />
                    </div>

                    <div>
                      <button
                        className="bg-indigo-500 text-white font-semibold py-2 px-8 hover:bg-indigo-700 transition-all ease-in-out rounded-lg shadow shadow-black/10"
                        type="submit"
                      >
                        CREAR ACCESORIO
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={closeModal}
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
