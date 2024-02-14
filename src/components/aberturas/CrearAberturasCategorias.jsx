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
    <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 mx-auto w-full">
      <button
        onClick={() => openModal()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
      >
        CREAR NUEVA ABERTURA
      </button>

      <button
        onClick={() => openModalPrecios()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
      >
        MODIFICAR LOS PRECIOS TOTAL ABERTURAS.
      </button>

      <Link
        to={"/perfiles"}
        // onClick={() => openModal()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
      >
        VER PERFILES
      </Link>
      <Link
        to={"/accesorios"}
        // onClick={() => openModal()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
      >
        VER ACCESORIOS
      </Link>
      {/* <button
        // onClick={() => openModal()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
      >
        CAMBIAR PRECIO KG ALUMINIO POR CATEGORIA
      </button>
      <button
        // onClick={() => openModal()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
      >
        CAMBIAR PRECIO KG ALUMINIO POR CATEGORIA
      </button>
      <button
        // onClick={() => openModal()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
      >
        CARGAR PRECIO LUZ, AGUA, ETC POR ABERTURA.
      </button> */}

      {/* <button className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md shadow hover:shadow-black/10 hover:border-teal-400">
        CREAR NUEVO TIPOS DE GASTO
      </button>
      <button className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md shadow hover:shadow-black/10 hover:border-teal-400">
        VER TIPOS DE GASTOS CREADOS
      </button> */}
      {/* <button className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md shadow hover:shadow-black/10 hover:border-teal-400">
        <PDFDownloadLink document={<PdfDescargarGastos results={results} />}>
          {" "}
          DESCARGAR PDF GASTOS POR FECHA Y MES.
        </PDFDownloadLink>
      </button> */}
    </div>
  );
};
