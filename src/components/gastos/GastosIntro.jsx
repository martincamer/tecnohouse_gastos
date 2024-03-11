import { useGastosContext } from "../../context/GastosProvider";

export const GastosIntro = () => {
  const { results } = useGastosContext();

  const total = results.reduce(
    (acumulador, gasto) => acumulador + gasto.total,
    0
  );

  const fechaActual = new Date();
  console.log(fechaActual);

  // const añoActual = fechaActual.getFullYear();
  // const mesActual = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1.
  // const diaActual = fechaActual.getDate();

  return (
    <div className="border-slate-300 rounded-xl border-[1px] shadow  py-10 px-10 flex justify-between items-center">
      <div className="text-xl font-bold text-slate-700">
        GASTOS DE TECNOHOUSE
      </div>
      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700">MES/FECHA:</p>{" "}
          <p className="font-semibold text-indigo-500 text-sm uppercase">
            {fechaActual.toLocaleString("es-AR", { month: "long" })}
          </p>
        </div>
      </div>
      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700">DIA:</p>{" "}
          <p className="font-semibold text-indigo-500 text-sm uppercase">
            {fechaActual.toLocaleString("es-AR", { weekday: "long" })}
          </p>
        </div>
      </div>

      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700">TOTAL GASTOS:</p>{" "}
          <p className="font-semibold text-indigo-500 text-sm">
            {total.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700">
            TOTAL GASTOS CARGADOS:
          </p>{" "}
          <p className="font-semibold text-indigo-500 text-sm">
            {results.length}
          </p>
        </div>
      </div>
    </div>
  );
};
