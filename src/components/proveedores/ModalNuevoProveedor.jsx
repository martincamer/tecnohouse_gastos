import React from "react";
import { useGastosContext } from "../../context/GastosProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import client from "../../api/axios";

export const ModalNuevoProveedor = () => {
  const { register, handleSubmit, reset } = useForm();

  const { setProveedores } = useGastosContext();

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const proveedorData = {
        ...formData,
      };

      const res = await client.post("/proveedores", proveedorData);

      setProveedores(res.data.todosLosProveedores);

      toast.success("¡Proveedor creador correctamente!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          padding: "12px",
        },
      });

      document.getElementById("my_modal_nuevo_proveedor").close();

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_nuevo_proveedor" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-indigo-500">
          Crear nuevo proveedor
        </h3>
        <p className="py-1">En esta sección podras crear tus proveedores.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 flex flex-col gap-2"
        >
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">Proveedor</label>
            <input
              {...register("proveedor")}
              placeholder="Escribe el proveedor.."
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2"
            />
          </div>
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">
              Localidad y provincia
            </label>
            <input
              {...register("localidad_provincia")}
              placeholder="Escribe la localidad y provincia.."
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2"
            />
          </div>
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">Dirección</label>
            <input
              {...register("direccion")}
              placeholder="Escribe la dirección.."
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2"
            />
          </div>
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">Email</label>
            <input
              {...register("email")}
              placeholder="Escribe el email.."
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2"
            />
          </div>
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">Telefono</label>
            <input
              {...register("telefono")}
              placeholder="Escribe el telefono.."
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-orange-500 py-2 px-6 text-white font-semibold text-sm rounded-full mt-2 hover:bg-indigo-500 transition-all hover:shadow-md"
            >
              Guardar el proveedor
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
