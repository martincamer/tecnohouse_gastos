import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const CrearNuevosPresupuestosCats = () => {
  const { openModal } = usePresupuestoContext();

  return (
    <div className="my-5 mx-5">
      <button
        type="button"
        onClick={() => openModal()}
        className="bg-indigo-500 text-white font-semibold py-2 px-5 rounded hover:shadow text-sm flex gap-2 items-center"
      >
        Crear nuevo presupuesto
      </button>
    </div>
  );
};
