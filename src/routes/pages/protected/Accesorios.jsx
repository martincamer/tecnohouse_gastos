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
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-20">
      <div className="bg-white max-md:py-0 max-md:px-0 max-md:border-none max-md:shadow-none py-10 px-10 rounded-xl shadow  border-[1px] border-slate-300">
        {/*  INTRO */}
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-2">
          <p
            className="
        text-xl font-semibold text-slate-700 max-md:text-lg max-md:underline"
          >
            ACCESORIOS
          </p>
          <div className="border-[0.5px] shadow-md shadow-black/20 rounded-lg px-4 py-2 bg-white">
            <p
              className="
        text-lg font-semibold text-slate-700 max-md:text-sm"
            >
              TOTAL ACCESORIOS CARGADOS: <span>{accesorios.length}</span>
            </p>
          </div>
        </div>
        {/* FIN INTRO */}
        <hr className="my-10 bg-indigo-500 h-[2px]" />
        {/* CATEGORIAS */}
        <div className="flex gap-10 max-md:flex-col max-md:gap-3">
          <button
            onClick={() => openModal()}
            className="border-gray-300 max-md:text-sm shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500"
          >
            CREAR NUEVO ACCESORIO
          </button>

          <button
            onClick={() => openCrearCategoria()}
            className="border-gray-300 max-md:text-sm shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500"
          >
            CREAR NUEVA CATEGORIA
          </button>

          {/* <button
            // onClick={() => openModal()}
            className="border-gray-300 max-md:text-sm shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
          >
            CREAR NUEVO COLOR
          </button> */}

          <button
            onClick={() => openVerCategorias()}
            className="border-gray-300 max-md:text-sm shadow rounded-xl border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-500/10 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md hover:shadow-black/10 hover:border-indigo-500"
          >
            VER CATEGORIAS
          </button>

          {/* <button
            // onClick={() => openModal()}
            className="border-gray-300 shadow rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-teal-400 transition-all ease-in-out duration-400 hover:text-white hover:shadow-md hover:shadow-black/10 hover:border-teal-400"
          >
            VER COLORES
          </button> */}
        </div>
        {/* FIN CATEGORIAS */}
        <div className="mt-10 max-md:mt-6 max-md:w-full">
          <Search
            value={search}
            searcher={searcher}
            variable={"BUSCAR POR EL DETALLE, NUMERO..."}
          />
        </div>
        {/* TABLA DE PERFILES  */}
        <div className="overflow-x-scroll">
          <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 mt-12 text-sm bg-white">
            <thead>
              <tr>
                <th className="p-3 max-md:text-xs text-gray-700">NUMERO</th>
                <th className="p-3 max-md:text-xs text-gray-700">DETALLE</th>
                <th className="p-3 max-md:text-xs text-gray-700">CATEGORIA</th>
                <th className="p-3 max-md:text-xs text-gray-700">
                  PRECIO X UNIDAD
                </th>
                <th className="p-3 max-md:text-xs text-gray-700">EDITAR</th>
                <th className="p-3 max-md:text-xs text-gray-700">ELIMINAR</th>
              </tr>
            </thead>
            <tbody>
              {currentResults?.map((p) => (
                <tr>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs text-sm uppercase text-indigo-500 font-semibold">
                    {p?.id}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                    {p?.detalle}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
                    {p.categoria}
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs font-medium text-sm uppercase">
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
                    className="border-[1px] border-gray-300 p-3 max-md:text-xs text-sm uppercase bg-indigo-300 text-indigo-800 hover:bg-indigo-500 hover:text-white transition-all ease-in-out font-semibold cursor-pointer"
                  >
                    <button>EDITAR</button>
                  </th>
                  <th className="border-[1px] border-gray-300 p-3 max-md:text-xs text-sm uppercase bg-red-100 text-red-600 hover:text-white hover:bg-red-500 transition-all ease-in-out  font-semibold cursor-pointer">
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
        </div>

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
        {/* FIN TABLA */}
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
