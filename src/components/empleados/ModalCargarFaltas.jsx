import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEmpleadosContext } from "../../context/EmpleadosProvider";
import client from "../../api/axios";

export const ModalCargarFaltas = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const { empleados } = useEmpleadosContext();

  const nombre = watch("nombre");
  const justificacion = watch("justificacion");
  const fecha_falta = watch("fecha_falta");
  const justificada = watch("justificada");

  const { setEmpleados } = useEmpleadosContext();

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const empleadosData = {
        comprobante: {
          nombre: nombre,
          justificacion: justificacion,
          fecha_falta: fecha_falta,
          justificada: justificada,
        },
        ...formData,
      };

      const res = await client.post(
        `/empledos-falta/${nombre}/comprobante`,
        empleadosData
      );

      setEmpleados(res.data.todosLosEmpleados);

      toast.success("Falta cargada correctamente", {
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

      document.getElementById("my_modal_faltas").close();

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_faltas" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-indigo-500">
          Cargar nueva falta
        </h3>
        <p className="py-1">
          En esta sección podras cargar la falta al empleado.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 flex flex-col gap-2"
        >
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">
              Seleccionar empleado
            </label>
            <select
              {...register("nombre")}
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 rounded capitalize"
            >
              <option className="font-bold text-indigo-600">
                Seleccionar empleado
              </option>
              {empleados.map((e) => (
                <option value={e.nombre} key={e.id} className="font-semibold">
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">Justificación</label>
            <textarea
              placeholder="Justificación..."
              {...register("Justificación")}
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 rounded"
            />
          </div>
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">
              Fecha de la falta
            </label>
            <input
              type="date"
              {...register("fecha_falta")}
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 rounded"
            />
          </div>

          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">
              Falta justificada
            </label>
            <select
              {...register("justificada")}
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 rounded capitalize"
            >
              <option className="font-bold text-indigo-600">Seleccionar</option>
              <option value={"Si justificada"} className="font-semibold">
                Si justificada
              </option>
              <option value={"No justificada"} className="font-semibold">
                No justificada
              </option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-orange-500 py-2 px-6 text-white font-semibold text-sm rounded-full mt-2 hover:bg-indigo-500 transition-all hover:shadow-md"
            >
              Guardar la falta
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
