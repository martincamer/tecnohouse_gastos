import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { crearNuevoPrecio } from "../../api/precios.api";

export const CrearNuevoPrecio = ({ isCrearPrecio, closeCrearPrecio }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();

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

      toast.success("¡Precio creado correctamente!", {
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
    } catch (error) {
      console.log(error.response.data);
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
              <div className="w-1/3 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl rounded-2xl space-y-6 max-md:w-full">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-700 font-bold"
                >
                  CREAR NUEVO PRECIO
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      className="shadow-sm shadow-black/20 rounded-lg py-1 px-2 border-[1px] border-black/20 outline-none"
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
                      className="shadow-sm shadow-black/20 rounded-lg py-1 px-2 border-[1px] border-black/20 outline-none"
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
                      className="shadow-sm shadow-black/20 rounded-lg py-1 px-2 border-[1px] border-black/20 outline-none"
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
                      className="shadow-sm shadow-black/20 rounded-lg py-1 px-2 border-[1px] border-black/20 outline-none"
                    />
                  </div>

                  <button
                    className="bg-indigo-500 py-2 px-6 uppercase text-sm font-semibold text-white rounded-lg shadow"
                    type="submit"
                  >
                    Crear Precio
                  </button>
                </form>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={() => closeCrearPrecio()}
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
