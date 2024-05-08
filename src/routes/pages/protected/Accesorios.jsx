import { ModalCrearNuevoAccesorio } from "../../../components/accesorios/ModalCrearNuevoAccesorio";
import { ModalEliminarAccesorios } from "../../../components/accesorios/ModalEliminarAccesorios";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { Search } from "../../../components/ui/Search";
import { useState } from "react";
import { ModalEditarPerfil } from "../../../components/accesorios/ModalEditarPerfil";
import { ModalCrearCategoria } from "../../../components/accesorios/ModalCrearCategoria";
import { ModalVerCat } from "../../../components/accesorios/ModalVerCat";

export const Accesorios = () => {
  const {
    isOpen,
    closeModal,
    openModal,
    accesorios,
    openModalEliminar,
    obtenerParamsId,
    results,
    search,
    searcher,
  } = useAccesoriosContext();

  const [isOpenEditar, setIsOpenEditar] = useState(false);
  const [isOpenCrearCategoria, setIsOpenCrearCategoria] = useState(false);
  const [isOpenVerCat, setIsOpenVerCat] = useState(false);
  const [obtenerId, setObtenerId] = useState("");

  function openEditarPerfil() {
    setIsOpenEditar(true);
  }

  function closeEditarPerfil() {
    setIsOpenEditar(false);
  }

  function openCrearCategoria() {
    setIsOpenCrearCategoria(true);
  }

  function closeCrearCategoria() {
    setIsOpenCrearCategoria(false);
  }

  function openVerCategorias() {
    setIsOpenVerCat(true);
  }

  function closeVerCategorias() {
    setIsOpenVerCat(false);
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
    <section className="w-full py-24 px-5 max-md:px-4">
      <div className="flex flex-col gap-5 px-5">
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-2">
          <p
            className="
        text-xl font-semibold text-slate-700 max-md:text-lg underline"
          >
            ACCESORIOS
          </p>
          <div className="border-[1px] border-slate-300 rounded-xl py-2 px-3 shadow">
            <p
              className="
        text-base font-semibold text-indigo-700 max-md:text-sm"
            >
              TOTAL ACCESORIOS CARGADOS: <span>{accesorios.length}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-10 max-md:flex-col max-md:gap-3">
          <button
            onClick={() => openModal()}
            className="bg-indigo-100 hover:bg-indigo-600 hover:text-white transition-all ease-linear text-indigo-700 py-3 px-4 rounded-xl text-sm flex gap-2 items-center"
          >
            CREAR NUEVO ACCESORIO
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>

          <button
            onClick={() => openCrearCategoria()}
            className="bg-indigo-100 hover:bg-indigo-600 hover:text-white transition-all ease-linear text-indigo-700 py-3 px-4 rounded-xl text-sm flex gap-2 items-center"
          >
            CREAR NUEVA CATEGORIA
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>

          <button
            onClick={() => openVerCategorias()}
            className="bg-indigo-100 hover:bg-indigo-600 hover:text-white transition-all ease-linear text-indigo-700 py-3 px-4 rounded-xl text-sm flex gap-2 items-center"
          >
            VER CATEGORIAS
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
                d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>
        {/* FIN CATEGORIAS */}
        <div className="mt-3 w-1/4">
          <Search
            value={search}
            searcher={searcher}
            variable={"BUSCAR POR EL DETALLE, NUMERO..."}
          />
        </div>
        <div className="md:hidden max-md:flex  flex-col gap-4 max-md:mt-3">
          {currentResults?.map((g, index) => (
            <div
              className="rounded-xl bg-white shadow border-[1px] border-slate-300 py-2 px-3"
              key={index}
            >
              <div className="flex justify-between gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-slate-700 text-xs font-semibold uppercase">
                    {g.categoria}
                  </p>

                  <p className="text-slate-700 text-xs uppercase">
                    {g.detalle}
                  </p>
                  <p className="text-slate-700 text-xs uppercase">
                    {Number(g.precio_unidad).toLocaleString("es-ar", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    })}
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
        {/* TABLA DE PERFILES  */}
        <div className="max-md:hidden md:block bg-white shadow-xl rounded-2xl transition-all ease-linear cursor-pointer">
          <table className="min-w-full table">
            <thead>
              <tr>
                <th className="p-3 text-sm text-gray-500">NUMERO</th>
                <th className="p-3 text-sm text-gray-500">DETALLE</th>
                <th className="p-3 text-sm text-gray-500">CATEGORIA</th>
                <th className="p-3 text-sm text-gray-500">PRECIO X UNIDAD</th>
                <th className="p-3 text-sm text-gray-500">EDITAR</th>
                <th className="p-3 text-sm text-gray-500">ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {currentResults?.map((p) => (
                <tr>
                  <th className="p-3 max-md:text-xs text-sm uppercase font-semibold">
                    {p?.id}
                  </th>
                  <th className="p-3 max-md:text-xs font-bold text-sm uppercase">
                    {p?.detalle}
                  </th>
                  <th className="p-3 max-md:text-xs font-bold text-sm uppercase">
                    {p.categoria}
                  </th>
                  <th className="p-3 max-md:text-xs font-bold text-sm uppercase">
                    {Number(p.precio_unidad).toLocaleString("es-ar", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    })}
                  </th>
                  <th
                    onClick={() => {
                      handleObtenerId(p.id), openEditarPerfil();
                    }}
                    className="p-3 "
                  >
                    <button className="bg-green-100 text-green-600 rounded-xl py-2 px-4 text-sm font-normal">
                      EDITAR
                    </button>
                  </th>
                  <th className="p-3">
                    <button
                      className="bg-red-100 text-red-800 rounded-xl py-2 px-4 text-sm font-normal"
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
        </div>
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-4 mb-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded-xl ${
                  currentPage === index + 1
                    ? "bg-indigo-500 border border-indigo-500 hover:bg-slate-700 transition-all ease-in-out text-white shadow shadow-black/20 max-md:text-xs"
                    : "bg-white shadow shadow-black/20 max-md:text-xs"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      <ModalCrearNuevoAccesorio isOpen={isOpen} closeModal={closeModal} />
      <ModalEliminarAccesorios />
      <ModalEditarPerfil
        obtenerId={obtenerId}
        closeEditarPerfil={closeEditarPerfil}
        isOpenEditar={isOpenEditar}
      />
      <ModalCrearCategoria
        closeCrearCategoria={closeCrearCategoria}
        isOpenCrearCategoria={isOpenCrearCategoria}
      />
      <ModalVerCat
        isOpenVerCat={isOpenVerCat}
        closeVerCategorias={closeVerCategorias}
      />
    </section>
  );
};
