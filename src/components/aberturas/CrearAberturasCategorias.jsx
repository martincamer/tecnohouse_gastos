import { Link } from "react-router-dom";
import { useAberturasContext } from "../../context/AberturasProvider";
import { usePreciosContext } from "../../context/PreciosProvider";

export const CrearAberturasCategorias = () => {
  const { openModal } = useAberturasContext();
  const { openModalPrecios } = usePreciosContext();

  return (
    <div className="py-4 px-4 flex items-center gap-2 bg-white mb-5 mx-5">
      <button
        className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
        onClick={() => openModal()}
      >
        Crear nueva abertura
      </button>

      <button
        onClick={() => openModalPrecios()}
        className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
      >
        Modificar los precios $
      </button>

      <Link
        to={"/perfiles"}
        className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2 flex gap-2 items-center"
      >
        Ir a parte de perfiles
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
      <Link
        to={"/accesorios"}
        className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2 flex gap-2 items-center"
      >
        Ir a parte de accesorios
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
};
