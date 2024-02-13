import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGastosContext } from "../../../context/GastosProvider";
import { ViewEditarGastosModal } from "../../../components/gastos/ViewEditarGastosModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDescargarGastoUno } from "../../../components/gastos/PdfDescargarGastoUno";
import { useForm } from "react-hook-form";
import { editarGasto, obtenerUnicoGasto } from "../../../api/gastos";
import { toast } from "react-toastify";

export const ViewGasto = () => {
  const { gasto, openModal, setGasto } = useGastosContext();

  const params = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await obtenerUnicoGasto(params?.id);

        setGasto(response.data);

        setValue("detalle", response.data?.detalle);
        setValue("tipo", response.data?.tipo);
        setValue("numero", response.data?.numero);
        setValue("total", response.data?.total);
      } catch (error) {
        console.error("Error al obtener los gastos:", error);
      }
    };

    obtenerDatos();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const res = await editarGasto(params.id, data);

    setTimeout(() => {
      location.reload();
    }, 1500);

    toast.success("Gasto creado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  });

  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-8">
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center w-full">
        <div className="flex flex-col gap-6 w-full" key={gasto?.id}>
          <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-2 w-1/3 text-center">
            <p className="font-bold text-gray-700">FECHA DE CREACIÓN:</p>
            <p>{new Date(gasto?.created_at).toLocaleDateString("arg")}</p>
          </div>
          <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-2 w-1/3 text-center">
            <p className="font-bold text-gray-700">TOTAL GASTO:</p>
            <p>
              {gasto?.total?.toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10">
            <div className="w-full">
              <h2 className="font-bold text-xl text-teal-500">
                DATOS DEL GASTO
              </h2>
            </div>
            <div className="flex flex-col gap-3 border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10  w-1/3 text-center">
              <div className="flex gap-2">
                <p className="font-bold text-gray-700 uppercase">NUMERO:</p>
                <p className="font-semibold text-teal-500 uppercase">
                  {gasto?.id}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-gray-700 uppercase">DETALLE:</p>
                <p className="font-semibold text-teal-500 uppercase">
                  {gasto?.detalle}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-gray-700 uppercase">TIPO:</p>
                <p className="font-semibold text-teal-500 uppercase">
                  {gasto?.tipo}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-gray-700 uppercase">
                  N° FACTURA - REMITO - ETC:
                </p>
                <p className="font-semibold text-teal-500 uppercase">
                  {gasto?.numero}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/6 border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10">
            <button
              onClick={() => openModal()}
              className="bg-teal-500 w-full  text-white font-semibold text-lg px-5 py-2 rounded-lg shadow shadow-black/20"
            >
              EDITAR GASTO
            </button>
          </div>
          <div className="w-[430px]  border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10">
            <button className="bg-teal-500 w-full  text-white font-semibold text-lg px-5 py-2 rounded-lg shadow shadow-black/20">
              <PDFDownloadLink
                document={<PdfDescargarGastoUno gasto={gasto} />}
              >
                {" "}
                DESCARGAR GASTO TIPO FACTURA{" "}
              </PDFDownloadLink>
            </button>
          </div>
        </div>
      </div>
      <ViewEditarGastosModal onSubmit={onSubmit} register={register} />
    </section>
  );
};
