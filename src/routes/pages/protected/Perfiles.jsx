import { useState } from "react";
import { ModalCrearNuevoPerfil } from "../../../components/perfiles/ModalCrearNuevoPerfil";
import { ModalEliminarPerfil } from "../../../components/perfiles/ModalEliminarPerfil";
import { Search } from "../../../components/ui/Search";
import { usePerfilesContex } from "../../../context/PerfilesProvider";
import { ModalEditarPerfil } from "../../../components/perfiles/ModalEditarPerfil";
import { Link } from "react-router-dom";

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
          to={"/perfiles"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Perfiles
        </Link>
      </div>
      <div className="flex flex-col gap-5 mx-10 mt-10">
        <div className="flex gap-2 items-center max-md:flex-col max-md:gap-3 bg-white py-5 px-5 ">
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
              className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-1.5 flex gap-2 items-center"
            >
              CREAR NUEVO PERFIL
            </button>
          </div>
        </div>

        <div className="bg-white uppercase">
          <table className=" table">
            <thead>
              <tr>
                <th className="py-5 text-indigo-600">CODIGO</th>
                <th className="py-5 text-indigo-600">DETALLE</th>
                <th className="py-5 text-indigo-600">COLOR</th>
                <th className="py-5 text-indigo-600">CATEGORIA</th>
                <th className="py-5 text-indigo-600">PESO NETO BARRA</th>
                <th className="py-5 text-indigo-600">EDITAR</th>
                <th className="py-5 text-indigo-600">ELIMINAR</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {results?.map((p) => (
                <tr className="cursor-pointer">
                  <th>{p?.codigo}</th>
                  <th>{p?.detalle}</th>
                  <th>{p.color}</th>
                  <th>{p.categoria}</th>
                  <th>{p.peso_barra_6_mts}</th>
                  <th
                    onClick={() => {
                      handleObtenerId(p.id), openEditarPerfil();
                    }}
                    className="p-3 uppercase cursor-pointer text-center"
                  >
                    <button
                      className="bg-indigo-500 py-1.5 px-6 rounded text-white font-semibold"
                      type="button"
                    >
                      {" "}
                      EDITAR
                    </button>
                  </th>
                  <th
                    onClick={() => {
                      obtenerParamsId(p.id), openModalEliminar();
                    }}
                  >
                    <button
                      className="bg-red-500 py-1.5 px-6 rounded text-white font-semibold"
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
