import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { crearNuevoPrecio } from "../../api/precios.api";
import { usePreciosContext } from "../../context/PreciosProvider";

export const CrearNuevoPrecio = ({ isCrearPrecio, closeCrearPrecio }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();

  const { precios, setPrecios } = usePreciosContext();

  const onSubmit = async (data) => {
    try {
      // Limpia la cadena de precio y conviértela a número entero
      const precioUnidadNumerico = parseInt(
        data.precio.replace(/[^\d]/g, ""),
        10
      );

      // Actualiza el valor en el objeto data
      data.precio = precioUnidadNumerico;

      // Resto del código...

      const res = await crearNuevoPrecio(data);

      const precioExistente = precios.find(
        (precio) => precio.id === res.data.id
      );

      if (!precioExistente) {
        // Actualizar el estado de tipos agregando el nuevo tipo al final
        setPrecios((prevTipos) => [...prevTipos, res.data]);
      }

      toast.success("¡Precio creado correctamente!", {
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

      closeCrearPrecio();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isCrearPrecio} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeCrearPrecio}
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
              <div className="w-1/3 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl rounded-2xl space-y-6 max-md:w-full">
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeCrearPrecio}
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

                <Dialog.Title
                  as="h3"
                  className="leading-6 text-gray-700 font-bold text-sm"
                >
                  CREAR NUEVO PRECIO/CATEGORIA
                </Dialog.Title>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 text-sm"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      className="uppercase font-bold text-sm"
                      htmlFor="precio"
                    >
                      Precio
                    </label>
                    <input
                      {...register("precio", {
                        validate: (value) => {
                          // Realiza validaciones adicionales si es necesario
                          const numeroLimpiado = value.replace(/[^0-9]/g, "");
                          return !!numeroLimpiado || "El precio es requerido";
                        },
                      })}
                      type="text"
                      placeholder="Precio"
                      className="shadow-sm shadow-black/20 rounded-xl py-2 px-2 border-[1px] border-black/20 outline-none uppercase"
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
                            currency: "ARS", // Puedes cambiar esto según la moneda que desees
                            minimumFractionDigits: 0,
                          }
                        ).format(numeroLimpiado);

                        // Asignar el valor formateado al campo
                        e.target.value = precioFormateado;
                      }}
                    />
                    {errors.precio && <p>{errors.precio.message}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="uppercase font-bold text-sm"
                      htmlFor="categoria"
                    >
                      Categoria
                    </label>
                    <input
                      {...register("categoria")}
                      type="text"
                      placeholder="CATEGORIA: EJ MODENA, 3 MLS, 4MLS"
                      className="shadow-sm shadow-black/20 rounded-xl py-2 px-2 border-[1px] border-black/20 outline-none uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="uppercase font-bold text-sm"
                      htmlFor="detalle"
                    >
                      Detalle
                    </label>
                    <input
                      {...register("detalle")}
                      type="text"
                      placeholder="DETALLE: EJ VIDRIO, ALUMINIO"
                      className="shadow-sm shadow-black/20 rounded-xl py-2 px-2 border-[1px] border-black/20 outline-none uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="uppercase font-bold text-sm"
                      htmlFor="color"
                    >
                      Color
                    </label>
                    <input
                      {...register("color")}
                      type="text"
                      placeholder="COLOR"
                      className="shadow-sm shadow-black/20 rounded-xl py-2 px-2 border-[1px] border-black/20 outline-none uppercase"
                    />
                  </div>

                  <button
                    className="bg-indigo-200 py-2 px-6 uppercase font-normal text-indigo-600 text-sm rounded-lg shadow"
                    type="submit"
                  >
                    Crear Precio
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
