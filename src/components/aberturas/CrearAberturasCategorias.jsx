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
    <div className="border-slate-300 rounded-md border-[1px] shadow py-5 px-10 flex gap-12 mx-auto w-full bg-white">
      <button
        onClick={() => openModal()}
        className="border-slate-300 shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white text-sm"
      >
        CREAR NUEVA ABERTURA
      </button>

      <button
        onClick={() => openModalPrecios()}
        className="border-slate-300 shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white text-sm"
      >
        MODIFICAR LOS PRECIOS TOTAL ABERTURAS.
      </button>

      <Link
        to={"/perfiles"}
        // onClick={() => openModal()}
        className="border-slate-300 shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white text-sm"
      >
        VER PERFILES
      </Link>
      <Link
        to={"/accesorios"}
        // onClick={() => openModal()}
        className="border-slate-300 shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white text-sm"
      >
        VER ACCESORIOS
      </Link>
    </div>
  );
};
