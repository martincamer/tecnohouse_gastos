import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { crearVentaNueva } from "../../api/ventas";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useVentasContext } from "../../context/VentasProvider";

export const ModalCrearGastos = () => {
  const { closeModal, isOpen } = useVentasContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await crearVentaNueva(data);

    setTimeout(() => {
      location.reload();
    }, 1500);

    toast.success("Venta creada correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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
              <div className="w-1/2 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-700 font-bold"
                >
                  CREAR NUEVA VENTA
                </Dialog.Title>
                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full py-10 px-10">
                  <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        DETALLE:
                      </label>{" "}
                      <textarea
                        {...register("detalle")}
                        placeholder="DETALLE.."
                        className="w-full py-1 px-2 bg-gray-100 rounded shadow-md shadow-black/20 border-[1px] border-teal-300 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        TIPO VENTA:
                      </label>{" "}
                      <select
                        {...register("tipo")}
                        className="w-1/2 py-2 px-2 bg-gray-100 rounded shadow-md shadow-black/20 border-[1px] border-teal-300 outline-none"
                      >
                        <option value="">SELECCIONAR</option>
                        <option value="INTERNA">INTERNA</option>
                        <option value="EXTERNA">EXTERNA</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        NUMERO FACTURA O OTRA COSA:
                      </label>{" "}
                      <input
                        {...register("numero")}
                        placeholder="N° 000-12244"
                        className="w-1/3 py-1 px-2 bg-gray-100 rounded shadow-md shadow-black/20 border-[1px] border-teal-300 outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        TOTAL INGRESO:
                      </label>{" "}
                      <input
                        {...register("total")}
                        placeholder="TOTAL VENTA $"
                        className="w-1/2 py-1 px-2 bg-gray-100 rounded shadow-md shadow-black/20 border-[1px] border-teal-300 outline-none"
                      />
                    </div>
                    <div className="flex items-start">
                      <button className="font-bold bg-teal-300 text-steal-950 py-2 px-12 rounded-full text-center shadow">
                        CREAR NUEVO VENTA
                      </button>
                    </div>
                  </form>
                </div>
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
