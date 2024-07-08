import { Link } from "react-router-dom";
import { ModalCrearResumen } from "../../../components/aberturas_resumen/ModalCrearResumen";
import { useGastosContext } from "../../../context/GastosProvider";
import { formatearFecha } from "../../../helpers/formatearFecha";
import { useState } from "react";
import { ModalEditarResumen } from "../../../components/aberturas_resumen/ModalEditarResumen";
import { useObtenerId } from "../../../helpers/obtenerId";

export const AberturasResumen = () => {
  const { produccion } = useGastosContext();
  const { handleObtenerId, idObtenida } = useObtenerId();

  // // Obtener el primer día del mes actual
  // const today = new Date();

  // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  // const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // // Convertir las fechas en formato YYYY-MM-DD para los inputs tipo date
  // const fechaInicioPorDefecto = firstDayOfMonth.toISOString().split("T")[0];
  // const fechaFinPorDefecto = lastDayOfMonth.toISOString().split("T")[0];

  // Estado inicial de las fechas con el rango del mes actual
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  let filteredData = produccion; // Inicialmente, muestra todos los datos

  // Filtrar por rango de fechas si las fechas están definidas
  if (fechaInicio && fechaFin) {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);
    filteredData = produccion.filter((item) => {
      const fechaOrden = new Date(item.created_at);
      return fechaOrden >= fechaInicioObj && fechaOrden <= fechaFinObj;
    });
  }

  // Ordenar por fecha de mayor a menor
  filteredData.sort((a, b) => {
    const fechaA = new Date(a.created_at);
    const fechaB = new Date(b.created_at);
    return fechaB - fechaA; // Ordena de mayor a menor (fecha más reciente primero)
  });

  const totalStock = filteredData.reduce((accumulator, comprobante) => {
    return accumulator + Number(comprobante.total_stock);
  }, 0);

  const totalSalidas = filteredData.reduce((accumulator, comprobante) => {
    return accumulator + Number(comprobante.total_salidas);
  }, 0);

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="bg-white mb-4 h-10 flex">
        <Link
          to={"/"}
          className="bg-indigo-100 flex h-full px-4 justify-center items-center font-bold text-indigo-600"
        >
          Inicio
        </Link>{" "}
        <Link
          to={"/gastos"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Aberturas resumen
        </Link>
      </div>

      <div className="mx-5 my-5 px-10 py-5 bg-white">
        <p className="font-semibold text-orange-500 text-lg">
          Crear nuevos historiales de entregas, resumen, etc.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5 bg-white py-5 px-5 mx-5">
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Resumenes cargados hasta el momento.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {filteredData?.length}
            </p>
          </div>
        </article>
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Total aberturas entregadas
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {totalSalidas}
            </p>
          </div>
        </article>
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Total aberturas en stock
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {totalStock}
            </p>
          </div>
        </article>
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">Numero final</p>

            <p class="text-2xl font-bold text-indigo-600 max-md:text-base">
              {totalSalidas + totalStock}
            </p>
          </div>
        </article>
      </div>

      <div className="bg-white mx-5 py-5 px-5 flex gap-2">
        <button
          onClick={() =>
            document.getElementById("my_modal_crear_resumen").showModal()
          }
          type="button"
          className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
        >
          Crear nuevo resumen de aberturas
        </button>{" "}
      </div>

      <div className="bg-white mx-5 py-2 px-3 flex items-center font-bold gap-2 text-indigo-600">
        Filtrar por fecha
        <div className="flex gap-2 items-center font-bold text-indigo-500">
          <div className="bg-white py-2 px-3 text-sm font-bold w-full border border-indigo-500 cursor-pointer flex items-center rounded">
            <input
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              type="date"
              className="outline-none text-slate-600 w-full max-md:text-sm bg-white"
              placeholder="Fecha de inicio"
            />
          </div>

          <div className="bg-white py-2 px-3 text-sm font-bold w-full border border-indigo-500 cursor-pointer flex items-center rounded">
            <input
              value={fechaFin}
              onChange={handleFechaFinChange}
              type="date"
              className="outline-none text-slate-600 w-full max-md:text-sm bg-white"
              placeholder="Fecha fin"
            />
          </div>
        </div>
      </div>

      <div className=" bg-white mx-5 mb-20">
        <table className="table">
          <thead>
            <tr className="uppercase text-indigo-600">
              <th className="py-5">Referencia</th>
              <th className="py-5">Total en salidas</th>
              <th className="py-5">Total del stock</th>
              <th className="py-5">Numero final</th>
              <th className="py-5">Numero de la producción a llegar</th>
              <th className="py-5">Cumplimiento</th>
              <th className="py-5">Fecha</th>
              <th className="py-5">Acciones</th>
            </tr>
          </thead>
          <tbody className="font-bold uppercase text-xs">
            {filteredData?.map((p) => (
              <tr>
                {" "}
                <td className="">{p.id}</td>
                <td className="">{p.total_salidas}</td>
                <td className="">{p.total_stock}</td>
                <td className="text-indigo-600">
                  {Number(p.total_stock) + Number(p.total_salidas)}
                </td>
                <td className="text-orange-500">
                  {Number(p.numero_necesario)}
                </td>{" "}
                <td className="">
                  <div className="flex">
                    <p
                      className={`${
                        Number(p.total_stock) + Number(p.total_salidas) >=
                        Number(p.numero_necesario)
                          ? "bg-green-500 text-white"
                          : "bg-orange-500 text-white"
                      } py-1 px-4 text-center rounded`}
                    >
                      {Number(p.total_stock) + Number(p.total_salidas) >=
                      Number(p.numero_necesario)
                        ? "Cumplimos"
                        : "No cumplimos"}
                    </p>
                  </div>
                </td>
                <td className="">{formatearFecha(p.created_at)}</td>{" "}
                <td>
                  <div className="dropdown dropdown-top dropdown-end z-[999]">
                    <div
                      tabIndex={0}
                      role="button"
                      className="hover:bg-gray-300 py-2 px-2 transition-all text-gray-600 rounded-md"
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
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                        />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-none text-xs z-[1] gap-1 w-52 p-2 border border-indigo-400"
                    >
                      <button
                        onClick={() => {
                          handleObtenerId(p.id),
                            document
                              .getElementById("my_modal_editar_resumen")
                              .showModal();
                        }}
                        type="button"
                        className="bg-violet-500 py-2 px-4
                        text-white font-semibold rounded hover:bg-orange-500
                        transition-all text-center"
                      >
                        {" "}
                        Editar
                      </button>{" "}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalCrearResumen />
      <ModalEditarResumen idObtenida={idObtenida} />
    </section>
  );
};
