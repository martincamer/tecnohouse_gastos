import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const IntroPresupuesto = () => {
  const { resultadosFiltrados } = usePresupuestoContext();

  const fechaActual = new Date();

  return (
    <div className="bg-white flex justify-between py-10 px-5 mx-5 items-center">
      <div className="text-xl font-bold text-indigo-500">
        Generar nuevos presupuestos.
      </div>
      <article className="flex gap-5">
        <div className="bg-indigo-500 py-2 px-3 items-center flex text-white">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-white max-md:text-xs">
              MES/FECHA:
            </p>{" "}
            <p className="font-semibold text-wite text-sm uppercase max-md:text-xs">
              {fechaActual.toLocaleString("es-AR", { month: "long" })}
            </p>
          </div>
        </div>
        <div className="bg-indigo-500 py-2 px-3 items-center flex text-white">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-white max-md:text-xs">DIA:</p>{" "}
            <p className="font-semibold text-wite text-sm uppercase max-md:text-xs">
              {fechaActual.toLocaleString("es-AR", { weekday: "long" })}
            </p>
          </div>
        </div>

        <div className="bg-indigo-500 py-2 px-3 items-center flex text-white gap-3">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-white max-md:text-xs">
              TOTAL PRESUPUESTOS:
            </p>{" "}
            <p className="font-semibold text-white text-sm max-md:text-xs">
              {resultadosFiltrados?.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-white max-md:text-xs">
              TOTAL PRESUPUESTOS CARGADOS:
            </p>{" "}
            <p className="font-semibold text-white text-sm max-md:text-xs">
              {resultadosFiltrados?.length}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};
