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
        <div className="bg-indigo-500 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <p className="font-semibold text-xl text-white text-center">
            Total Gastos
          </p>
          <p className="text-xl text-white">
            {total.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="bg-indigo-500 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <p className="font-semibold text-xl text-white text-center">
            TOTAL DE GASTOS
          </p>
          <p className="text-xl text-white">{gastos.length}</p>
        </div>

        <div className="bg-slate-700 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <p className="font-semibold text-xl text-white text-center">MES</p>
          <p className="text-xl text-white">{nombreMesActual}</p>
        </div>

        <div className="bg-indigo-500 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <p className="font-semibold text-xl text-white text-center">
            TOTAL VENTAS
          </p>
          <p className="text-xl text-white">
            {totalVentas.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="bg-indigo-500 shadow-md shadow-black/20 py-4 px-4 border-[1px] border-black/10 rounded-md space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <p className="font-semibold text-xl text-white text-center">
            TOTAL DE VENTAS
          </p>
          <p className="text-xl text-white">{ventas.length}</p>
        </div>
      </div>

      <div className="w-full mx-auto border-[1px] border-gray-200 shadow-md rounded-lg py-10 px-10 hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
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
