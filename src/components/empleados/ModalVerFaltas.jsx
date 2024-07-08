import React, { useEffect, useState } from "react";
import client from "../../api/axios";

export const ModalVerFaltas = ({ idObtenida }) => {
  const [empleado, setEmpleado] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await client.get(`/empleados/${idObtenida}`);
      setEmpleado(res.data);
    };
    loadData();
  }, [idObtenida]);

  // Función para parsear las faltas y ordenar por fecha
  const parseAndSortFaltas = () => {
    if (!empleado || !empleado.faltas) return [];

    // Parsear el campo de faltas a un arreglo de objetos JSON
    const faltasArray = JSON.parse(empleado.faltas);

    // Ordenar faltas por fecha (más reciente primero)
    faltasArray.sort((a, b) => {
      return new Date(b.fecha_falta) - new Date(a.fecha_falta);
    });

    return faltasArray;
  };

  // Obtener las faltas ordenadas
  const faltasOrdenadas = parseAndSortFaltas();

  return (
    <dialog id="my_modal_ver_faltas" className="modal">
      <div className="modal-box max-w-4xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg text-indigo-500">
          Observar las falta del empleado{" "}
          <span className="capitalize text-black underline">
            {empleado.nombre} {empleado.apellido}
          </span>
        </h3>
        <p className="py-1">En esta sección podras ver las faltas.</p>

        {empleado && (
          <div>
            <table className=" table">
              <thead className="bg-gray-50">
                <tr>
                  <th className=" uppercase  font-medium">Fecha de falta</th>
                  <th className=" uppercase  font-medium">Justificada</th>
                  <th className=" uppercase  font-medium">Justificación</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Mapear y mostrar cada falta como una fila de la tabla */}
                {faltasOrdenadas.map((falta) => (
                  <tr key={falta.id}>
                    {" "}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(falta.fecha_falta).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {falta.justificada === "Si justificada" ? "Sí" : "No"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {falta.justificacion}
                    </td>{" "}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex">
                        <button
                          type="button"
                          className="font-semibold text-indigo-500 bg-indigo-50 py-1 px-4 rounded"
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </dialog>
  );
};
