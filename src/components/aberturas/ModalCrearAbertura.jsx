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
    deleteAccesorio,
    deleteVidrio,
  } = useAberturasContext();

  const { precios } = usePreciosContext();

  const { accesorios } = useAccesoriosContext();

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
      const metroCuadrado = Number(vidrioSeleccionado[0]?.metrosCuadrados);
      const precioPorMetroCuadrado = Number(precioVidrio?.precio);

      // Calcular el total del vidrio
      const totalVidrio = metroCuadrado * precioPorMetroCuadrado;

      // Actualizar el estado con el resultado
      setTotalVidrio(totalVidrio);
    } else {
      // En caso de no encontrar el precio, establecer el resultado a null
      setTotalVidrio(0);
    }
  }, [precios, vidrioSeleccionado]);

  console.log(vidrioSeleccionado);
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
              <div className="w-3/5 max-md:w-full h-[70vh] overflow-y-scroll inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-3xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-base leading-6 text-gray-700 font-bold underline"
                >
                  CREAR NUEVA ABERTURA
                </Dialog.Title>
                <div className="max-md:border-none max-md:shadow-none max-md:px-2 max-md:py-1 border-[1px] border-slate-300 rounded-xl shadow-black/10 shadow flex flex-col gap-3 w-full py-10 px-10">
                  <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        className="font-semibold text-gray-700 max-md:text-sm"
                        htmlFor=""
                      >
                        DETALLE
                      </label>
                      <input
                        name="detalle"
                        onChange={handleChange}
                        value={detalle}
                        placeholder="DETALLE DE LA ABERTURA - PUERTA FRENTE ETC"
                        className="py-2 px-3 bg-white rounded-xl border-slate-300 max-md:text-xs border-[1px] shadow w-full outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label
                        className="font-semibold text-gray-700 max-md:text-sm"
                        htmlFor=""
                      >
                        COLOR
                      </label>
                      <select
                        name="color"
                        onChange={handleChange}
                        value={color}
                        className="py-3 px-3 bg-white rounded-xl border-slate-300 max-md:text-xs border-[1px] shadow w-full outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        <option value={"blanco"}>BLANCO</option>
                        <option value={"negro"}>NEGRO</option>
                        <option value={"natural"}>NATURAL</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label
                        className="font-semibold text-gray-700 max-md:text-sm"
                        htmlFor=""
                      >
                        CATEGORIA
                      </label>
                      <select
                        name="categoria"
                        onChange={handleChange}
                        value={categoria}
                        className="py-3 px-3 bg-white rounded-xl border-slate-300 max-md:text-xs border-[1px] shadow w-full outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        <option value={"herrero"}>HERRERO</option>
                        <option value={"modena"}>MODENA</option>
                        <option value={"modena a30"}>MODENA A30</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label
                        className="font-semibold text-gray-700 max-md:text-sm"
                        htmlFor=""
                      >
                        TIPO
                      </label>
                      <select
                        name="tipo"
                        onChange={handleChange}
                        value={tipo}
                        className="py-3 px-3 bg-white rounded-xl border-slate-300 max-md:text-xs border-[1px] shadow w-full outline-none uppercase"
                      >
                        <option>SELECCIONAR</option>
                        <option value={"puertas"}>PUERTAS</option>
                        <option value={"ventanas"}>VENTANAS</option>
                        <option value={"rajas de abrir"}>RAJAS DE ABRIR</option>
                        <option value={"paños fijo"}>PAÑOS FIJO</option>
                        <option value={"portones"}>PORTONES</option>
                        <option value={"puertas de abrir"}>
                          PUERTAS DE ABRIR
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
                          className="font-semibold text-gray-700 max-md:text-sm"
                          htmlFor=""
                        >
                          ANCHO
                        </label>
                        <input
                          name="ancho"
                          onChange={handleChange}
                          value={ancho}
                          placeholder="ANCHO"
                          className="py-2 px-3 bg-white rounded-xl border-slate-300 max-md:text-xs border-[1px] shadow w-full outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          className="font-semibold text-gray-700 max-md:text-sm"
                          htmlFor=""
                        >
                          ALTO
                        </label>
                        <input
                          name="alto"
                          onChange={handleChange}
                          value={alto}
                          placeholder="ALTO"
                          className="py-2 px-3 bg-white rounded-xl border-slate-300 max-md:text-xs border-[1px] shadow w-full outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => openModalProductos()}
                        className="text-base bg-indigo-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold max-md:text-sm"
                      >
                        SELECCIONAR PERFILES
                      </button>
                    </div>

                    <div className="overflow-x-scroll">
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3 max-md:text-xs">CODIGO</th>
                            <th className="p-3 max-md:text-xs">COLOR</th>
                            <th className="p-3 max-md:text-xs">DETALLE</th>
                            <th className="p-3 max-md:text-xs">CATEGORIA</th>
                            <th className="p-3 max-md:text-xs">CANTIDAD</th>
                            <th className="p-3 max-md:text-xs">TOTAL KG</th>
                            <th className="p-3 max-md:text-xs">ELIMINAR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productoSeleccionado?.map((p) => (
                            <tr key={p.id}>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.codigo}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.color}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.detalle}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {" "}
                                {p.categoria}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {" "}
                                {p.cantidad}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {" "}
                                {p.totalKG.toLocaleString("arg", {
                                  minimumFractionDigits: 2,
                                })}
                              </th>
                              <th
                                onClick={() => deleteProducto(p.id)}
                                className="border-[1px] border-red-300 p-3 max-md:text-xs text-sm uppercase cursor-pointer bg-red-100 text-red-600 font-semibold"
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
                        className="text-base bg-indigo-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold max-md:text-sm"
                      >
                        SELECCIONAR ACCESORIOS
                      </button>
                    </div>

                    <div className="overflow-x-scroll">
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3 max-md:text-xs">NUMERO</th>
                            <th className="p-3 max-md:text-xs">DETALLE</th>
                            <th className="p-3 max-md:text-xs">CATEGORIA</th>
                            <th className="p-3 max-md:text-xs">
                              TOTAL CANTIDADES
                            </th>
                            <th className="p-3 max-md:text-xs">Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {accesorioSeleccionado?.map((p) => (
                            <tr key={p.id}>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.id}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.detalle}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.categoria}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.cantidad}
                              </th>
                              <th
                                onClick={() => deleteAccesorio(p.id)}
                                className="border-[1px] border-red-300 p-3 max-md:text-xs text-sm uppercase cursor-pointer bg-red-100 text-red-600 font-semibold"
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
                        className="text-base bg-indigo-500 py-1 px-6 rounded-lg shadow shadow-black/20 text-white font-semibold max-md:text-sm"
                      >
                        SELECCIONAR VIDRIO POR METRO
                      </button>
                    </div>

                    <div className="overflow-x-scroll">
                      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 text-center">
                        <thead>
                          <tr>
                            <th className="p-3 max-md:text-xs">CODIGO</th>
                            <th className="p-3 max-md:text-xs">ANCHO</th>
                            <th className="p-3 max-md:text-xs">ALTO</th>
                            <th className="p-3 max-md:text-xs">CANTIDAD</th>
                            <th className="p-3 max-md:text-xs">CATEGORIA</th>
                            <th className="p-3 max-md:text-xs">Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vidrioSeleccionado.map((v) => (
                            <tr>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {v.id}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {Number(v.ancho).toLocaleString("es-ar", {
                                  minimumFractionDigits: 2,
                                })}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {Number(v.alto).toLocaleString("es-ar", {
                                  minimumFractionDigits: 2,
                                })}
                              </th>
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {v.cantidad}
                              </th>{" "}
                              <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                                {v.categoria}
                              </th>
                              <th
                                onClick={() => deleteVidrio(v.id)}
                                className="border-[1px] border-red-300 p-3 max-md:text-xs text-sm uppercase cursor-pointer bg-red-100 text-red-600 font-semibold"
                              >
                                ELIMINAR
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center max-md:text-sm">
                        <p className="font-semibold text-gray-800">
                          TOTAL EN ACCESORIOS:{" "}
                        </p>
                        <p className="bg-indigo-500 text-white rounded-lg shadow px-4 py-1 uppercase text-base font-semibold">
                          <p className="max-md:text-sm">
                            {sumaTotal.toLocaleString("es-ar", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <p className="font-semibold text-gray-800 max-md:text-sm">
                          TOTAL EN ALUMINIO:{" "}
                        </p>
                        <p className="font-semibold text-indigo-500 text-xl">
                          {Object.entries(costoTotalPorCategoria).map(
                            ([categoria, costo]) => (
                              <li
                                className="list-none bg-indigo-500 text-white rounded-lg shadow px-4 py-1 uppercase text-base max-md:text-sm"
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
                        <p className="font-semibold text-gray-800 max-md:text-sm">
                          TOTAL EN VIDRIO:{" "}
                        </p>
                        <p className="font-semibold text-indigo-500 text-xl max-md:text-sm">
                          <div>
                            {
                              <p className="bg-indigo-500 text-white rounded-lg shadow px-4 py-1 uppercase text-base font-semibold max-md:text-sm">
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
                        className="font-bold bg-indigo-500 text-white py-2 px-8 rounded-lg text-center shadow max-md:text-sm"
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
