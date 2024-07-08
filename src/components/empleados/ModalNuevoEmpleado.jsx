import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEmpleadosContext } from "../../context/EmpleadosProvider";
import client from "../../api/axios";

export const ModalNuevoEmpleado = () => {
  const { register, handleSubmit, reset } = useForm();

  const { setEmpleados } = useEmpleadosContext();

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const empleadosData = {
        ...formData,
      };

      const res = await client.post("/empleados", empleadosData);

      setEmpleados(res.data.todosLosEmpleados);

      toast.success("Emplado creado correctamente", {
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

      document.getElementById("my_modal_nuevo_empleado").close();

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_nuevo_empleado" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-indigo-500">
          Crear nuevo empleado
        </h3>
        <p className="py-1">En esta sección podras crear tus empleados.</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 flex flex-col gap-2"
        >
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">Nombre</label>
            <input
              {...register("nombre")}
              placeholder="Escribe el nombre.."
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 rounded"
            />
          </div>
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">Apellido</label>
            <input
              {...register("apellido")}
              placeholder="Escribe el apellido.."
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 rounded"
            />
          </div>

          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">
              Inicio de trabajo
            </label>
            <input
              type="date"
              {...register("fecha_ingreso")}
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 rounded"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-orange-500 py-2 px-6 text-white font-semibold text-sm rounded-full mt-2 hover:bg-indigo-500 transition-all hover:shadow-md"
            >
              Guardar el empleado
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
