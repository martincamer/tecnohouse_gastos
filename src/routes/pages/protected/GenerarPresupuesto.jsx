import { ToastContainer } from "react-toastify";
import { CrearNuevosPresupuestosCats } from "../../../components/generarPresupuesto/CrearNuevosPresupuestosCats";
import { IntroPresupuesto } from "../../../components/generarPresupuesto/introPresupuesto";
import { ModalCrearPresupuesto } from "../../../components/generarPresupuesto/ModalCrearPresupuesto";
import { TablePresupuestos } from "../../../components/generarPresupuesto/TablePresupuestos";
import { usePresupuestoContext } from "../../../context/PresupuestoProvider";
import { Link } from "react-router-dom";

export const GenerarPresupuesto = () => {
  const {
    resultadosFiltrados,
    yearToSearch,
    monthToSearch,
    setYearToSearch,
    setMonthToSearch,
    searchTerm,
    setSearchTerm,
  } = usePresupuestoContext();

  return (
    <section className="flex flex-col gap-2 w-full">
      <div className="bg-white mb-4 h-10 flex">
        <Link
          to={"/"}
          className="bg-blue-100 flex h-full px-4 justify-center items-center font-bold text-indigo-600"
        >
          Inicio
        </Link>{" "}
        <Link
          to={"/presupuestos"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Presupuestos
        </Link>
      </div>
      <IntroPresupuesto />
      <CrearNuevosPresupuestosCats />
      <div className="mx-5 my-5 bg-white flex gap-2 items-center py-5 px-5 font-bold text-sm">
        <div className="flex flex-col gap-2">
          <label className="text-indigo-700 uppercase max-md:w-full max-md:text-xs">
            Año
          </label>
          <input
            className="outline-none border border-indigo-500 py-1.5 px-2 rounded"
            type="number"
            value={yearToSearch}
            onChange={(e) => setYearToSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-indigo-700 uppercase max-md:w-full max-md:text-xs">
            Mes
          </label>
          <input
            className="outline-none border border-indigo-500 py-1.5 px-2 rounded"
            type="number"
            value={monthToSearch}
            onChange={(e) => setMonthToSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4 uppercase max-md:w-full max-md:text-xs">
          <label className="text-indigo-700 uppercase">
            Buscar por el cliente
          </label>
          <div className="bg-white flex  border border-indigo-500 py-1 px-2 rounded font-semibold text-sm capitalize outline-none">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full placeholder:text-gray-500/90 outline-none"
              placeholder="Buscar por cliente.."
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
      </div>
      <TablePresupuestos resultadosFiltrados={resultadosFiltrados} />
      <ModalCrearPresupuesto />
    </section>
  );
};
