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
    <section className="w-full py-20 px-12 max-md:px-4 flex flex-col gap-20">
      <div className="grid grid-cols-5 gap-4 border-[1px] border-slate-300 shadow rounded-xl py-10 px-4">
        <div className=" bg-white shadow  py-4 px-4 border-[1px] border-slate-300 rounded-xl space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <div class="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span class="text-xs font-medium"> {total.toFixed(2)} </span>
          </div>
          <p className="font-semibold uppercase  text-lg text-black text-center">
            Total Gastos
          </p>
          <p className="text-base text-black">
            {total.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="flex justify-center flex-col bg-white shadow  py-4 px-4 border-[1px] border-slate-300 rounded-xl space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <p className="font-semibold text-lg uppercase text-black text-center">
            Total De Gastos
          </p>
          <p className="text-base text-black">{gastos.length}</p>
        </div>
        <div className="flex flex-col justify-center bg-slate-100 shadow  py-4 px-4 border-[1px] border-slate-300 rounded-xl space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <p className="font-semibold text-lg uppercase text-black text-center">
            Mes actual
          </p>
          <p className="text-base text-black">{nombreMesActual}</p>
        </div>

        <div className="bg-white shadow  py-4 px-4 border-[1px] border-slate-300 rounded-xl space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <div class="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span class="text-xs font-medium"> {totalVentas.toFixed(2)} </span>
          </div>
          <p className="font-semibold text-lg uppercase text-black text-center">
            Total de ventas
          </p>
          <p className="text-base text-black">
            {totalVentas.toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="flex flex-col justify-center bg-white shadow  py-4 px-4 border-[1px] border-slate-300 rounded-xl space-y-2 text-center hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
          <p className="font-semibold text-lg uppercase text-black text-center">
            TOTAL DE VENTAS
          </p>
          <p className="text-base text-black">{ventas.length}</p>
        </div>
      </div>

      <div className="w-full mx-auto border-[1px] border-slate-300 shadow rounded-xl py-10 px-10 hover:translate-x-1 transition-all ease-in duration-100 cursor-pointer">
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
