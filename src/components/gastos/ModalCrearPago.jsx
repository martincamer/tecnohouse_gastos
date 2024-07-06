import React, { useState } from "react";
import { ModalNuevoProveedor } from "../proveedores/ModalNuevoProveedor";
import { useGastosContext } from "../../context/GastosProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { formatearDinero } from "../../helpers/formatearDinero";
import client from "../../api/axios";
import axios from "axios";

export const ModalCrearPago = () => {
  const { proveedores } = useGastosContext();

  const { register, handleSubmit, reset, watch } = useForm();
  const { setProveedores } = useGastosContext();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const uploadFile = async (file) => {
    if (!file) {
      return null;
    }

    const data = new FormData();
    data.append("file", file);

    // Set the upload preset based on the file type
    const uploadPreset = file.type.startsWith("image/")
      ? "imagenes"
      : "documentos";
    data.append("upload_preset", uploadPreset);

    try {
      const api = `https://api.cloudinary.com/v1_1/doguyttkd/${
        file.type.startsWith("image/") ? "image" : "raw"
      }/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const total = watch("total");
  const proveedor = watch("proveedor");

  const onSubmit = async (formData) => {
    try {
      const archivo_imagen = await uploadFile(uploadedFile);

      // Creamos el objeto del producto con todos los datos y la URL de la imagen
      const proveedorData = {
        comprobante: {
          total: total,
          proveedor: proveedor,
          comprobante: archivo_imagen,
        },
        ...formData,
      };

      const res = await client.post(
        `/proveedores/${proveedor}/comprobantes-pago`,
        proveedorData
      );

      setProveedores(res.data.todosLosProveedores);

      toast.success("Pago cargado correctamente!", {
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

      document.getElementById("my_modal_crear_pago").close();

      setUploadedFile(null);
      reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setDragging(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const [isEditable, setIsEditable] = useState(false);

  const handleInputClick = () => {
    setIsEditable(true);
  };

  return (
    <dialog id="my_modal_crear_pago" className="modal">
      <div className="modal-box max-w-xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-indigo-500">
          Crear nuevo gasto/orden
        </h3>
        <p className="py-1">
          En esta sección podras crear tu nuevo gasto/orden.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
          <div className="flex gap-2 items-end">
            <div className="flex-col flex gap-2 w-full">
              <label className="font-semibold text-gray-600">
                Proveedor/etc.
              </label>
              <select
                {...register("proveedor")}
                className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 capitalize"
              >
                <option className="font-bold text-indigo-600">
                  Seleccionar
                </option>
                {proveedores.map((p) => (
                  <option
                    className="font-semibold"
                    key={p.id}
                    value={p.proveedor}
                  >
                    {p.proveedor}
                  </option>
                ))}
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

          <div className="my-3" onClick={handleInputClick}>
            {isEditable ? (
              <div className="flex-col flex gap-2 w-full">
                <label className="font-semibold text-gray-600">
                  Total del pago
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
                  Total del pago
                </label>
                <p className="border border-indigo-400 py-2 outline-none text-sm font-semibold px-2 capitalize">
                  {formatearDinero(Number(total) || 0)}
                </p>
              </div>
            )}
          </div>

          <FileDrop
            dragging={dragging}
            handleDragLeave={handleDragLeave}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
            handleRemoveFile={handleRemoveFile}
            setDragging={setDragging}
            setUploadedFile={setUploadedFile}
            uploadedFile={uploadedFile}
          />

          <div className="mt-5">
            <button
              type="submit"
              className="bg-orange-500 py-2 px-6 text-white font-semibold text-sm rounded-full hover:bg-indigo-500 transition-all hover:shadow-md"
            >
              Guardar el pago/comprobante
            </button>
          </div>
        </form>
      </div>
      <ModalNuevoProveedor />
    </dialog>
  );
};

export const FileDrop = ({
  uploadedFile,
  dragging,
  handleFileChange,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleRemoveFile,
}) => {
  return (
    <div className="bg-violet-50 py-5 px-5 mt-3 border border-indigo-400 w-full">
      <div className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
            <label
              htmlFor="file-upload"
              className="bg-violet-500 text-white px-4 py-2 rounded cursor-pointer text-sm"
            >
              Cargar imagen o archivo
            </label>
          </div>
        </div>
        <div
          className={`border-2 border-dashed border-gray-300 p-6 text-center ${
            dragging ? "bg-gray-100" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            <div className="relative">
              <p className="text-gray-600">
                Archivo cargado: {uploadedFile.name}
              </p>
              {uploadedFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Vista previa"
                  className="mt-4 mx-auto rounded w-1/2"
                />
              ) : (
                <embed
                  src={URL.createObjectURL(uploadedFile)}
                  type="application/pdf"
                  className="mt-4 mx-auto w-full h-64"
                  alt="Vista previa PDF"
                />
              )}
              <button
                onClick={handleRemoveFile}
                className="absolute top-[-20px] right-[-19px] text-red-600 bg-red-100 rounded-full py-2 px-2 hover:text-red-700"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div>
              <div className="text-gray-500">
                Arrastra y suelta o{" "}
                <span className="text-indigo-600 cursor-pointer">
                  carga tu imagen o archivo aquí
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Máximo disponible para subir <b>una</b> imagen o archivo.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
