import { CrearAberturasCategorias } from "../../../components/aberturas/CrearAberturasCategorias";
import { IntroPresupuesto } from "../../../components/generarPresupuesto/introPresupuesto";
import { Search } from "../../../components/ui/Search";
import { SearchSelectCategory } from "../../../components/ui/SearchSelectCategory";

export const GenerarPresupuesto = () => {
  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-5">
      <IntroPresupuesto />
      <CrearAberturasCategorias /*results={results}*/ />
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center">
        <Search
          variable={"Buscar por el detalle..."}
          //   search={search}
          //   searcher={searcher}
        />
        <SearchSelectCategory
        //   categoriaSeleccionada={categoriaSeleccionada}
        //   handleCategoriaChange={handleCategoriaChange}
        />
        {/* <SearchSelectTipo
          handleTipoChange={handleTipoChange}
          tipoSeleccionado={tipoSeleccionado}
        /> */}
      </div>
    </section>
  );
};
