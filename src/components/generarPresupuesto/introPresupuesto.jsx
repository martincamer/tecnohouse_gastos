import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const IntroPresupuesto = () => {
  const { resultadosFiltrados } = usePresupuestoContext();

  const fechaActual = new Date();

  return (
    <div className="border-slate-300 rounded-xl border-[1px] shadow-md shadow-black/20 py-5 px-10 flex justify-between items-center max-md:flex-col max-md:gap-2 max-md:items-start max-md:shadow-none max-md:border-none max-md:px-4 max-md:py-0">
      <div className="text-xl font-bold text-gray-700 max-md:text-base max-md:w-full max-md:underline">
        GENERAR NUEVOS PRESUPUESTOS TECNOHOUSE
      </div>
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">
            MES/FECHA:
          </p>{" "}
          <p className="font-semibold text-indigo-600 text-sm uppercase max-md:text-xs">
            {fechaActual.toLocaleString("es-AR", { month: "long" })}
          </p>
        </div>
      </div>
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">DIA:</p>{" "}
          <p className="font-semibold text-indigo-600 text-sm uppercase max-md:text-xs">
            {fechaActual.toLocaleString("es-AR", { weekday: "long" })}
          </p>
        </div>
      </div>

      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10 max-md:flex-col max-md:gap-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">
            TOTAL PRESUPUESTOS:
          </p>{" "}
          <p className="font-semibold text-indigo-600 text-sm max-md:text-xs">
            {resultadosFiltrados?.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">
            TOTAL PRESUPUESTOS CARGADOS:
          </p>{" "}
          <p className="font-semibold text-indigo-600 text-sm max-md:text-xs">
            {resultadosFiltrados?.length}
          </p>
        </div>
      </div>
    </div>
  );
};
