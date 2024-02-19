import { useEffect, useState } from "react";
import { obtenerGastosMensuales } from "../../../api/gastos";
import { obtenerVentaMensuales } from "../../../api/ventas";
//imports
import GastosChart from "../../../components/gastos/GastosChart";

export const Home = () => {
  const [gastos, setGastos] = useState([]);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerGastosMensuales();

      setGastos(res.data);
    }

    loadData();
  }, []);

  const total = gastos.reduce(
    (accumulator, gasto) => accumulator + gasto.total,
    0
  );

  useEffect(() => {
    async function loadData() {
      const res = await obtenerVentaMensuales();

      setVentas(res.data);
    }

    loadData();
  }, []);

  const totalVentas = ventas.reduce(
    (accumulator, gasto) => accumulator + gasto.total,
    0
  );

  const fechaActual = new Date();
  const numeroMesActual = fechaActual.getMonth() + 1; // Se suma 1 porque los meses en JavaScript van de 0 a 11

  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const nombreMesActual = nombresMeses[numeroMesActual - 1];

  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-20">
      <div className="grid grid-cols-5 gap-4 border-[1px] shadow-md rounded py-10 px-4">
        <div className="bg-gray-100/30 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center">
          <p className="font-semibold text-2xl text-teal-400 text-center">
            TOTAL GASTOS
          </p>
          <p className="text-xl font-semibold">
            {total.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="bg-gray-100/30 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center">
          <p className="font-semibold text-2xl text-teal-400 text-center">
            TOTAL DE GASTOS
          </p>
          <p className="text-xl font-semibold">{gastos.length}</p>
        </div>

        <div className="bg-gray-100/30 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center">
          <p className="font-semibold text-2xl text-teal-400 text-center">
            MES
          </p>
          <p className="text-xl font-semibold uppercase">{nombreMesActual}</p>
        </div>

        <div className="bg-gray-100/30 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center">
          <p className="font-semibold text-2xl text-teal-400 text-center">
            TOTAL VENTAS
          </p>
          <p className="text-xl font-semibold">
            {totalVentas.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="bg-gray-100/30 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center">
          <p className="font-semibold text-2xl text-teal-400 text-center">
            TOTAL DE VENTAS
          </p>
          <p className="text-xl font-semibold">{ventas.length}</p>
        </div>
      </div>

      <div className="w-full mx-auto border-[1px] border-gray-200 shadow-md rounded-lg py-10 px-10">
        <div className="overflow-x-scroll w-[1220px] mx-auto">
          <GastosChart ventas={ventas} gastos={gastos} />
        </div>
      </div>
      {/* 
      <div className="w-full mx-auto border-[1px] border-gray-200 shadow-md rounded-lg py-10 px-10">

      </div> */}
    </section>
  );
};
