import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { crearNuevoAccesorio } from "../../api/accesorios.api";

export const ModalCrearNuevoAccesorio = ({ closeModal, isOpen }) => {
  // const { setPerfiles } = usePerfilesContex();

  //submit crear perfil
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const crearNuevoAccesorioSubmit = handleSubmit(async (data) => {
    try {
      const res = await crearNuevoAccesorio(data);

      // setPerfiles(data);

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
      // setError(error.response.data);
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
              <div className="inline-block w-1/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-col  gap-5">
                  <div className="font-semibold text-teal-500 text-lg border-b-[1px] w-full border-gray-300">
                    CREAR NUEVO PERFIL
                  </div>

                  <form
                    onSubmit={crearNuevoAccesorioSubmit}
                    className="space-y-4"
                  >
                    {/* <div className="flex flex-col gap-1">
                      <label className="font-semibold text-base">CODIGO</label>
                      <input
                        {...register("codigo", { required: true })}
                        placeholder="CODIGO DEL PERFIL"
                        type="text"
                        className="py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none"
                      />
                    </div> */}

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
                        <option>RUEDAS</option>
                        <option>TORNILLOS</option>
                        <option>ACCESORO</option>
                        <option>FLEJES</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-base">
                        PRECIO POR UNIDAD
                      </label>
                      <input
                        {...register("precio_unidad", { required: true })}
                        placeholder="PRECIO POR UNIDAD"
                        type="text"
                        className="py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none"
                      />
                    </div>

                    <div>
                      <button
                        className="bg-teal-500 text-white font-semibold py-2 px-8 hover:bg-teal-700 transition-all ease-in-out rounded-lg shadow shadow-black/10"
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
