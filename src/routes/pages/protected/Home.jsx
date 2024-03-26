import { useEffect, useState } from "react";

//imports

export const Home = () => {
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
      <div className="grid grid-cols-5 gap-4 border-[1px] border-slate-300 shadow rounded-xl py-10 px-4"></div>
    </section>
  );
};
