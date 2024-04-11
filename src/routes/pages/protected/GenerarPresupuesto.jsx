import { ToastContainer } from "react-toastify";
import { CrearNuevosPresupuestosCats } from "../../../components/generarPresupuesto/CrearNuevosPresupuestosCats";
import { IntroPresupuesto } from "../../../components/generarPresupuesto/introPresupuesto";
import { ModalCrearPresupuesto } from "../../../components/generarPresupuesto/ModalCrearPresupuesto";
import { TablePresupuestos } from "../../../components/generarPresupuesto/TablePresupuestos";
import { usePresupuestoContext } from "../../../context/PresupuestoProvider";

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
    <section className="w-full py-24 px-5 max-md:px-4 flex flex-col gap-5 max-md:py-2 max-md:mb-28">
      <ToastContainer />
      <IntroPresupuesto />
      <CrearNuevosPresupuestosCats />
      <div className="border-gray-300 rounded-xl border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center max-md:flex-col max-md:gap-2 max-md:items-start max-md:w-full max-md:px-4">
        <div className="flex flex-col gap-2">
          <label className="text-indigo-700 uppercase max-md:w-full max-md:text-xs">
            Año
          </label>
          <input
            className="bg-white py-2 px-2 rounded-xl shadow outline-none text-slate-800 border-slate-300 border-[1px] max-md:text-sm text-sm"
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
            className="bg-white py-2 px-2 rounded-xl shadow outline-none text-slate-800 border-slate-300 border-[1px] max-md:text-sm text-sm"
            type="number"
            value={monthToSearch}
            onChange={(e) => setMonthToSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4 uppercase max-md:w-full max-md:text-xs">
          <label className="text-indigo-700 uppercase">
            Buscar por el cliente
          </label>
          <input
            placeholder="Buscar por el cliente..."
            className="bg-white py-2 px-2 rounded-xl shadow outline-none text-slate-800 border-slate-300 border-[1px] max-md:text-sm uppercase text-sm"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <TablePresupuestos resultadosFiltrados={resultadosFiltrados} />
      <ModalCrearPresupuesto />
    </section>
  );
};
