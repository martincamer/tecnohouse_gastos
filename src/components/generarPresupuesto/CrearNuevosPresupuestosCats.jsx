import { usePresupuestoContext } from "../../context/PresupuestoProvider";

export const CrearNuevosPresupuestosCats = () => {
  const { openModal } = usePresupuestoContext();

  return (
    <div className="py-5 px-10 flex gap-12 mx-auto w-full max-md:px-4  max-md:py-0">
      <button
        type="button"
        onClick={() => openModal()}
        className="bg-green-500 text-white font-semibold py-3 px-5 rounded-xl hover:shadow-md text-sm flex gap-2 items-center"
      >
        CREAR NUEVA PRESUPUESTO
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
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};
