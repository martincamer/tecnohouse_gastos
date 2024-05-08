// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { useGastosContext } from "../../context/GastosProvider";
// import { PdfDescargarGastos } from "./PdfDescargarGastos";

import { Link } from "react-router-dom";
import { useAberturasContext } from "../../context/AberturasProvider";
import { usePreciosContext } from "../../context/PreciosProvider";

export const CrearAberturasCategorias = (/*{ results }*/) => {
  const { openModal } = useAberturasContext();
  const { openModalPrecios } = usePreciosContext();

  return (
    <div className="py-4 px-4 flex gap-2 bg-white shadow-xl mb-3 rounded-xl">
      <button
        onClick={() => openModal()}
        className="bg-indigo-100 text-indigo-600 py-2 px-4 rounded-2xl text-sm flex gap-2 items-center hover:bg-indigo-500 hover:text-white hover:shadow-md transition-all ease-linear"
      >
        CREAR NUEVA ABERTURA
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      <button
        onClick={() => openModalPrecios()}
        className="bg-green-100 text-green-700 py-2 px-4 rounded-2xl text-sm hover:bg-green-500 hover:text-white hover:shadow-md transition-all ease-linear flex gap-2 items-center"
      >
        MODIFICAR LOS PRECIOS TOTAL ABERTURAS.
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      </button>

      <Link
        to={"/perfiles"}
        className="border-[1px] border-slate-300 py-2 px-4 rounded-2xl text-sm flex gap-2 items-center  hover:shadow-md transition-all ease-linear"
      >
        VER PERFILES
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
      <Link
        to={"/accesorios"}
        className="border-[1px] border-slate-300 py-2 px-4 rounded-2xl text-sm flex gap-2 items-center  hover:shadow-md transition-all ease-linear"
      >
        VER ACCESORIOS
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
};
