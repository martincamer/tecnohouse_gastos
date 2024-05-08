import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useAberturasContext } from "../../context/AberturasProvider";
import { ModalSeleccionarPerfil } from "./ModalSeleccionarPerfil";
import { ModalSeleccionarAccesorio } from "../accesorios/ModalSeleccionarPerfil";
import { usePreciosContext } from "../../context/PreciosProvider";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { ModalSeleccionarVidrio } from "../vidrios/ModalSeleccionarVidrio";
import client from "../../api/axios";

export const ModalEditarAbertura = ({ isOpen, closeModal, obtenerId }) => {
  const {
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
    handleSubmitEditarAbertura,
    handleChange,
    detalle,
    color,
    categoria,
    tipo,
    ancho,
    alto,
    setDetalle,
    setColor,
    setTipo,
    setAncho,
    setAlto,
    setCategoria,
    deleteProducto,
    deleteAccesorio,
    deleteVidrio,
    setVidrioSeleccionado,
    setProductoSeleccionado,
    setAccesorioSeleccionado,
  } = useAberturasContext();

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get(`/aberturas/${obtenerId}`);
      setAccesorioSeleccionado(res.data.datos.accesoriosSelect);
      setProductoSeleccionado(res.data.datos.perfilesSelect);
      setVidrioSeleccionado(res.data.datos.vidrioSelect);

      setDetalle(res.data.detalle);
      setColor(res.data.color);
      setCategoria(res.data.categoria);
      setTipo(res.data.tipo);
      setAncho(res.data.ancho);
      setAlto(res.data.alto);

      // setVidrioSeleccionado(res.data);
    };

    loadData();
  }, [obtenerId]);

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

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto h-full"
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
            <div className="fixed inset-0 bg-black bg-opacity-10" />
          </Transition.Child>

          <div className="h-full px-4 text-center w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-white h-full max-h-full" />
            </Transition.Child>

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
              <div className="w-full h-full inline-block py-2 px-2 text-left align-middle transition-all transform bg-white shadow-3xl space-y-6">
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeModal}
                    className="bg-red-100 text-red-700 py-2 px-2 rounded-xl cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </p>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-sm leading-6 text-gray-700 font-bold underline uppercase"
                >
                  CARGAR NUEVA ABERTURA PARA EL SISTEMA
                </Dialog.Title>
                <div>
                  <form className="flex flex-col gap-6 text-sm">
                    <div className="grid grid-cols-3 gap-5">
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
                          className="py-2 px-3 bg-white rounded-xl border-slate-300 max-md:text-xs border-[1px] shadow w-full outline-none uppercase"
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
                          <option value={"rajas de abrir"}>
                            RAJAS DE ABRIR
                          </option>
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
                            className="py-2 px-3 bg-white rounded-xl border-slate-300 max-md:text-xs border-[1px] shadow w-full outline-none uppercase"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => openModalProductos()}
                        className="text-sm bg-indigo-100 py-2 px-6 rounded-xl text-indigo-600 max-md:text-sm flex gap-2 items-center uppercase"
                      >
                        SELECCIONAR PERFILES
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="border-slate-300 border-[1px] rounded-2xl  h-[30vh] overflow-y-scroll scroll-bar">
                      <table className="min-w-full w-full uppercase divide-y-2 divide-slate-300">
                        <thead>
                          <tr>
                            <th className="py-3 px-3 max-md:text-xs">CODIGO</th>
                            <th className="py-3 px-3 max-md:text-xs">COLOR</th>
                            <th className="py-3 px-3 max-md:text-xs">
                              DETALLE
                            </th>
                            <th className="py-3 px-3 max-md:text-xs">
                              CATEGORIA
                            </th>
                            <th className="py-3 px-3 max-md:text-xs">
                              CANTIDAD
                            </th>
                            <th className="py-3 px-3 max-md:text-xs">
                              TOTAL KG
                            </th>
                            <th className="py-3 px-3 max-md:text-xs">
                              ELIMINAR
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-[1px] divide-slate-300">
                          {productoSeleccionado?.map((p) => (
                            <tr key={p.id}>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.codigo}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.color}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.detalle}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {" "}
                                {p.categoria}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {" "}
                                {p.cantidad}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {" "}
                                {p.totalKG.toLocaleString("arg", {
                                  minimumFractionDigits: 2,
                                })}
                              </th>
                              <th className="p-3 max-md:text-xs text-sm uppercase cursor-pointer">
                                <button
                                  onClick={() => deleteProducto(p.id)}
                                  type="button"
                                  className="bg-red-100 text-red-700 text-sm font-normal px-4 py-2 rounded-xl"
                                >
                                  ELIMINAR
                                </button>{" "}
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
                        className="text-sm bg-indigo-100 py-2 px-6 rounded-xl text-indigo-600 max-md:text-sm flex gap-2 items-center"
                      >
                        SELECCIONAR ACCESORIOS
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="border-slate-300 border-[1px] rounded-2xl  h-[30vh] overflow-y-scroll scroll-bar">
                      <table className="min-w-full w-full uppercase divide-y-2 divide-slate-300">
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
                        <tbody className="divide-y-[1px] divide-slate-300">
                          {accesorioSeleccionado?.map((p) => (
                            <tr key={p.id}>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.id}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.detalle}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.categoria}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {p.cantidad}
                              </th>
                              <th className="p-3 max-md:text-xs text-sm uppercase cursor-pointer">
                                <button
                                  onClick={() => deleteAccesorio(p.id)}
                                  type="button"
                                  className="bg-red-100 text-red-700 text-sm font-normal px-4 py-2 rounded-xl"
                                >
                                  ELIMINAR
                                </button>{" "}
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
                        className="text-sm bg-indigo-100 py-2 px-6 rounded-xl text-indigo-600 max-md:text-sm flex gap-2 items-center"
                      >
                        SELECCIONAR VIDRIO POR METRO
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="border-slate-300 border-[1px] rounded-2xl ">
                      <table className="min-w-full w-full uppercase divide-y-2 divide-slate-300">
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
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {v.id}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {Number(v.ancho).toLocaleString("es-ar", {
                                  minimumFractionDigits: 2,
                                })}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {Number(v.alto).toLocaleString("es-ar", {
                                  minimumFractionDigits: 2,
                                })}
                              </th>
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {v.cantidad}
                              </th>{" "}
                              <th className="p-3 max-md:text-xs font-medium text-sm uppercase">
                                {v.categoria}
                              </th>
                              <th className="p-3 max-md:text-xs text-sm uppercase cursor-pointer">
                                <button
                                  type="button"
                                  onClick={() => deleteVidrio(v.id)}
                                  className="bg-red-100 text-red-700 text-sm font-normal px-4 py-2 rounded-xl"
                                >
                                  ELIMINAR
                                </button>{" "}
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

                    <div className="flex items-start mb-5">
                      <button
                        onClick={() =>
                          handleSubmitEditarAbertura(obtenerId, closeModal)
                        }
                        type="button"
                        className="font-bold bg-indigo-500 text-white py-3 px-8 rounded-xl text-center shadow max-md:text-sm flex gap-2 items-center"
                      >
                        EDITAR ABERTURA
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
