import { Link } from "react-router-dom";
import { useState } from "react";
import client from "../../api/axios";
import { toast } from "react-toastify";
import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const TablePresupuestos = ({ resultadosFiltrados }) => {
  const { datosPresupuestos, setDatosPrepuestos } = usePresupuestoContext();

  const itemsPerPage = 15; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  // Supongamos que resultadosFiltrados es tu arreglo de resultados filtrados

  // Ordenar resultados por fecha de creación (created_at) de manera descendente
  const resultadosOrdenados = resultadosFiltrados.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = resultadosOrdenados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(resultadosOrdenados.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleEliminar = async (id) => {
    const res = await client.delete(`/presupuestos/${id}`);

    setDatosPrepuestos((prevPerfiles) =>
      prevPerfiles.filter((perfil) => perfil.id !== id)
    );

    toast.error("Presupuesto eliminado correctamente, no podras recuperarlo!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        padding: "10px",
        borderRadius: "15px",
        boxShadow: "none",
        border: "1px solid rgb(203 213 225)",
      },
    });
  };

  return (
    <div className="pb-20 mx-5">
      <div className="bg-white">
        <table className="table">
          <thead>
            <tr className="">
              <th className="py-5 text-indigo-500 uppercase">Cliente</th>
              <th className="py-5 text-indigo-500 uppercase">Localidad</th>
              <th className="py-5 text-indigo-500 uppercase">fecha</th>
              <th className="py-5 text-indigo-500 uppercase">Cantidades</th>
              <th className="py-5 text-indigo-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.length > 0 ? (
              currentResults?.map((g) => (
                <tr className="cursor-pointer" key={g.id}>
                  <th>{g?.cliente}</th>
                  <th>{g?.localidad}</th>
                  <th>{new Date(g.created_at).toLocaleDateString("arg")}</th>
                  <th>{g?.totalcantidad}</th>
                  <th>
                    {Number(g?.total).toLocaleString("es-ar", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    })}
                  </th>
                  <th>
                    <div className="dropdown dropdown-bottom dropdown-end">
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
                        className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-none text-xs w-52 border capitalize"
                      >
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              handleEliminar(g?.id);
                            }}
                          >
                            Eliminar presupuesto
                          </button>
                        </li>
                        <li>
                          <Link to={`/presupuesto/${g.id}`}>
                            Ver presupuesto
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </th>
                  {/* <th
                    onClick={() => {
                      handleEliminar(g?.id);
                    }}
                    className="px-3 max-md:text-xs  font-medium text-sm uppercase"
                  >
                    <p className="border-red-200 border-[1px] rounded-xl shadow py-2 max-md:px-2 bg-red-100 text-center text-red-800 cursor-pointer">
                      ELIMINAR
                    </p>
                  </th>
                  <th
                    onClick={() => obtenerParamsId(g.id)}
                    className="px-3 max-md:text-xs "
                  >
                    <Link
                      className="bg-indigo-500 rounded-xl shadow px-6 py-2  text-center text-white cursor-pointer"
                      to={`/presupuesto/${g.id}`}
                    >
                      Ver
                    </Link>
                  </th> */}
                </tr>
              ))
            ) : (
              <div className="w-full py-5 flex justify-center items-center">
                <span className="font-bold text-sm py-5">
                  No hay nada creado, genera un nuevo presupuesto...
                </span>
              </div>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center w-full justify-center mt-4 mb-4 gap-4 max-md:gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`mx-1 px-3 py-1 rounded-xl ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-white border-slate-300 border-[1px] shadow shadow-black/20 max-md:text-xs"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
