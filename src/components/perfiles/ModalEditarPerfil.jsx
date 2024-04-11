import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { editarPerfil, obtenerUnicoPerfil } from "../../api/perfiles.api";
import { usePerfilesContex } from "../../context/PerfilesProvider";

export const ModalEditarPerfil = ({
  closeEditarPerfil,
  isOpenEditar,
  obtenerId,
}) => {
  const { perfiles, setPerfiles } = usePerfilesContex();

  //submit crear perfil
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //obtener precio
  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicoPerfil(obtenerId);

      setValue("codigo", res?.data?.codigo);
      setValue("detalle", res?.data?.detalle);
      setValue("categoria", res?.data?.categoria);
      setValue("color", res?.data?.color);
      setValue("peso_barra_6_mts", res?.data?.peso_barra_6_mts);
    }

    loadData();
  }, [obtenerId]);

  const crearNuevoPerfilSubmit = handleSubmit(async (data) => {
    try {
      const res = await editarPerfil(obtenerId, data);
      console.log(res);

      const perfilExistenteIndex = perfiles.findIndex(
        (perfil) => perfil.id == obtenerId
      );

      setPerfiles((prevTipos) => {
        const newTipos = [...prevTipos];
        const updatePerfil = JSON.parse(res.config.data); // Convierte el JSON a objeto

        newTipos[perfilExistenteIndex] = {
          id: obtenerId,
          codigo: updatePerfil.codigo,
          detalle: updatePerfil.detalle,
          categoria: updatePerfil.categoria,
          color: updatePerfil.color,
          peso_barra_6_mts: updatePerfil.peso_barra_6_mts,
          created_at: newTipos[perfilExistenteIndex].created_at,
          updated_at: newTipos[perfilExistenteIndex].updated_at,
        };
        return newTipos;
      });

      toast.success("¡Perfil editado correctamente, segui editando!", {
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
      console.log(error.response.data);
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
              <div className="inline-block w-1/3 max-md:w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeEditarPerfil}
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
                      <label className="font-semibold max-md:text-sm">
                        CODIGO
                      </label>
                      <input
                        {...register("codigo", { required: true })}
                        placeholder="CODIGO DEL PERFIL"
                        type="text"
                        className="uppercase py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none"
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
                        className="uppercase py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none"
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
                        <option>HERRERO</option>
                        <option>MODENA</option>
                        <option>MADERA</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold max-md:text-sm">
                        COLOR
                      </label>
                      <select
                        {...register("color", { required: true })}
                        className="py-[10.5px] px-4 border-[1px] bg-white  border-black/10 rounded-lg shadow shadow-black/10 outline-none uppercase"
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
                        className="uppercase py-2 px-4 border-[1px] border-black/10 rounded-lg shadow shadow-black/10 outline-none"
                      />
                    </div>

                    <div>
                      <button
                        className="bg-indigo-100 text-indigo-600 font-normal py-2 px-8 hover:bg-indigo-500 hover:text-white transition-all ease-in-out rounded-lg shadow shadow-black/10"
                        type="submit"
                      >
                        EDITAR PERFIL
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
