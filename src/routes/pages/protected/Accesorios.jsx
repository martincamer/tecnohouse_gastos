import { ModalCrearNuevoAccesorio } from "../../../components/accesorios/ModalCrearNuevoAccesorio";
import { ModalEliminarAccesorios } from "../../../components/accesorios/ModalEliminarAccesorios";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { Search } from "../../../components/ui/Search";
import { useState } from "react";
import { ModalEditarPerfil } from "../../../components/accesorios/ModalEditarPerfil";
import { ModalCrearCategoria } from "../../../components/accesorios/ModalCrearCategoria";
import { ModalVerCat } from "../../../components/accesorios/ModalVerCat";
import { Link } from "react-router-dom";

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

  // const itemsPerPage = 8; // Cantidad de elementos por página
  // const [currentPage, setCurrentPage] = useState(1);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentResults = results?.slice(indexOfFirstItem, indexOfLastItem);

  // const totalPages = Math.ceil(results?.length / itemsPerPage);

  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  // };

  return (
    <section className="w-full pb-24">
      <div className="bg-white mb-4 h-10 flex">
        <Link
          to={"/"}
          className="bg-blue-100 flex h-full px-4 justify-center items-center font-bold text-indigo-600"
        >
          Inicio
        </Link>{" "}
        <Link
          to={"/accesorios"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Accesorios
        </Link>
      </div>
      <div className="flex flex-col gap-5 mx-10 mt-10">
        <div className="flex gap-2 max-md:flex-col max-md:gap-3 bg-white py-5 px-5 ">
          <button
            onClick={() => openModal()}
            className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2 flex gap-2 items-center"
          >
            CREAR NUEVO ACCESORIO
          </button>

          <button
            onClick={() => openCrearCategoria()}
            className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2 flex gap-2 items-center"
          >
            CREAR NUEVA CATEGORIA
          </button>

          <button
            onClick={() => openVerCategorias()}
            className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2 flex gap-2 items-center"
          >
            VER CATEGORIAS
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

        <div className="bg-white uppercase">
          <table className=" table">
            <thead>
              <tr>
                <th className="py-5 text-indigo-600">NUMERO</th>
                <th className="py-5 text-indigo-600">DETALLE</th>
                <th className="py-5 text-indigo-600">CATEGORIA</th>
                <th className="py-5 text-indigo-600">PRECIO X UNIDAD</th>
                <th className="py-5 text-indigo-600">EDITAR</th>
                <th className="py-5 text-indigo-600">ELIMINAR</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {results?.map((p) => (
                <tr>
                  <th>{p?.id}</th>
                  <th>{p?.detalle}</th>
                  <th>{p.categoria}</th>
                  <th>
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
                    <button className="bg-indigo-500 py-1.5 px-6 rounded text-white font-semibold">
                      EDITAR
                    </button>
                  </th>
                  <th>
                    <button
                      className="bg-red-500 py-1.5 px-6 rounded text-white font-semibold"
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
        {/* {totalPages > 1 && (
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
        )} */}
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
