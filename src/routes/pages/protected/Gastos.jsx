import { Link } from "react-router-dom";
import { useGastosContext } from "../../../context/GastosProvider";
import { ModalCrearGasto } from "../../../components/gastos/ModalCrearGasto";
// import { SearchSelect } from "../../../components/ui/SearchSelect";
// import { SearchSelectAnio } from "../../../components/ui/SearchSelectAnio";

export const Gastos = () => {
  const { gastos } = useGastosContext();

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="bg-white mb-4 h-10 flex">
        <Link
          to={"/"}
          className="bg-blue-100 flex h-full px-4 justify-center items-center font-bold text-indigo-600"
        >
          Inicio
        </Link>{" "}
        <Link
          to={"/gastos"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Gastos/compras de la fabrica
        </Link>
      </div>

      <div className="mx-5 my-5 px-10 py-5 bg-white">
        <p className="font-semibold text-orange-500 text-lg">
          Crear nuevos gastos/compras, lleva el controll de ellas y analiza tu
          fabrica.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-5 bg-white py-5 px-5 mx-5">
        <article class="py-5 px-5 border flex flex-col gap-2">
          <div>
            <p class="text-sm text-gray-500 font-semibold">
              Gastos generados hasta el momento.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {gastos.length}
            </p>
          </div>
        </article>
        <article class="py-5 px-5 border flex flex-col gap-2">
          <div>
            <p class="text-sm text-gray-500 font-semibold">
              Totan en gastos generados.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {Number(12550).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </article>
      </div>
      <div className="bg-white mx-5 py-5 px-5 flex gap-2">
        <button
          onClick={() =>
            document.getElementById("my_modal_crear_gasto").showModal()
          }
          type="button"
          className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
        >
          Crear nuevos gastos/compras
        </button>{" "}
        <button
          type="button"
          className="bg-orange-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
        >
          Crear proveedores/etc
        </button>
      </div>

      <div className="bg-white py-5 px-5 my-10 mx-5 flex gap-2">
        <div className="bg-white w-1/4 flex  border border-indigo-500 py-1 px-2 rounded font-semibold text-sm capitalize outline-none">
          <input
            className="w-full placeholder:text-gray-500/90 outline-none"
            placeholder={"Buscar por proveedor, etc."}
          />

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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
      <ModalCrearGasto />
    </section>
  );
};
