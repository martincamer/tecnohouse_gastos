import React, { useEffect } from "react";
import { ModalNuevoProveedor } from "../proveedores/ModalNuevoProveedor";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useGastosContext } from "../../context/GastosProvider";
import client from "../../api/axios";

export const ModalEditarResumen = ({ idObtenida }) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get(`/produccion/${idObtenida}`);
      setValue("total_salidas", res.data.total_salidas);
      setValue("total_stock", res.data.total_stock);
      setValue("numero_necesario", res.data.numero_necesario);
    };
    loadData();
  }, [idObtenida]);

  const { setProduccion } = useGastosContext();

  const onSubmit = async (formData) => {
    try {
      const dataResumen = {
        ...formData,
      };

      const res = await client.put(`/produccion/${idObtenida}`, dataResumen);

      setProduccion(res.data.todosLosRegistros);

      toast.success("Resumen editado correctamente", {
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

      document.getElementById("my_modal_editar_resumen").close();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <dialog id="my_modal_editar_resumen" className="modal">
      <div className="modal-box max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-indigo-500">
          Actualizar el resumen de entregas y stock
        </h3>
        <p className="py-1">En esta sección podras actualizar tus resumenes.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="flex-col flex gap-2 w-full">
            <label className="font-semibold text-gray-600">
              Total en salidas de aberturas
            </label>
            <input
              placeholder="Ingresar un numero de salidas ej: 100"
              {...register("total_salidas")}
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 capitalize"
            />
          </div>

          <div className="flex-col flex gap-2 w-full mt-2">
            <label className="font-semibold text-gray-600">
              Total del stock del resumen
            </label>
            <input
              placeholder="Ingresar un numero de salidas ej: 100"
              {...register("total_stock")}
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 capitalize"
            />
          </div>

          <div className="flex-col flex gap-2 w-full mt-2">
            <label className="font-semibold text-gray-600">
              Numero final producción a llegar
            </label>
            <input
              placeholder="Ingresar un numero de salidas ej: 600"
              {...register("numero_necesario")}
              className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 capitalize"
            />
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="bg-orange-500 py-2 px-6 text-white font-semibold text-sm rounded-full hover:bg-indigo-500 transition-all hover:shadow-md"
            >
              Actualizar el resumen del mes
            </button>
          </div>
        </form>
      </div>
      <ModalNuevoProveedor />
    </dialog>
  );
};
