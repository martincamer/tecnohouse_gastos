// import { useGastosContext } from "../../context/GastosProvider";

export const AberturasIntro = () => {
  //   const { results } = useGastosContext();

  //   const total = results.reduce(
  //     (acumulador, gasto) => acumulador + gasto.total,
  //     0
  //   );

  //   const fechaActual = new Date();
  //   console.log(fechaActual);

  // const añoActual = fechaActual.getFullYear();
  // const mesActual = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, por lo que sumamos 1.
  // const diaActual = fechaActual.getDate();

  return (
    <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-10 px-10 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-700">
        ABERTURAS ALUMINIO TECNOHOUSE
      </div>
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10">
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-gray-700">MES/FECHA:</p>{" "}
          <p className="font-semibold text-teal-600 text-md uppercase">
            {/* {fechaActual.toLocaleString("es-AR", { month: "long" })} */}
          </p>
        </div>
      </div>
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10">
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-gray-700">DIA:</p>{" "}
          <p className="font-semibold text-teal-600 text-md uppercase">
            {/* {fechaActual.toLocaleString("es-AR", { weekday: "long" })} */}
          </p>
        </div>
      </div>

      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-3 px-3 flex gap-10">
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-gray-700">TOTAL ABERTURAS:</p>{" "}
          <p className="font-semibold text-teal-600 text-md">
            {/* {total.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })} */}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-md font-bold text-gray-700">
            TOTAL ABERTURAS CARGADAS:
          </p>{" "}
          <p className="font-semibold text-teal-600 text-md">
            {/* {results.length} */}
          </p>
        </div>
      </div>
    </div>
  );
};
