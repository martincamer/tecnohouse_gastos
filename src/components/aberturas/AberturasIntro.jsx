import { useAberturasContext } from "../../context/AberturasProvider";

export const AberturasIntro = () => {
  const { obtenerAberturas } = useAberturasContext();

  const fechaActual = new Date();

  return (
    <div className="bg-white grid grid-cols-2 gap-2 items-center w-[1600px] mx-auto">
      <div className="text-lg font-bold text-gray-700 underline ">
        ABERTURAS ALUMINIO TECNOHOUSE
      </div>

      {/* <div className="border-slate-300 rounded-xl border-[1px] shadow py-3 px-3 flex gap-10 bg-white">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-gray-700 max-md:text-xs">DIA:</p>{" "}
          <p className="font-semibold text-indigo-600 text-sm uppercase max-md:text-xs">
            {fechaActual.toLocaleString("es-AR", { weekday: "long" })}
          </p>
        </div>
      </div> */}

      <div className="flex gap-5">
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
    </div>
  );
};
