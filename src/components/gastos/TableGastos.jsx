import { useState } from "react";
import { useGastosContext } from "../../context/GastosProvider";
import { Link } from "react-router-dom";

export const TableGastos = () => {
  const {
    results,
    handleSeleccionarId,
    openModalEliminar,
    obtenerId,
    obtenerParamsId,
  } = useGastosContext();

  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="border-[1px] border-slate-30  table-auto w-full rounded-xl uppercase shadow">
      <table className=" shadow-black/20 w-full rounded-xl">
        <thead>
          <tr className="text-left">
            {/* <th className="p-3 border-b-[1px]">Numero</th> */}
            <th className="p-3 border-b-[1px]">Detalle del gasto</th>
            <th className="p-3 border-b-[1px]">Tipo de gasto</th>
            <th className="p-3 border-b-[1px]">fecha</th>
            <th className="p-3 border-b-[1px]">Numero de remito o factura</th>
            <th className="p-3 border-b-[1px]">ingreso del gasto</th>
            <th className="p-3 border-b-[1px]">Eliminar</th>
            <th className="p-3 border-b-[1px]">Ver gasto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-3">
          {results.map((g) => (
            <tr
              className="hover:bg-slate-100 cursor-pointer transition-all ease-in-out duration-100 text-left border-slate-300"
              key={g.id}
            >
              {/* <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm uppercase">
              {g.id}
            </th> */}
              <th className="py-4 px-3 font-medium text-sm uppercase">
                {g.detalle}
              </th>
              <th className="py-4 px-3 font-medium text-sm uppercase">
                {g.tipo}
              </th>
              <th className="py-4 px-3 font-medium text-sm uppercase">
                {new Date(g.created_at).toLocaleDateString("arg")}
              </th>
              <th className="py-4 px-3 font-medium text-sm uppercase">
                N° {g.numero}
              </th>
              <th className="py-4 px-3 text-sm uppercase text-indigo-600 font-semibold">
                {g?.total.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </th>
              <th
                onClick={() => {
                  handleSeleccionarId(g.id), openModalEliminar();
                }}
                className=" py-4 px-3 font-medium text-sm uppercase"
              >
                <p className="border-red-300 border-[1px] rounded-xl shadow p-[3px] bg-red-100 text-center text-red-800 cursor-pointer">
                  ELIMINAR
                </p>
              </th>
              <th
                onClick={() => obtenerParamsId(g.id)}
                className="p-2 font-semibold text-sm uppercase cursor-pointer text-center"
              >
                <Link
                  className="bg-indigo-500 px-4 py-2 shadow rounded-xl text-white"
                  to={`/gastos/${g.id}`}
                >
                  VER VENTA
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center w-full  mt-4 mb-4 gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-indigo-500 hover:bg-slate-700 transition-all ease-in-out text-white shadow shadow-black/20"
                  : "bg-gray-100 shadow shadow-black/20"
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
