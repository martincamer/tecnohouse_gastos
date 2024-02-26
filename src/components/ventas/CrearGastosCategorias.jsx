import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDescargarGastos } from "./PdfDescargarGastos";
import { useVentasContext } from "../../context/VentasProvider";

export const CrearGastosCategorias = ({ results }) => {
  const { openModal } = useVentasContext();

  return (
    <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center bg-slate-100">
      <button
        onClick={() => openModal()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-600 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white"
      >
        CREAR NUEVO VENTA
      </button>
      {/* <button className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md shadow hover:shadow-black/10 hover:border-teal-400">
        CREAR NUEVO TIPOS DE VENTA
      </button>
      <button className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md shadow hover:shadow-black/10 hover:border-teal-400">
        VER TIPOS DE VENTA CREADOS
      </button> */}
      <button className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-600 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white">
        <PDFDownloadLink document={<PdfDescargarGastos results={results} />}>
          {" "}
          DESCARGAR PDF VENTAS POR FECHA Y MES.
        </PDFDownloadLink>
      </button>
    </div>
  );
};
