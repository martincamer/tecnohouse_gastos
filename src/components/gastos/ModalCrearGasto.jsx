import React from "react";
import { ModalNuevoProveedor } from "../proveedores/ModalNuevoProveedor";

export const ModalCrearGasto = () => {
  return (
    <dialog id="my_modal_crear_gasto" className="modal">
      <div className="modal-box max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-indigo-500">Crear nuevo gasto</h3>
        <p className="py-1">En esta sección podras crear tu nuevo gasto.</p>

        <form className="mt-2">
          <div className="flex gap-2 items-end">
            <div className="flex-col flex gap-2 w-full">
              <label className="font-semibold text-gray-600">
                Proveedor/etc.
              </label>
              <select className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2">
                <option className="font-bold text-indigo-600">
                  Seleccionar
                </option>
              </select>
            </div>
            <div
              onClick={() =>
                document.getElementById("my_modal_nuevo_proveedor").showModal()
              }
              className="py-2 px-2 border border-indigo-400 cursor-pointer hover:bg-indigo-400 hover:text-white transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </form>
      </div>
      <ModalNuevoProveedor />
    </dialog>
  );
};
