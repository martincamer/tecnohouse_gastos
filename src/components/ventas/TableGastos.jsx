import { useGastosContext } from "../../context/GastosProvider";
import { Link } from "react-router-dom";
import { useVentasContext } from "../../context/VentasProvider";

export const TableGastos = () => {
  const { results, handleSeleccionarId, openModalEliminar, obtenerParamsId } =
    useVentasContext();

  return (
    <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20">
      <thead>
        <tr className="text-left">
          {/* <th className="p-3 border-b-[1px]">Numero</th> */}
          <th className="p-3 border-b-[1px]">Detalle venta</th>
          <th className="p-3 border-b-[1px]">Tipo de venta</th>
          <th className="p-3 border-b-[1px]">fecha</th>
          <th className="p-3 border-b-[1px]">Numero de remito o factura</th>
          <th className="p-3 border-b-[1px]">Ingreso</th>
          <th className="p-3 border-b-[1px]">Eliminar</th>
          <th className="p-3 border-b-[1px]">Ver venta</th>
        </tr>
      </thead>
      <tbody>
        {results.map((g) => (
          <tr
            className="hover:bg-slate-100 cursor-pointer transition-all ease-in-out duration-100 text-left"
            key={g.id}
          >
            {/* <th className="border-b-[1px] py-5 border-gray-300 px-3 font-medium text-sm uppercase">
              {g.id}
            </th> */}
            <th className="border-b-[1px] py-4 border-gray-300 px-3 font-medium text-sm uppercase">
              {g.detalle}
            </th>
            <th className="border-b-[1px] py-4 border-gray-300 px-3 font-medium text-sm uppercase">
              {g.tipo}
            </th>
            <th className="border-b-[1px] py-4 border-gray-300 px-3 font-medium text-sm uppercase">
              {new Date(g.created_at).toLocaleDateString("arg")}
            </th>
            <th className="border-b-[1px] py-4 border-gray-300 px-3 font-medium text-sm uppercase">
              N° {g.numero}
            </th>
            <th className="border-b-[1px] py-4 border-gray-300 px-3 text-sm uppercase text-indigo-600 font-semibold">
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
              className="border-b-[1px] py-4 border-gray-300 px-3 font-medium text-sm uppercase"
            >
              <p className="border-red-500 border-[1px] rounded shadow p-[3px] bg-red-100 text-center text-red-800 cursor-pointer">
                ELIMINAR
              </p>
            </th>
            <th
              onClick={() => obtenerParamsId(g.id)}
              className="border-[1px] border-gray-300 p-3 font-semibold text-sm uppercase bg-indigo-500 text-white cursor-pointer text-center"
            >
              <Link to={`/ventas/${g.id}`}>VER VENTA</Link>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
