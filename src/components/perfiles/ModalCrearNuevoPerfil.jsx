import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { crearNuevoPerfil } from "../../api/perfiles.api";
import { usePerfilesContex } from "../../context/PerfilesProvider";

export const ModalCrearNuevoPerfil = ({ closeModal, isOpen }) => {
  //submit crear perfil
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { perfiles, setPerfiles } = usePerfilesContex();

  const crearNuevoPerfilSubmit = handleSubmit(async (data) => {
    try {
      const res = await crearNuevoPerfil(data);

      const precioExistente = perfiles.find(
        (perfil) => perfil.id === res.data.id
      );

      if (!precioExistente) {
        // Actualizar el estado de tipos agregando el nuevo tipo al final
        setPerfiles((prevTipos) => [...prevTipos, res.data]);
      }

      toast.success("¡Perfil creado correctamente, crea el siguiente perfil!", {
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
              <div className="inline-block max-md:w-full w-1/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                    CREAR NUEVO PERFIL
                  </div>

                  <form
                    onSubmit={crearNuevoPerfilSubmit}
                    className="space-y-4 text-sm"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold">CODIGO</label>
                      <input
                        {...register("codigo", { required: true })}
                        placeholder="CODIGO DEL PERFIL"
                        type="text"
                        className="py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase"
                      />
                    </div>

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
                        className="py-[10.5px] px-4 border-[1px] bg-white  border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase uppercase"
                      >
                        <option>SELECCIONAR</option>
                        <option>HERRERO</option>
                        <option>MODENA</option>
                        <option>MADERA</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-base max-md:text-sm">
                        COLOR
                      </label>
                      <select
                        {...register("color", { required: true })}
                        className="py-[10.5px] px-4 border-[1px] bg-white  border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase uppercase"
                      >
                        <option>SELECCIONAR</option>
                        <option>BLANCO</option>
                        <option>NEGRO</option>
                        <option>BLANCO ALUAR</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold max-md:text-sm">
                        PESO DE LA BARRA 6 MTS
                      </label>
                      <input
                        {...register("peso_barra_6_mts", { required: true })}
                        placeholder="PESO NETO DE LA BARRA"
                        type="text"
                        className="py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase"
                      />
                    </div>

                    <div>
                      <button
                        className="bg-indigo-100 max-md:text-xs text-indigo-600 py-2 px-8 hover:bg-indigo-500 transition-all ease-in-out rounded-xl shadow shadow-black/10 hover:text-white"
                        type="submit"
                      >
                        CREAR PERFIL
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
