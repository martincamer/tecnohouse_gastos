import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDescargarGastos } from "./PdfDescargarGastos";
import { useVentasContext } from "../../context/VentasProvider";

export const CrearGastosCategorias = ({ results }) => {
  const { openModal } = useVentasContext();

  return (
    <div className="border-slate-300 rounded-xl border-[1px] shadow py-5 px-10 flex gap-12 items-center bg-white">
      <button
        onClick={() => openModal()}
        className="border-slate-300 rounded-xl border-[1px] shadow  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-600 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white text-sm"
      >
        CREAR NUEVO VENTA
      </button>
      {/* <button className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md shadow hover:shadow-black/10 hover:border-teal-400">
        CREAR NUEVO TIPOS DE VENTA
      </button>
      <button className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md shadow hover:shadow-black/10 hover:border-teal-400">
        VER TIPOS DE VENTA CREADOS
      </button> */}
      <button className="border-slate-300 rounded-xl border-[1px] shadow  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-600 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white text-sm">
        <PDFDownloadLink document={<PdfDescargarGastos results={results} />}>
          {" "}
          DESCARGAR PDF VENTAS POR FECHA Y MES.
        </PDFDownloadLink>
      </button>
    </div>
  );
};
