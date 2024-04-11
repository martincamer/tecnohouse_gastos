import React, { useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { crearNuevoAccesorio } from "../../api/accesorios.api";
import { obtenerCategorias } from "../../api/categorias.api";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const ModalCrearNuevoAccesorio = ({ closeModal, isOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const { accesorios, setAccesorios, categorias } = useAccesoriosContext();

  const crearNuevoAccesorioSubmit = handleSubmit(async (data) => {
    try {
      const precioUnidadNumerico = parseInt(
        data.precio_unidad.replace(/[^\d]/g, ""),
        10
      );

      data.precio_unidad = precioUnidadNumerico;

      const res = await crearNuevoAccesorio(data);

      const precioExistente = accesorios.find(
        (perfil) => perfil.id === res.data.id
      );

      if (!precioExistente) {
        // Actualizar el estado de tipos agregando el nuevo tipo al final
        setAccesorios((prevTipos) => [...prevTipos, res.data]);
      }

      toast.success(
        "¡Accesorio creado correctamente, crea el siguiente accesorio!",
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
                    onClick={closeModal}
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
                  <div className="font-bold text-sm uppercase text-slate-700">
                    CREAR NUEVO ACCESORIO
                  </div>

                  <form
                    onSubmit={crearNuevoAccesorioSubmit}
                    className="space-y-4 text-sm"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">DETALLE</label>
                      <input
                        {...register("detalle", { required: true })}
                        placeholder="DETALLE DEL PERFIL"
                        type="text"
                        className="py-2 px-4 border-[1px] uppercase border-black/10 rounded-xl  shadow shadow-black/10 outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">CATEGORIA</label>
                      <select
                        {...register("categoria", { required: true })}
                        className="py-[10.5px] px-4 border-[1px] bg-white  border-black/10 rounded-xl  shadow shadow-black/10 outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        {categorias.map((c) => (
                          <option key={c.id}>{c.categoria}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">PRECIO POR UNIDAD</label>
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
                        className="py-2 px-4 border-[1px] border-black/10 rounded-xl uppercase shadow shadow-black/10 outline-none"
                      />
                    </div>

                    <div>
                      <button
                        className="bg-indigo-100 text-indigo-700 py-2 px-4 text-sm transition-all ease-in-out rounded-xl  shadow shadow-black/10"
                        type="submit"
                      >
                        CREAR ACCESORIO
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
