import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { usePreciosContext } from "../../context/PreciosProvider";

export const ModalPrecios = () => {
  const { isOpenPrecios, openModalPrecios, closeModalPrecios, precios } =
    usePreciosContext();

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
                <div className="text-sm bg-teal-500 text-white inline-block px-4 py-2 rounded-lg shadow shadow-black/20 font-semibold cursor-pointer">
                  CREAR NUEVO VALOR
                </div>
                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full py-10 px-10">
                  <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-sm">
                    <thead>
                      <tr>
                        <th className="p-3">Numero</th>
                        <th className="p-3">precio</th>
                        <th className="p-3">categoria</th>
                        <th className="p-3">detalle</th>
                        <th className="p-3">color</th>
                        <th className="p-3">editar</th>
                        <th className="p-3">eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {precios.map((p) => (
                        <tr>
                          <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                            {p.id}
                          </th>
                          <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                            {p.precio}
                          </th>
                          <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                            {p.categoria}
                          </th>
                          <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                            {p.detalle}
                          </th>
                          <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                            {p.color}
                          </th>
                          <th className="border-[1px] border-gray-300 p-3 font-semibold text-sm uppercase bg-teal-500 text-white text-center">
                            EDITAR
                          </th>
                          <th className="border-[1px] border-gray-300 p-3 font-semibold text-sm uppercase bg-red-500 text-white text-center">
                            ELIMINAR
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
        </Dialog>
      </Transition>
    </Menu>
  );
};
