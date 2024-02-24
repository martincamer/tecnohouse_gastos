import { AberturasIntro } from "../../../components/aberturas/AberturasIntro";
import { CrearAberturasCategorias } from "../../../components/aberturas/CrearAberturasCategorias";
import { ModalCrearNuevaAbertura } from "../../../components/aberturas/ModalCrearAbertura";
import { TableAberturas } from "../../../components/aberturas/TableAberturas";
import { ModalPrecios } from "../../../components/precios/ModalPrecios";
import ColorFilter from "../../../components/ui/ColorFilter";
import { Search } from "../../../components/ui/Search";
import { SearchSelectCategory } from "../../../components/ui/SearchSelectCategory";
import { SearchSelectTipo } from "../../../components/ui/SearchSelectTipo";
import { useAberturasContext } from "../../../context/AberturasProvider";

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
  } = useAberturasContext();
  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-5">
      <AberturasIntro />
      <CrearAberturasCategorias /*results={results}*/ />
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center">
        <Search
          variable={"Buscar por el detalle..."}
          search={search}
          searcher={searcher}
        />
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
      <TableAberturas />
      <ModalCrearNuevaAbertura />
      <ModalPrecios />
    </section>
  );
};
