import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const CrearNuevosPresupuestosCats = () => {
  const { openModal } = usePresupuestoContext();

  return (
    <div className="py-5 px-10 flex gap-12 mx-auto w-full max-md:px-4  max-md:py-0">
      <button
        type="button"
        onClick={() => openModal()}
        className="border-gray-300 max-md:text-xs shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 text-sm"
      >
        CREAR NUEVA PRESUPUESTO
      </button>
    </div>
  );
};
