import { useAberturasContext } from "../../context/AberturasProvider";

export const AberturasIntro = () => {
  //   const { results } = useGastosContext();

  const { obtenerAberturas } = useAberturasContext();

  //   const total = results.reduce(
  //     (acumulador, gasto) => acumulador + gasto.total,
  //     0
  //   );

  const fechaActual = new Date();

  return (
    <div className="border-slate-300 rounded-xl border-[1px] shadow py-10 px-10 flex justify-between items-center bg-white">
      <div className="text-xl font-bold text-gray-700">
        ABERTURAS ALUMINIO TECNOHOUSE
      </div>
      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700">MES/FECHA:</p>{" "}
          <p className="font-semibold text-indigo-600 text-sm uppercase">
            {fechaActual.toLocaleString("es-AR", { month: "long" })}
          </p>
        </div>
      </div>
      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700">DIA:</p>{" "}
          <p className="font-semibold text-indigo-600 text-sm uppercase">
            {fechaActual.toLocaleString("es-AR", { weekday: "long" })}
          </p>
        </div>
      </div>

      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700">TOTAL ABERTURAS:</p>{" "}
          <p className="font-semibold text-indigo-600 text-sm">
            {obtenerAberturas.length}
          </p>
        </div>
        <div className="flex items-center gap-2 ">
          <p className="text-sm font-bold text-gray-700">
            TOTAL ABERTURAS CARGADAS:
          </p>{" "}
          <p className="font-semibold text-indigo-600 text-sm">
            {obtenerAberturas.length}
          </p>
        </div>
      </div>
    </div>
  );
};
