import React, { useEffect, useState } from "react";
import { useGastosContext } from "../../context/GastosProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { formatearDinero } from "../../helpers/formatearDinero";
import client from "../../api/axios";

export const ModalEditarSaldo = ({ idObtenida }) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const { setProveedores } = useGastosContext();

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get(`/proveedores/${idObtenida}`);

      setValue("total", res.data.total);

      console.log("asdasdasd", res);
    };

    loadData();
  }, [idObtenida]);

  const onSubmit = async (formData) => {
    try {
      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const proveedorData = {
        ...formData,
      };

      const res = await client.put(`/proveedores/${idObtenida}`, proveedorData);

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

      document.getElementById("my_modal_editar_saldo").close();

      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  const total = watch("total");

  return (
    <dialog id="my_modal_editar_saldo" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-indigo-500">
          Actualizar saldo del proveedor/deuda
        </h3>
        <p className="py-1">
          En esta sección podras actualizar la deuda que tenemos con el
          proveedor.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 flex flex-col gap-2"
        >
          <div onClick={handleInputClick}>
            {isEditable ? (
              <div className="flex-col flex gap-2 w-full">
                <label className="font-semibold text-gray-600">
                  Total del saldo
                </label>
                <input
                  {...register("total")}
                  onBlur={() => setIsEditable(false)}
                  className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 capitalize"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold text-gray-700">
                  Total del saldo
                </label>
                <p className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 capitalize">
                  {formatearDinero(Number(total) || 0)}
                </p>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="bg-orange-500 py-2 px-6 text-white font-semibold text-sm rounded-full mt-2 hover:bg-indigo-500 transition-all hover:shadow-md"
            >
              Actualizar el proveedor
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
