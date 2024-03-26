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
    <div className="border-slate-300 rounded-xl border-[1px] shadow py-5 px-10 flex justify-between items-center bg-white max-md:flex-col max-md:items-start max-md:gap-4 max-md:border-none max-md:shadow-none max-md:px-4">
      <div className="text-lg font-bold text-gray-700 underline max-md:w-full max-md:text-sm">
        ABERTURAS ALUMINIO TECNOHOUSE
      </div>
      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">
            MES/FECHA:
          </p>{" "}
          <p className="font-semibold text-indigo-600 text-sm uppercase max-md:text-xs">
            {fechaActual.toLocaleString("es-AR", { month: "long" })}
          </p>
        </div>
      </div>
      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">DIA:</p>{" "}
          <p className="font-semibold text-indigo-600 text-sm uppercase max-md:text-xs">
            {fechaActual.toLocaleString("es-AR", { weekday: "long" })}
          </p>
        </div>
      </div>

      <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex max-md:flex-col max-md:gap-2 max-md:w-full gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">
            TOTAL ABERTURAS:
          </p>{" "}
          <p className="font-semibold text-indigo-600 text-sm max-md:text-xs">
            {obtenerAberturas.length}
          </p>
        </div>
        <div className="flex items-center gap-2 ">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">
            TOTAL ABERTURAS CARGADAS:
          </p>{" "}
          <p className="font-semibold text-indigo-600 text-sm max-md:text-xs">
            {obtenerAberturas.length}
          </p>
        </div>
      </div>
    </div>
  );
};
