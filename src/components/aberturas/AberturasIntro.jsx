import { useAberturasContext } from "../../context/AberturasProvider";

export const AberturasIntro = () => {
  //   const { results } = useGastosContext();

  const { obtenerAberturas } = useAberturasContext();

  //   const total = results.reduce(
  //     (acumulador, gasto) => acumulador + gasto.total,
  //     0
  //   );

  const fechaActual = new Date();
  console.log(fechaActual);

  return (
    <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-10 px-10 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-700">
        ABERTURAS ALUMINIO TECNOHOUSE
      </div>
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10">
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-gray-700">MES/FECHA:</p>{" "}
          <p className="font-semibold text-teal-600 text-md uppercase">
            {fechaActual.toLocaleString("es-AR", { month: "long" })}
          </p>
        </div>
      </div>
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10">
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-gray-700">DIA:</p>{" "}
          <p className="font-semibold text-teal-600 text-md uppercase">
            {fechaActual.toLocaleString("es-AR", { weekday: "long" })}
          </p>
        </div>
      </div>

      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10">
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-gray-700">TOTAL ABERTURAS:</p>{" "}
          <p className="font-semibold text-teal-600 text-md">
            {obtenerAberturas.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-gray-700">
            TOTAL ABERTURAS CARGADAS:
          </p>{" "}
          <p className="font-semibold text-teal-600 text-md">
            {obtenerAberturas.length}
          </p>
        </div>
      </div>
    </div>
  );
};
