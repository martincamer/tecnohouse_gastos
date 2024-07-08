import { useState } from "react";
import { Link } from "react-router-dom";
import { useEmpleadosContext } from "../../../context/EmpleadosProvider";
import { ModalNuevoEmpleado } from "../../../components/empleados/ModalNuevoEmpleado";
import { formatearFechaDos } from "../../../helpers/formatearFecha";
import { ModalActualizarEstado } from "../../../components/empleados/ModalActualizarEstado";
import { useObtenerId } from "../../../helpers/obtenerId";
import { ModalCargarFaltas } from "../../../components/empleados/ModalCargarFaltas";
import { ModalVerFaltas } from "../../../components/empleados/ModalVerFaltas";

export const Empleados = () => {
  const { empleados } = useEmpleadosContext();

  const { idObtenida, handleObtenerId } = useObtenerId();

  const calculateAntiquity = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    return { years, months };
  };

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
          to={"/empleados"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Empleados
        </Link>
      </div>

      <div className="mx-5 my-5 px-10 py-5 bg-white">
        <p className="font-semibold text-orange-500 text-lg">
          Crear nuevos empleados,faltas,plantillas, etc.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5 bg-white py-5 px-5 mx-5">
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Empleados cargados hasta el momento.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {empleados.length}
            </p>
          </div>
        </article>
      </div>

      <div className="bg-white mx-5 py-5 px-5 flex gap-2">
        <button
          onClick={() =>
            document.getElementById("my_modal_nuevo_empleado").showModal()
          }
          type="button"
          className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
        >
          Crear nuevo empleado
        </button>{" "}
      </div>

      <div className=" bg-white mx-5 mb-20">
        <table className="table">
          <thead>
            <tr className="uppercase text-indigo-600">
              <th className="py-5">Referencia</th>
              <th className="py-5">Nombre y apellido</th>
              <th className="py-5">Fecha de ingreso</th>
              <th className="py-5">Antiguedad</th>
              <th className="py-5">Estado</th>
              <th className="py-5">Acciones</th>
            </tr>
          </thead>
          <tbody className="font-bold uppercase text-xs">
            {empleados?.map((p) => {
              const { years, months } = calculateAntiquity(p?.fecha_ingreso);
              return (
                <tr>
                  {" "}
                  <td className="">{p.id}</td>
                  <td className="">
                    {p.nombre} {p.apellido}
                  </td>
                  <td className="">{formatearFechaDos(p.fecha_ingreso)}</td>
                  <td className="">
                    Años {years}, Meses {months}
                  </td>
                  <td className="">
                    <div className="flex">
                      <p
                        className={`${
                          (p.estado === "trabajando" && "bg-green-500") ||
                          (p.estado === "falto" && "bg-orange-500") ||
                          (p.estado === "enfermo" && "bg-rose-500") ||
                          (p.estado === "reposo" && "bg-indigo-500")
                        } text-white py-1 px-4 rounded`}
                      >
                        {p.estado}
                      </p>
                    </div>
                  </td>
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
                                .getElementById("my_modal_estado")
                                .showModal();
                          }}
                          type="button"
                          className="bg-violet-500 py-2 px-4
                        text-white font-semibold rounded hover:bg-orange-500
                        transition-all text-center"
                        >
                          {" "}
                          Editar estado
                        </button>
                        <button
                          onClick={() => {
                            document
                              .getElementById("my_modal_faltas")
                              .showModal();
                          }}
                          type="button"
                          className="bg-rose-500 py-2 px-4
                        text-white font-semibold rounded hover:bg-orange-500
                        transition-all text-center"
                        >
                          Cargar faltas
                        </button>
                        <button
                          onClick={() => {
                            handleObtenerId(p.id),
                              document
                                .getElementById("my_modal_ver_faltas")
                                .showModal();
                          }}
                          type="button"
                          className="bg-green-500 py-2 px-4
                        text-white font-semibold rounded hover:bg-green-400
                        transition-all text-center"
                        >
                          Ver faltas
                        </button>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalNuevoEmpleado />
      <ModalActualizarEstado idObtenida={idObtenida} />
      <ModalCargarFaltas />
      <ModalVerFaltas idObtenida={idObtenida} />
    </section>
  );
};
