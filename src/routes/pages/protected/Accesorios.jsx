import { ModalCrearNuevoAccesorio } from "../../../components/accesorios/ModalCrearNuevoAccesorio";
import { ModalEliminarAccesorios } from "../../../components/accesorios/ModalEliminarAccesorios";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { Search } from "../../../components/ui/Search";

export const Accesorios = () => {
  const {
    isOpen,
    closeModal,
    openModal,
    accesorios,
    openModalEliminar,
    obtenerParamsId,
  } = useAccesoriosContext();

  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-20">
      <div className="bg-gray-100/30 py-10 px-10 rounded-lg shadow shadow-black/20 border-[0.5px] border-gray-200">
        {/*  INTRO */}
        <div className="flex items-center justify-between">
          <p
            className="
        text-xl font-semibold text-gray-600"
          >
            ACCESORIOS
          </p>
          <div className="border-[0.5px] shadow-md shadow-black/20 rounded-lg px-4 py-2">
            <p
              className="
        text-lg font-semibold text-gray-700"
            >
              TOTAL ACCESORIOS CARGADOS: <span>{accesorios.length}</span>
            </p>
          </div>
        </div>
        {/* FIN INTRO */}
        <hr className="my-10 bg-teal-500 h-[2px]" />
        {/* CATEGORIAS */}
        <div className="flex gap-10">
          <button
            onClick={() => openModal()}
            className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
          >
            CREAR NUEVO ACCESORIO
          </button>

          <button
            // onClick={() => openModal()}
            className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
          >
            CREAR NUEVA CATEGORIA
          </button>

          <button
            // onClick={() => openModal()}
            className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
          >
            CREAR NUEVO COLOR
          </button>

          <button
            // onClick={() => openModal()}
            className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
          >
            VER CATEGORIAS
          </button>

          <button
            // onClick={() => openModal()}
            className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
          >
            VER COLORES
          </button>
        </div>
        {/* FIN CATEGORIAS */}
        <div className="mt-10">
          <Search variable={"BUSCAR POR EL DETALLE, NUMERO..."} />
        </div>
        {/* TABLA DE PERFILES  */}
        <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 mt-12 text-sm">
          <thead>
            <tr>
              <th className="p-3 text-gray-700">NUMERO</th>
              <th className="p-3 text-gray-700">DETALLE</th>
              <th className="p-3 text-gray-700">CATEGORIA</th>
              <th className="p-3 text-gray-700">PRECIO X UNIDAD</th>
              <th className="p-3 text-gray-700">EDITAR</th>
              <th className="p-3 text-gray-700">ELIMINAR</th>
            </tr>
          </thead>
          <tbody>
            {accesorios?.map((p) => (
              <tr>
                <th className="border-[1px] border-gray-300 p-3 text-sm uppercase text-teal-500 font-semibold">
                  {p?.id}
                </th>
                <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                  {p?.detalle}
                </th>
                <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                  {p.categoria}
                </th>
                <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                  $ {p.precio_unidad}
                </th>
                <th className="border-[1px] border-gray-300 p-3 text-sm uppercase bg-teal-200 text-teal-800 hover:bg-teal-500 hover:text-white transition-all ease-in-out font-semibold cursor-pointer">
                  <button>EDITAR</button>
                </th>
                <th className="border-[1px] border-gray-300 p-3 text-sm uppercase bg-red-100 text-red-600 hover:text-white hover:bg-red-500 transition-all ease-in-out  font-semibold cursor-pointer">
                  <button
                    onClick={() => {
                      obtenerParamsId(p.id), openModalEliminar();
                    }}
                    type="button"
                  >
                    ELIMINAR
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {/* FIN TABLA */}
      </div>
      <ModalCrearNuevoAccesorio isOpen={isOpen} closeModal={closeModal} />
      <ModalEliminarAccesorios />
    </section>
  );
};
