import { useState } from "react";
import { ModalCrearNuevoPerfil } from "../../../components/perfiles/ModalCrearNuevoPerfil";
import { ModalEliminarPerfil } from "../../../components/perfiles/ModalEliminarPerfil";
import { Search } from "../../../components/ui/Search";
import { usePerfilesContex } from "../../../context/PerfilesProvider";
import { ModalEditarPerfil } from "../../../components/perfiles/ModalEditarPerfil";

export const Perfiles = () => {
  const {
    isOpen,
    closeModal,
    openModal,
    perfiles,
    openModalEliminar,
    obtenerParamsId,
    results,
    search,
    searcher,
  } = usePerfilesContex();

  const [isOpenEditar, setIsOpenEditar] = useState(false);
  const [obtenerId, setObtenerId] = useState("");

  function openEditarPerfil() {
    setIsOpenEditar(true);
  }

  function closeEditarPerfil() {
    setIsOpenEditar(false);
  }

  const handleObtenerId = (id) => {
    setObtenerId(id);
  };

  const itemsPerPage = 8; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(results?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <section className="w-full py-24 px-12 max-md:px-4 flex flex-col gap-20 max-md:py-2">
      <div className="py-10 px-10 max-md:px-2 rounded-xl shadow  border-[1px] border-slate-200  max-md:border-none max-md:shadow-none">
        {/*  INTRO */}
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-2">
          <p
            className="
        text-xl font-semibold text-slate-700 max-md:text-lg max-md:underline"
          >
            PERFILES
          </p>
          <div className="border-[0.5px] shadow-md shadow-black/20 rounded-lg px-4 py-2 bg-white">
            <p
              className="
        text-lg font-semibold text-slate-700 max-md:text-sm"
            >
              TOTAL PERFILES CARGADOS: <span>{perfiles.length}</span>
            </p>
          </div>
        </div>
        {/* FIN INTRO */}
        <hr className="my-10 bg-indigo-500 h-[2px]" />
        {/* CATEGORIAS */}
        <div className="flex gap-10 ">
          <button
            onClick={() => openModal()}
            className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500 bg-white max-md:text-xs"
          >
            CREAR NUEVO PERFIL
          </button>
        </div>
        {/* FIN CATEGORIAS */}
        <div className="mt-10 max-md:mt-5">
          <Search
            value={search}
            searcher={searcher}
            variable={"Buscar por el detalle, codigo..."}
          />
        </div>
        {/* TABLA DE PERFILES  */}
        <div className="max-md:overflow-x-scroll ">
          <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 mt-12 text-sm bg-white">
            <thead>
              <tr>
                <th className="p-3 max-md:text-xs text-gray-700">CODIGO</th>
                <th className="p-3 max-md:text-xs text-gray-700">DETALLE</th>
                <th className="p-3 max-md:text-xs text-gray-700">COLOR</th>
                <th className="p-3 max-md:text-xs text-gray-700">CATEGORIA</th>
                <th className="p-3 max-md:text-xs text-gray-700">
                  PESO NETO BARRA
                </th>
                <th className="p-3 max-md:text-xs text-gray-700">EDITAR</th>
                <th className="p-3 max-md:text-xs text-gray-700">ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {currentResults?.map((p) => (
                <tr>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs text-sm uppercase text-indigo-500 font-semibold">
                    {p?.codigo}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                    {p?.detalle}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                    {p.color}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                    {p.categoria}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                    {p.peso_barra_6_mts}
                  </th>
                  <th
                    onClick={() => {
                      handleObtenerId(p.id), openEditarPerfil();
                    }}
                    className="border-[1px] border-gray-300 p-3 max-md:text-xs text-sm uppercase bg-indigo-300 text-indigo-800 hover:bg-indigo-500 hover:text-white transition-all ease-in-out font-semibold cursor-pointer"
                  >
                    <button type="button">EDITAR</button>
                  </th>
                  <th
                    onClick={() => {
                      obtenerParamsId(p.id), openModalEliminar();
                    }}
                    className="border-[1px] border-gray-300 p-3 max-md:text-xs text-sm uppercase bg-red-100 text-red-600 hover:text-white hover:bg-red-500 transition-all ease-in-out  font-semibold cursor-pointer"
                  >
                    <button type="button">ELIMINAR</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* FIN TABLA */}

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-4 mb-4 gap-4 max-md:gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-indigo-500 hover:bg-slate-700 transition-all ease-in-out text-white shadow shadow-black/20 max-md:text-xs"
                    : "bg-gray-100 shadow shadow-black/20 max-md:text-xs"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <ModalCrearNuevoPerfil isOpen={isOpen} closeModal={closeModal} />
      <ModalEliminarPerfil />
      <ModalEditarPerfil
        obtenerId={obtenerId}
        closeEditarPerfil={closeEditarPerfil}
        isOpenEditar={isOpenEditar}
      />
    </section>
  );
};
