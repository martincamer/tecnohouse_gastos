import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useGastosContext } from "../../context/GastosProvider";
import { crearGastoNuevo } from "../../api/gastos";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useAberturasContext } from "../../context/AberturasProvider";
import { ModalSeleccionarPerfil } from "./ModalSeleccionarPerfil";
import { ModalSeleccionarAccesorio } from "./../accesorios/ModalSeleccionarPerfil";
import { usePreciosContext } from "../../context/PreciosProvider";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { ModalSeleccionarVidrio } from "../vidrios/ModalSeleccionarVidrio";

export const ModalCrearNuevaAbertura = () => {
  const {
    closeModal,
    isOpen,
    isOpenProductos,
    closeModalProductos,
    openModalProductos,
    productoSeleccionado,
    closeModalAccesorios,
    openModalAccesorios,
    isOpenAccesorios,
    closeModalVidrios,
    openModalVidrios,
    isOpenVidrios,
    accesorioSeleccionado,
    vidrioSeleccionado,
    handleSubmitAbertura,
    handleChange,
    detalle,
    color,
    categoria,
    tipo,
    ancho,
    alto,
    deleteProducto,
  } = useAberturasContext();

  const { precios } = usePreciosContext();

  const { accesorios } = useAccesoriosContext();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const onSubmit = handleSubmit(async (data) => {
  //   const res = await crearGastoNuevo(data);

  //   setTimeout(() => {
  //     location.reload();
  //   }, 1500);

  //   toast.success("Gasto creado correctamente!", {
  //     position: "top-right",
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // });

  // Crear un objeto para almacenar la suma total de KG por categoría
  const sumaTotalPorCategoria = {};

  // Calcular la suma total de KG por categoría
  productoSeleccionado?.forEach((producto) => {
    const categoria = producto.categoria.toLowerCase();
    sumaTotalPorCategoria[categoria] =
      (sumaTotalPorCategoria[categoria] || 0) + producto.totalKG;
  });

  // Calcular el costo total por categoría multiplicando la suma total de KG por el precio correspondiente
  const costoTotalPorCategoria = {};
  precios?.forEach((precio) => {
    const categoria = precio.categoria.toLowerCase();
    if (sumaTotalPorCategoria[categoria]) {
      costoTotalPorCategoria[categoria] =
        sumaTotalPorCategoria[categoria] * parseFloat(precio.precio);
    }
  });

  // Inicializar una variable para almacenar la suma total
  let sumaTotal = 0;

  // Calcular la suma total por detalle, categoría y cantidad
  accesorioSeleccionado.forEach((accesorioSeleccionado) => {
    const { detalle, categoria, cantidad } = accesorioSeleccionado;
    const precioUnidad = accesorios.find(
      (accesorio) =>
        accesorio.detalle === detalle && accesorio.categoria === categoria
    )?.precio_unidad;
    const total = precioUnidad
      ? parseFloat(precioUnidad) * parseInt(cantidad, 10)
      : 0;

    // Acumular la suma total
    sumaTotal += total;
  });

  // Encontrar el precio del vidrio seleccionado
  const [totalVidrio, setTotalVidrio] = useState(null);

  useEffect(() => {
    // Encontrar el precio del vidrio seleccionado
    const precioVidrio = precios.find(
      (precio) => precio.categoria === vidrioSeleccionado[0]?.categoria
    );

    if (precioVidrio) {
      // Convertir las dimensiones del vidrio y la cantidad a números
      const alto = Number(vidrioSeleccionado[0]?.alto);
      const ancho = Number(vidrioSeleccionado[0]?.ancho);
      const cantidad = Number(vidrioSeleccionado[0]?.cantidad);

      const precioPorMetroCuadrado = Number(precioVidrio?.precio);

      // Calcular el total del vidrio
      const totalVidrio =
        Number(alto * ancho) * Number(cantidad) * Number(precioVidrio?.precio);

      // Actualizar el estado con el resultado
      setTotalVidrio(totalVidrio);
    } else {
      // En caso de no encontrar el precio, establecer el resultado a null
      setTotalVidrio(0);
    }
  }, [precios, vidrioSeleccionado]);

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
              <div className="w-3/5 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-gray-700 font-bold"
                >
                  CREAR NUEVA ABERTURA
                </Dialog.Title>
                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full py-10 px-10">
                  <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        DETALLE
                      </label>
                      <input
                        name="detalle"
                        onChange={handleChange}
                        value={detalle}
                        placeholder="DETALLE DE LA ABERTURA - PUERTA FRENTE ETC"
                        className="py-2 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        COLOR
                      </label>
                      <select
                        name="color"
                        onChange={handleChange}
                        value={color}
                        className="py-3 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        <option value={"blanco"}>BLANCO</option>
                        <option value={"negro"}>NEGRO</option>
                        <option value={"natural"}>NATURAL</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        CATEGORIA
                      </label>
                      <select
                        name="categoria"
                        onChange={handleChange}
                        value={categoria}
                        className="py-3 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        <option value={"herrero"}>HERRERO</option>
                        <option value={"modena"}>MODENA</option>
                        <option value={"modena a30"}>MODENA A30</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label className="font-semibold text-gray-700" htmlFor="">
                        TIPO
                      </label>
                      <select
                        name="tipo"
                        onChange={handleChange}
                        value={tipo}
                        className="py-3 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        <option value={"puerta"}>PUERTA</option>
                        <option value={"ventana"}>VENTANA</option>
                        <option value={"raja de abrir"}>RAJA DE ABRIR</option>
                        <option value={"paño fijo"}>PAÑO FIJO</option>
                        <option value={"portones"}>PORTONES</option>
                        <option value={"puerta de abrir"}>
                          PUERTA DE ABRIR
                        </option>
                        <option value={"celosias de abrir"}>
                          CELOSIAS DE ABRIR
                        </option>{" "}
                        <option value={"celosias corredizas"}>
                          CELOSIAS CORREDIZAS
                        </option>
                      </select>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                      <div className="flex flex-col gap-2">
                        <label
                          className="font-semibold text-gray-700"
                          htmlFor=""
                        >
                          ANCHO
                        </label>
                        <input
                          name="ancho"
                          onChange={handleChange}
                          value={ancho}
                          placeholder="ANCHO"
                          className="py-2 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          className="font-semibold text-gray-700"
                          htmlFor=""
                        >
                          ALTO
                        </label>
                        <input
                          name="alto"
                          onChange={handleChange}
                          value={alto}
                          placeholder="ALTO"
                          className="py-2 px-3 bg-gray-100 rounded-lg shadow shadow-black/20 w-full outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => openModalProductos()}
                        className="text-base bg-teal-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold"
                      >
                        SELECCIONAR PERFILES
                      </button>
                    </div>

                    <div>
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3">CODIGO</th>
                            <th className="p-3">COLOR</th>
                            <th className="p-3">DETALLE</th>
                            <th className="p-3">CATEGORIA</th>
                            <th className="p-3">CANTIDAD</th>
                            <th className="p-3">TOTAL KG</th>
                            <th className="p-3">ELIMINAR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productoSeleccionado?.map((p) => (
                            <tr key={p.id}>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {p.codigo}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {p.color}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {p.detalle}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {" "}
                                {p.categoria}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {" "}
                                {p.cantidad}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {" "}
                                {p.totalKG.toLocaleString("arg", {
                                  minimumFractionDigits: 2,
                                })}
                              </th>
                              <th
                                onClick={() => deleteProducto(p.id)}
                                className="border-[1px] border-red-300 p-3 text-sm uppercase cursor-pointer bg-red-100 text-red-600 font-semibold"
                              >
                                ELIMINAR
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <button
                        onClick={openModalAccesorios}
                        type="button"
                        className="text-base bg-teal-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold"
                      >
                        SELECCIONAR ACCESORIOS
                      </button>
                    </div>

                    <div>
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3">NUMERO</th>
                            <th className="p-3">DETALLE</th>
                            <th className="p-3">CATEGORIA</th>
                            <th className="p-3">TOTAL CANTIDADES</th>
                            <th className="p-3">Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accesorioSeleccionado?.map((p) => (
                            <tr key={p.id}>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {p.id}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {p.detalle}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {p.categoria}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {p.cantidad}
                              </th>
                              <th
                                onClick={() => deleteProducto(p.id)}
                                className="border-[1px] border-red-300 p-3 text-sm uppercase cursor-pointer bg-red-100 text-red-600 font-semibold"
                              >
                                ELIMINAR
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => openModalVidrios()}
                        className="text-base bg-teal-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold"
                      >
                        SELECCIONAR VIDRIO POR METRO
                      </button>
                    </div>

                    <div>
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3">CODIGO</th>
                            <th className="p-3">ALTO</th>
                            <th className="p-3">ANCHO</th>
                            <th className="p-3">CANTIDAD</th>
                            <th className="p-3">CATEGORIA</th>
                            <th className="p-3">Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vidrioSeleccionado.map((v) => (
                            <tr>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {v.id}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {v.alto}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {Number(v.ancho).toLocaleString("es-ar", {
                                  minimumFractionDigits: 2,
                                })}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {v.cantidad}
                              </th>{" "}
                              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                                {v.categoria}
                              </th>
                              <th
                                onClick={() => deleteProducto(p.id)}
                                className="border-[1px] border-red-300 p-3 text-sm uppercase cursor-pointer bg-red-100 text-red-600 font-semibold"
                              >
                                ELIMINAR
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-gray-800">
                          TOTAL EN ACCESORIOS:{" "}
                        </p>
                        <p className="bg-teal-500 text-white rounded-lg shadow px-4 py-1 uppercase text-base font-semibold">
                          <p>
                            {sumaTotal.toLocaleString("es-ar", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-gray-800">
                          TOTAL EN ALUMINIO:{" "}
                        </p>
                        <p className="font-semibold text-teal-500 text-xl">
                          {Object.entries(costoTotalPorCategoria).map(
                            ([categoria, costo]) => (
                              <li
                                className="list-none bg-teal-500 text-white rounded-lg shadow px-4 py-1 uppercase text-base"
                                key={categoria}
                              >
                                {categoria}:
                                {costo.toLocaleString("es-ar", {
                                  style: "currency",
                                  currency: "ARS",
                                  minimumFractionDigits: 2,
                                })}
                              </li>
                            )
                          )}
                        </p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-gray-800">
                          TOTAL EN VIDRIO:{" "}
                        </p>
                        <p className="font-semibold text-teal-500 text-xl">
                          <div>
                            {
                              <p className="bg-teal-500 text-white rounded-lg shadow px-4 py-1 uppercase text-base font-semibold">
                                {totalVidrio?.toLocaleString("es-ar", {
                                  style: "currency",
                                  currency: "ARS",
                                  minimumFractionDigits: 2,
                                })}
                              </p>
                            }
                          </div>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <button
                        onClick={() => handleSubmitAbertura()}
                        type="button"
                        className="font-bold bg-teal-500 text-white text-steal-950 py-2 px-12 rounded-full text-center shadow"
                      >
                        CREAR NUEVA ABERTURA
                      </button>
                    </div>
                  </form>
                </div>
                <ModalSeleccionarPerfil
                  closeModalProductos={closeModalProductos}
                  isOpenProductos={isOpenProductos}
                />

                <ModalSeleccionarAccesorio
                  closeModalProductos={closeModalAccesorios}
                  isOpenProductos={isOpenAccesorios}
                />

                <ModalSeleccionarVidrio
                  closeModalProductos={closeModalVidrios}
                  isOpenProductos={isOpenVidrios}
                />
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer"
                  onClick={() => closeModal()}
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
