import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const CrearNuevosPresupuestosCats = () => {
  const { openModal } = usePresupuestoContext();

  return (
    <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 mx-auto w-full">
      <button
        type="button"
        onClick={() => openModal()}
        className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500"
      >
        CREAR NUEVA PRESUPUESTO
      </button>
    </div>
  );
};
