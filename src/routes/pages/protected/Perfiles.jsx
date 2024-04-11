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
    <section className="w-full py-24 px-5 max-md:px-4 max-md:py-2">
      <div className="flex flex-col gap-8 px-5">
        {/*  INTRO */}
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-2 px-12">
          <p
            className="
        text-xl font-semibold text-slate-700 max-md:text-lg underline"
          >
            PERFILES CARGADOS/CREADOS
          </p>
          <div className="border-[0.5px] shadow rounded-xl px-4 py-2 bg-white">
            <p
              className="
        text-base font-semibold text-indigo-700 max-md:text-sm"
            >
              TOTAL PERFILES CARGADOS: <span>{perfiles.length}</span>
            </p>
          </div>
        </div>
        {/* FIN CATEGORIAS */}
        <div className="flex gap-5 items-center">
          <div className="w-1/4">
            <Search
              value={search}
              searcher={searcher}
              variable={"Buscar por el detalle, codigo..."}
            />
          </div>

          <div>
            <button
              onClick={() => openModal()}
              className="text-sm uppercase py-2 px-6 rounded-xl bg-green-500 text-white hover:shadow-md transition-all ease-linear"
            >
              CREAR NUEVO PERFIL
            </button>
          </div>
        </div>
        {/* TABLA DE PERFILES  */}
        <div className="md:hidden max-md:flex  flex-col gap-4 max-md:mt-3">
          {currentResults?.map((g, index) => (
            <div
              className="rounded-xl bg-white shadow border-[1px] border-slate-300 py-2 px-3"
              key={index}
            >
              <div className="flex justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-slate-700 text-xs font-semibold uppercase">
                    {g.codigo}
                  </p>

                  <p className="text-slate-700 text-xs uppercase">
                    {g.detalle}
                  </p>
                  <p className="text-slate-700 text-xs uppercase">{g.color}</p>
                  <p className="text-slate-700 text-xs uppercase">
                    {g.peso_barra_6_mts}
                  </p>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      handleObtenerId(g.id), openEditarPerfil();
                    }}
                    className="border-indigo-300 border-[1px] rounded-xl shadow py-2 px-4 text-xs bg-indigo-100 text-center text-indigo-800 cursor-pointer"
                  >
                    EDITAR
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      obtenerParamsId(g.id), openModalEliminar();
                    }}
                    className="border-red-300 border-[1px] rounded-xl shadow py-2 px-4 text-xs bg-red-100 text-center text-red-800 cursor-pointer"
                  >
                    ELIMINAR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
        <div className="w-full border-[1px] border-slate-300 rounded-2xl hover:shadow-md transition-all ease-linear">
          <table className="min-w-full text-sm uppercase">
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
                <tr className="cursor-pointer">
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
                    className="border-[1px] border-gray-300 p-3 max-md:text-xs text-sm uppercase cursor-pointer text-center"
                  >
                    <button
                      className="bg-green-100 text-green-700 rounded-xl py-2 px-6 font-normal"
                      type="button"
                    >
                      EDITAR
                    </button>
                  </th>
                  <th
                    onClick={() => {
                      obtenerParamsId(p.id), openModalEliminar();
                    }}
                    className="border-[1px] border-gray-300 p-3 max-md:text-xs text-sm uppercase cursor-pointer"
                  >
                    <button
                      className="bg-red-100 text-red-800 rounded-xl py-2 px-6 font-normal"
                      type="button"
                    >
                      ELIMINAR
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* FIN TABLA */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-4 mb-4 gap-1 max-md:gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-xl ${
                  currentPage === index + 1
                    ? "bg-green-500 text-white"
                    : "bg-white border-[1px] border-slate-300 text-slate-700"
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
