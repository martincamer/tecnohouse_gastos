import { Link } from "react-router-dom";
import { ModalCrearResumen } from "../../../components/aberturas_resumen/ModalCrearPago";

export const AberturasResumen = () => {
  return (
    <section className="w-full flex flex-col gap-4">
      <div className="bg-white mb-4 h-10 flex">
        <Link
          to={"/"}
          className="bg-indigo-100 flex h-full px-4 justify-center items-center font-bold text-indigo-600"
        >
          Inicio
        </Link>{" "}
        <Link
          to={"/gastos"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Aberturas resumen
        </Link>
      </div>

      <div className="mx-5 my-5 px-10 py-5 bg-white">
        <p className="font-semibold text-orange-500 text-lg">
          Crear nuevos historiales de entregas, resumen, etc.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5 bg-white py-5 px-5 mx-5">
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Resumenes cargados hasta el momento.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base"></p>
          </div>
        </article>
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Total aberturas entregadas
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base"></p>
          </div>
        </article>
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Total aberturas en stock
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base"></p>
          </div>
        </article>
      </div>

      <div className="bg-white mx-5 py-5 px-5 flex gap-2">
        <button
          onClick={() =>
            document.getElementById("my_modal_crear_resumen").showModal()
          }
          type="button"
          className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
        >
          Crear nuevo resumen de aberturas
        </button>{" "}
      </div>

      <ModalCrearResumen />
    </section>
  );
};
