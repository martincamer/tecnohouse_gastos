import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { ViewEditarGastosModal } from "../../../components/ventas/ViewEditarGastosModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDescargarGastoUno } from "../../../components/ventas/PdfDescargarGastoUno";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useVentasContext } from "../../../context/VentasProvider";
import { obtenerUnicoVenta, editarVenta } from "../../../api/ventas";

export const ViewVenta = () => {
  const { venta, openModal, setVenta } = useVentasContext();

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
        const response = await obtenerUnicoVenta(params?.id);

        setVenta(response.data);

        setValue("detalle", response.data?.detalle);
        setValue("tipo", response.data?.tipo);
        setValue("numero", response.data?.numero);
        setValue("total", response.data?.total);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    obtenerDatos();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const res = await editarVenta(params.id, data);

    setTimeout(() => {
      location.reload();
    }, 1500);

    toast.success("Editada correctamente!", {
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
    <section className="w-full py-24 px-12 max-md:px-4 flex flex-col gap-8">
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center w-full bg-slate-100">
        <div className="flex flex-col gap-6 w-full" key={venta?.id}>
          <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-2 w-1/3 text-center bg-white">
            <p className="font-bold text-gray-700">FECHA DE CREACIÓN:</p>
            <p>{new Date(venta?.created_at).toLocaleDateString("arg")}</p>
          </div>
          <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-2 w-1/3 text-center bg-white">
            <p className="font-bold text-gray-700">TOTAL GASTO:</p>
            <p>
              {venta?.total?.toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 bg-white">
            <div className="w-full">
              <h2 className="font-bold text-xl text-indigo-500">
                DATOS DEL GASTO
              </h2>
            </div>
            <div className="flex flex-col gap-3 border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10  w-1/3 text-center">
              <div className="flex gap-2">
                <p className="font-bold text-gray-700 uppercase">NUMERO:</p>
                <p className="font-semibold text-indigo-500 uppercase">
                  {venta?.id}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-gray-700 uppercase">DETALLE:</p>
                <p className="font-semibold text-indigo-500 uppercase">
                  {venta?.detalle}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-gray-700 uppercase">TIPO:</p>
                <p className="font-semibold text-indigo-500 uppercase">
                  {venta?.tipo}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-gray-700 uppercase">
                  N° FACTURA - REMITO - ETC:
                </p>
                <p className="font-semibold text-indigo-500 uppercase">
                  {venta?.numero}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/6 border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 bg-white">
            <button
              onClick={() => openModal()}
              className="bg-indigo-500  text-white font-semibold text-sm px-5 py-1 rounded-lg shadow shadow-black/20"
            >
              EDITAR VENTA
            </button>
          </div>
          <div className="w-[430px]  border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 bg-white">
            <button className="bg-indigo-500   text-white font-semibold text-sm px-5 py-1 rounded-lg shadow shadow-black/20">
              <PDFDownloadLink
                document={<PdfDescargarGastoUno gasto={venta} />}
              >
                {" "}
                DESCARGAR VENTAS TIPO FACTURA{" "}
              </PDFDownloadLink>
            </button>
          </div>
        </div>
      </div>
      <ViewEditarGastosModal onSubmit={onSubmit} register={register} />
    </section>
  );
};
