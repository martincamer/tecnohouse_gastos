import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useGastosContext } from "../../context/GastosProvider";
import { crearGastoNuevo } from "../../api/gastos";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useAberturasContext } from "../../context/AberturasProvider";
import { ModalSeleccionarPerfil } from "./ModalSeleccionarPerfil";

export const ModalCrearNuevaAbertura = () => {
  const {
    closeModal,
    isOpen,
    isOpenProductos,
    closeModalProductos,
    openModalProductos,
  } = useAberturasContext();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = handleSubmit(async (data) => {
  //   const res = await crearGastoNuevo(data);

  //   setTimeout(() => {
  //     location.reload();
  //   }, 1500);

  //   toast.success("Gasto creado correctamente!", {
  //     position: "top-right",
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // });

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
                  CREAR NUEVA ABERTURA
                </Dialog.Title>
                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full py-10 px-10">
                  <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        DETALLE
                      </label>
                      <input
                        placeholder="DETALLE DE LA ABERTURA - PUERTA FRENTE ETC"
                        className="py-2 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        COLOR
                      </label>
                      <select className="py-3 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none uppercase">
                        <option value="seleccionar">SELECCIONAR</option>
                        <option value="seleccionar">
                          BLANCO BRILLANTE RECUPERADO
                        </option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        CATEGORIA
                      </label>
                      <select className="py-3 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none uppercase">
                        <option value="seleccionar">SELECCIONAR</option>
                        <option value="seleccionar">HERRERO</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        TIPO
                      </label>
                      <select className="py-3 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none uppercase">
                        <option value="seleccionar">SELECCIONAR</option>
                        <option value="seleccionar">PUERTA</option>
                      </select>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => openModalProductos()}
                        className="text-base bg-teal-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold"
                      >
                        SELECCIONAR PERFILES
                      </button>
                    </div>

                    <div>
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3">CODIGO</th>
                            <th className="p-3">TOTAL KILOS</th>
                            <th className="p-3">PESO NETO BARRA</th>
                            <th className="p-3">DETALLE</th>
                            <th className="p-3">Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <button className="text-base bg-teal-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold">
                        SELECCIONAR ACCESORIOS
                      </button>
                    </div>

                    <div>
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3">CODIGO</th>
                            <th className="p-3">DETALLE</th>
                            <th className="p-3">TOTAL CANTIDADES</th>
                            <th className="p-3">Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <button className="text-base bg-teal-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold">
                        SELECCIONAR VIDRIO POR METRO
                      </button>
                    </div>

                    <div>
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3">CODIGO</th>
                            <th className="p-3">DETALLE</th>
                            <th className="p-3">TOTAL</th>
                            <th className="p-3">Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"></th>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-gray-800">
                          TOTAL EN ACCESORIOS:{" "}
                        </p>
                        <p className="font-semibold text-teal-500 text-xl">
                          $50.000
                        </p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-gray-800">
                          TOTAL EN ALUMINIO:{" "}
                        </p>
                        <p className="font-semibold text-teal-500 text-xl">
                          $550.000
                        </p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-gray-800">
                          TOTAL EN VIDRIO:{" "}
                        </p>
                        <p className="font-semibold text-teal-500 text-xl">
                          $120.000
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <button className="font-bold bg-teal-500 text-white text-steal-950 py-2 px-12 rounded-full text-center shadow">
                        CREAR NUEVA ABERTURA
                      </button>
                    </div>
                  </form>
                </div>
                <ModalSeleccionarPerfil
                  closeModalProductos={closeModalProductos}
                  isOpenProductos={isOpenProductos}
                />
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={() => closeModal()}
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
