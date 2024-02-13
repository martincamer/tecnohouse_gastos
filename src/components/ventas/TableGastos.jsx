import { useGastosContext } from "../../context/GastosProvider";
import { Link } from "react-router-dom";
import { useVentasContext } from "../../context/VentasProvider";

export const TableGastos = () => {
  const { results, handleSeleccionarId, openModalEliminar, obtenerParamsId } =
    useVentasContext();

  return (
    <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20">
      <thead>
        <tr>
          <th className="p-3">Numero</th>
          <th className="p-3">Detalle venta</th>
          <th className="p-3">Tipo de venta</th>
          <th className="p-3">fecha</th>
          <th className="p-3">Numero de remito o factura</th>
          <th className="p-3">Ingreso</th>
          <th className="p-3">Eliminar</th>
          <th className="p-3">Ver venta</th>
        </tr>
      </thead>
      <tbody>
        {results.map((g) => (
          <tr key={g.id}>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {g.id}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {g.detalle}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {g.tipo}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {new Date(g.created_at).toLocaleDateString("arg")}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              N° {g.numero}
            </th>
            <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
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
              className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"
            >
              <p className="border-red-500 border-[1px] rounded shadow p-[3px] bg-red-100 text-center text-red-800 cursor-pointer">
                ELIMINAR
              </p>
            </th>
            <th
              onClick={() => obtenerParamsId(g.id)}
              className="border-[1px] border-gray-300 p-3 font-semibold text-sm uppercase bg-teal-500 text-white cursor-pointer"
            >
              <Link to={`/ventas/${g.id}`}>VER VENTA</Link>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
