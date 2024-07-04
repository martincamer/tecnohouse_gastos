import { CrearAberturasCategorias } from "../../../components/aberturas/CrearAberturasCategorias";
import { ModalCrearNuevaAbertura } from "../../../components/aberturas/ModalCrearAbertura";
import { TableAberturas } from "../../../components/aberturas/TableAberturas";
import { ModalPrecios } from "../../../components/precios/ModalPrecios";
import { Search } from "../../../components/ui/Search";
import { SearchSelectCategory } from "../../../components/ui/SearchSelectCategory";
import { SearchSelectTipo } from "../../../components/ui/SearchSelectTipo";
import { useAberturasContext } from "../../../context/AberturasProvider";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { usePerfilesContex } from "../../../context/PerfilesProvider";
import { ToastContainer } from "react-toastify";
import { ModalEditarAbertura } from "../../../components/aberturas/ModalEditarAbertura";
import { useState } from "react";
import ColorFilter from "../../../components/ui/ColorFilter";
import { Link } from "react-router-dom";

export const AberturasCostos = () => {
  const {
    handleCategoriaChange,
    searcher,
    search,
    categoriaSeleccionada,
    handleTipoChange,
    tipoSeleccionado,
    colorSeleccionado,
    handleColorChange,
    obtenerAberturas,
  } = useAberturasContext();

  const { perfiles } = usePerfilesContex();
  const { accesorios } = useAccesoriosContext();

  const fechaActual = new Date();

  const [obtenerId, setObtenerId] = useState("");

  const handleId = (id) => setObtenerId(id);

  const [isOpen, setOpen] = useState(false);

  const openModal = () => setOpen(true);

  const closeModal = () => setOpen(false);

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="bg-white mb-4 h-10 flex">
        <Link
          to={"/"}
          className="bg-blue-100 flex h-full px-4 justify-center items-center font-bold text-indigo-600"
        >
          Inicio
        </Link>{" "}
        <Link
          to={"/"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Aberturas costós
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-5 bg-white py-5 px-5 mx-5">
        <article class="py-5 px-5 border flex flex-col gap-2">
          <div>
            <p class="text-sm text-gray-500 font-semibold">
              Total aberturas Cargadas en el sistema.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {obtenerAberturas.length}
            </p>
          </div>

          <div className="flex">
            <div class="mt-1 flex gap-2 bg-indigo-500 text-white py-2 rounded px-4 items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <p class="flex gap-2 text-xs">
                <span class="font-medium">
                  {" "}
                  {Number(obtenerAberturas.length / 10).toFixed(2)}%{" "}
                </span>

                <span class="text-white"> PORCENTAJE FINAL GENERADO </span>
              </p>
            </div>
          </div>
        </article>
        <article class="py-5 px-5 border flex flex-col gap-2">
          <div>
            <p class="text-sm text-gray-500 font-semibold">
              Total perfiles cargados en el sistema
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {perfiles.length}
            </p>
          </div>

          <div className="flex">
            <div class="mt-1 flex gap-2 bg-indigo-500 text-white py-2 rounded px-4 items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <p class="flex gap-2 text-xs">
                <span class="font-medium">
                  {" "}
                  {Number(perfiles.length / 10).toFixed(2)}%{" "}
                </span>

                <span class="text-white"> PORCENTAJE FINAL GENERADO </span>
              </p>
            </div>
          </div>
        </article>
        <article class="py-5 px-5 border flex flex-col gap-2">
          <div>
            <p class="text-sm text-gray-500 font-semibold">
              Total accesorios cargados en el sistema
            </p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base">
              {accesorios.length}
            </p>
          </div>

          <div className="flex">
            <div class="mt-1 flex gap-2 bg-indigo-500 text-white py-2 rounded px-4 items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <p class="flex gap-2 text-xs">
                <span class="font-medium">
                  {" "}
                  {Number(accesorios.length / 10).toFixed(2)}%{" "}
                </span>

                <span class="text-white-500"> PORCENTAJE FINAL GENERADO </span>
              </p>
            </div>
          </div>
        </article>
        <article class="py-5 px-5 border flex flex-col gap-2">
          <div>
            <p class="text-sm text-gray-500 font-semibold">MES Y DIA</p>

            <p class="text-2xl font-medium text-gray-900 max-md:text-base uppercase">
              {fechaActual.toLocaleString("es-AR", { month: "long" })}
            </p>
          </div>

          <div className="flex">
            <div class="mt-1 flex gap-2 bg-indigo-500 text-white py-2 rounded px-4 items-center justify-start">
              <p class="flex gap-2 text-xs">
                <span class="font-medium">
                  DIA Y HORA :{" "}
                  {fechaActual.toLocaleString("es-AR", { hour12: "" })}
                </span>
              </p>
            </div>
          </div>
        </article>
      </div>
      <CrearAberturasCategorias />
      <div className="grid grid-cols-4 gap-3 items-center mx-5">
        <Search
          variable={"Buscar por el detalle..."}
          search={search}
          searcher={searcher}
        />
        <div className="flex gap-2 w-full">
          <SearchSelectCategory
            categoriaSeleccionada={categoriaSeleccionada}
            handleCategoriaChange={handleCategoriaChange}
          />
          <SearchSelectTipo
            handleTipoChange={handleTipoChange}
            tipoSeleccionado={tipoSeleccionado}
          />
          <ColorFilter
            colorSeleccionado={colorSeleccionado}
            handleColorChange={handleColorChange}
          />
        </div>
      </div>
      <TableAberturas openModal={openModal} handleId={handleId} />
      <ModalCrearNuevaAbertura />
      <ModalEditarAbertura
        obtenerId={obtenerId}
        closeModal={closeModal}
        isOpen={isOpen}
      />
      <ModalPrecios />
    </section>
  );
};
