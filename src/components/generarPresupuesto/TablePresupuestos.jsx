import { Link } from "react-router-dom";
import { useState } from "react";
import client from "../../api/axios";
import { toast } from "react-toastify";

export const TablePresupuestos = ({ resultadosFiltrados }) => {
  // const { datosPresupuestos } = usePresupuestoContext();

  const itemsPerPage = 8; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = resultadosFiltrados?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(resultadosFiltrados?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEliminar = async (id) => {
    const res = await client.delete(`/presupuestos/${id}`);

    toast.error("¡Presupuesto eliminado correctamente!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      location.reload();
    }, 1500);
    console.log(res);
  };

  return (
    <div>
      <div className="md:hidden max-md:flex  flex-col gap-4">
        {currentResults?.map((g, index) => (
          <div
            className="rounded-xl bg-white shadow border-[1px] border-slate-300 py-2 px-3"
            key={index}
          >
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-2">
                <p className="text-slate-700 text-xs font-semibold uppercase">
                  {g.cliente}
                </p>

                <p className="text-slate-700 text-xs uppercase">
                  {g.localidad}
                </p>
                <p className="text-slate-700 text-xs uppercase">
                  {new Date(g.created_at).toLocaleDateString("arg")}
                </p>
                <p className="text-slate-700 text-xs uppercase">
                  {g?.totalcantidad}
                </p>
                <p className="text-green-600 font-bold text-xs uppercase">
                  {Number(g?.total).toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-4 items-center justify-center">
                <span
                  onClick={() => {
                    handleEliminar(g?.id);
                  }}
                >
                  <span className="border-red-300 border-[1px] rounded-xl shadow py-2 px-4 text-xs bg-red-100 text-center text-red-800 cursor-pointer">
                    ELIMINAR
                  </span>
                </span>

                <Link
                  to={`/presupuesto/${g.id}`}
                  onClick={() => obtenerParamsId(g.id)}
                  className="rounded-xl uppercase shadow py-2 px-6 text-xs bg-indigo-500 text-center text-white cursor-pointer"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>{" "}
      <div className="overflow-x-scroll border-[1px] border-slate-30 table-auto w-full rounded-xl uppercase shadow md:block max-md:hidden">
        <table className=" shadow-black/20 w-full rounded-xl">
          <thead>
            <tr className="text-center">
              <th className="p-3 max-md:text-xs border-b-[1px]">Cliente</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Localidad</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">fecha</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Cantidades</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Total</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Eliminar</th>
              <th className="p-3 max-md:text-xs border-b-[1px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-3">
            {currentResults.length > 0 ? (
              currentResults?.map((g) => (
                <tr
                  className="cursor-pointer hover:bg-slate-100 transiton-all ease-in-out duration-100 text-center"
                  key={g.id}
                >
                  <th className="border-b-[1px] py-5 max-md:text-xs  border-gray-300 px-3 font-medium text-sm uppercase">
                    {g?.cliente}
                  </th>
                  <th className="border-b-[1px] py-5 max-md:text-xs  border-gray-300 px-3 font-medium text-sm uppercase">
                    {g?.localidad}
                  </th>
                  <th className="border-b-[1px] py-5 max-md:text-xs  border-gray-300 px-3 font-medium text-sm uppercase">
                    {new Date(g.created_at).toLocaleDateString("arg")}
                  </th>
                  <th className="border-b-[1px] py-5 max-md:text-xs  border-gray-300 px-3 text-indigo-700 text-sm uppercase font-semibold">
                    {g?.totalcantidad}
                  </th>
                  <th className="border-b-[1px] py-5 max-md:text-xs  border-gray-300 px-3 text-indigo-700 text-sm uppercase font-semibold">
                    {Number(g?.total).toLocaleString("es-ar", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    })}
                  </th>
                  <th
                    onClick={() => {
                      handleEliminar(g?.id);
                    }}
                    className="border-b-[1px] border-gray-300 px-3 max-md:text-xs  font-medium text-sm uppercase"
                  >
                    <p className="border-red-200 border-[1px] rounded-xl shadow py-2 max-md:px-2 bg-red-100 text-center text-red-800 cursor-pointer">
                      ELIMINAR
                    </p>
                  </th>
                  <th
                    onClick={() => obtenerParamsId(g.id)}
                    className="border-b-[1px] border-gray-300 px-3 max-md:text-xs "
                  >
                    <Link
                      className="bg-indigo-500 rounded-xl shadow px-6 py-2  text-center text-white cursor-pointer"
                      to={`/presupuesto/${g.id}`}
                    >
                      Ver
                    </Link>
                  </th>
                </tr>
              ))
            ) : (
              <div className="w-full">
                <span className="font-bold text-sm">No hay nada...</span>
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
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-indigo-500 hover:bg-slate-700 transition-all ease-in-out text-white shadow shadow-black/20 max-md:text-xs"
                  : "bg-gray-100 shadow shadow-black/20 max-md:text-xs"
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
