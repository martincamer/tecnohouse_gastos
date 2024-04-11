import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {
  editarAccesorio,
  obtenerUnicoAccesorio,
} from "../../api/accesorios.api";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const ModalEditarPerfil = ({
  closeEditarPerfil,
  isOpenEditar,
  obtenerId,
}) => {
  const { accesorios, setAccesorios, categorias } = useAccesoriosContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //obtener precio
  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicoAccesorio(obtenerId);

      setValue("detalle", res?.data?.detalle);
      setValue("categoria", res?.data?.categoria);
      setValue("precio_unidad", res?.data?.precio_unidad);
    }

    loadData();
  }, [obtenerId]);

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

      const res = await editarAccesorio(obtenerId, data);

      const perfilExistenteIndex = accesorios.findIndex(
        (perfil) => perfil.id == obtenerId
      );

      setAccesorios((prevTipos) => {
        const newTipos = [...prevTipos];
        const updatePerfil = JSON.parse(res.config.data); // Convierte el JSON a objeto

        newTipos[perfilExistenteIndex] = {
          id: obtenerId,
          detalle: updatePerfil.detalle,
          categoria: updatePerfil.categoria,
          precio_unidad: updatePerfil.precio_unidad,
          created_at: newTipos[perfilExistenteIndex].created_at,
          updated_at: newTipos[perfilExistenteIndex].updated_at,
        };
        return newTipos;
      });

      toast.success("¡Accesorio editado correctamente, segui editando!", {
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

      closeEditarPerfil();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenEditar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeEditarPerfil}
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
              <div className="inline-block max-md:w-full w-1/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col  gap-5">
                  <div className="font-bold uppercase text-sm">
                    EDITAR ACCESORIO
                  </div>

                  <form
                    onSubmit={crearNuevoAccesorioSubmit}
                    className="space-y-4 text-sm"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold max-md:text-sm">
                        DETALLE
                      </label>
                      <input
                        {...register("detalle", { required: true })}
                        placeholder="DETALLE DEL PERFIL"
                        type="text"
                        className="py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold max-md:text-sm">
                        CATEGORIA
                      </label>
                      <select
                        {...register("categoria", { required: true })}
                        className="py-[10.5px] px-4 border-[1px] bg-white  border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        {categorias?.map((c) => (
                          <option>{c.categoria}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold max-md:text-sm">
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
                        className="py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase"
                      />
                    </div>

                    <div>
                      <button
                        className="bg-indigo-100 max-md:text-sm text-indigo-700 py-2 px-8 hover:bg-indigo-700 transition-all ease-in-out rounded-xl shadow hover:text-white shadow-black/10"
                        type="submit"
                      >
                        EDITAR ACCESORIO
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
