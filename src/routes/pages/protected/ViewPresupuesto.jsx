import { useParams } from "react-router-dom";
import { obtenerUnicosPresupuestos } from "../../../api/presupuesto";
import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DescargarPresupuesto } from "../../../components/generarPresupuesto/DescargarPresupuesto";

export const ViewPresupuesto = () => {
  const params = useParams();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await obtenerUnicosPresupuestos(params?.id);

      setDatos(res.data);
    }
    loadData();
  }, [params?.id]);

  const fechaOriginal = new Date(datos.created_at);

  // Sumar 5 días a la fecha original
  const fechaSumada = new Date(fechaOriginal);
  fechaSumada.setDate(fechaSumada.getDate() + 5);

  const capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const clienteCapitalized = datos?.cliente ? capitalize(datos.cliente) : "";

  return (
    <section className="mx-10 my-24 max-md:my-4 max-md:px-4 max-md:mx-3 bg-white h-full w-full rounded-xl shadow border-slate-300 border-[1px] max-md:overflow-x-scroll">
      <div className="max-md:px-2 flex flex-col gap-2 border-[1px] rounded-xl border-slate-300 px-10 py-5 mt-12 w-[1220px] mx-auto h-full">
        <div>
          <p className="text-indigo-500 font-bold text-2xl max-md:text-base">
            Presupuesto N°{" "}
            <span className="text-slate-700">0000-000{datos?.id}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <PDFDownloadLink
              className="max-md:text-xs text-sm bg-indigo-100 border-indigo-500 border-[1px] px-4 py-[6px] rounded-lg text-indigo-700 transiton-all ease-in-out duration-200 cursor-pointer"
              fileName={`${clienteCapitalized} Presupuesto N° 0000-000${datos?.id}`}
              document={<DescargarPresupuesto datos={datos} />}
            >
              Descargar presupuesto
            </PDFDownloadLink>
          </div>
          <div>
            <button
              className="max-md:text-xs text-sm bg-indigo-100 border-indigo-500 border-[1px] px-4 py-1 rounded-lg text-indigo-700 transiton-all ease-in-out duration-200 cursor-pointer"
              type="button"
            >
              Ver presupuesto
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between border-[1px] rounded-xl border-slate-300 px-10 py-5 mb-12 mt-8 w-[1220px] mx-auto h-full">
        <div className="flex flex-col gap-2">
          <p className="text-indigo-500 font-semibold text-lg flex flex-col gpa-3 max-md:text-sm">
            TOTAL PRESUPUESTADO
            <span className="text-slate-700 text-base max-md:text-sm">
              {Number(datos?.total).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-indigo-500 font-semibold text-lg flex flex-col gpa-3 max-md:text-sm">
            TOTAL PRESUPUESTADO
            <span className="text-slate-700 text-base max-md:text-sm">
              {Number(datos?.total).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-indigo-500 font-semibold text-lg flex flex-col gpa-3 max-md:text-sm">
            ESTADO
            <span className="text-slate-700 text-base">{""}</span>
          </p>
        </div>
      </div>

      <div className=" flex flex-col gap-3 border-[1px] rounded-xl border-slate-300 px-10 py-5 mb-12 mt-8 w-[1220px] mx-auto h-full">
        <div className="relative">
          <div className="text-center">
            <p className="text-center text-indigo-700 text-lg">
              Tecnohouse Aberturas
            </p>
            <p className="text-center">+ 3462693961</p>
            <p className="text-center">tecnohouseaberturas@gmail.com</p>
          </div>

          <p className="text-slate-700 font-bold absolute right-1 top-0 text-xl">
            No. 0000-000{datos?.id}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border-b-[1px] border-slate-300 flex justify-between">
            <div className="flex gap-5">
              <p className="text-slate-700">Cliente</p>
              <p className="text-indigo-500 uppercase">{datos?.cliente}</p>
            </div>

            <div className="flex gap-5">
              <p className="text-slate-700">Creacion</p>
              <p className="text-indigo-500">
                {new Date(datos.created_at).toLocaleDateString("arg")}
              </p>
            </div>
          </div>
          <div className="border-b-[1px] border-slate-300 flex justify-between">
            <div className="flex gap-5">
              <p className="text-slate-700">Localidad</p>
              <p className="text-indigo-500 uppercase">{datos?.localidad}</p>
            </div>

            <div className="flex gap-5">
              <p className="text-slate-700">Fecha Vencimiento</p>
              <p className="text-indigo-500">
                {fechaSumada.toLocaleDateString("es-AR")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col gap-3 border-[1px] rounded-xl border-slate-300 px-10 py-5 mb-12 mt-8 w-[1220px] mx-auto h-full">
        <div className="flex gap-5">
          <div className="w-1/3 font-bold text-slate-700 text-sm">DETALLE</div>
          <div className="w-1/5 font-bold text-slate-700 text-sm">COLOR</div>
          <div className="w-1/4 font-bold text-slate-700 text-sm">MEDIDA</div>
          <div className="w-1/4 font-bold text-slate-700 text-sm">
            CATEGORIA
          </div>
          <div className="w-1/5 font-bold text-slate-700 text-sm">CANT</div>
          <div className="w-1/5 font-bold text-slate-700 text-sm">
            PRECIO UND
          </div>
          <div className="w-1/5 font-bold text-slate-700 text-sm">
            PRECIO FINAL
          </div>
        </div>
        {datos?.datos?.resultado?.map((d) => (
          <div
            key={d.id}
            className="flex gap-5 border-b-[1px] border-slate-300 pb-4"
          >
            <div className="w-1/3 font-normal uppercase text-slate-600 text-sm">
              {d?.detalle}
            </div>
            <div className="w-1/5 font-normal uppercase text-slate-600 text-sm">
              {d?.color}
            </div>
            <div className="w-1/4 font-normal uppercase text-slate-600 text-sm">
              {d?.ancho}x{d?.alto}
            </div>
            <div className="w-1/4 font-normal uppercase text-slate-600 text-sm">
              {d?.categoria}
            </div>
            <div className="w-1/5 font-normal uppercase text-slate-600 text-sm">
              {d?.cantidad}
            </div>
            <div className="w-1/5 font-normal uppercase text-slate-600 text-sm">
              {Number(d?.precioUnidad).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </div>
            <div className="w-1/5 font-bold uppercase text-indigo-600 text-sm">
              {Number(d?.precioFinal).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-[1px] rounded-xl border-slate-300 px-10 py-5 w-[1220px] mx-auto h-full mb-12 mt-8">
        <div className="text-slate-700 flex flex-row items-center gap-3   w-[1220px] mx-auto h-full">
          Total final{" "}
          <span className="font-semibold text-indigo-700 text-lg">
            {Number(datos?.total).toLocaleString("es-ar", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="text-slate-700 flex flex-row items-center gap-3   w-[1220px] mx-auto h-full">
          Total aberturas
          <span className="font-semibold text-indigo-700 text-lg">
            {datos?.datos?.resultado.reduce(
              (total, item) => total + parseInt(item.cantidad, 10),
              0
            )}
          </span>
        </div>
      </div>
    </section>
  );
};
