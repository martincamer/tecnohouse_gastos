import { CrearNuevosPresupuestosCats } from "../../../components/generarPresupuesto/CrearNuevosPresupuestosCats";
import { IntroPresupuesto } from "../../../components/generarPresupuesto/introPresupuesto";
import { SearchSelectCategory } from "../../../components/ui/SearchSelectCategory";
import { Search } from "../../../components/ui/Search";
import { ModalCrearPresupuesto } from "../../../components/generarPresupuesto/ModalCrearPresupuesto";

export const GenerarPresupuesto = () => {
  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-5">
      <IntroPresupuesto />
      <CrearNuevosPresupuestosCats />
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center">
        <Search
          variable={"Buscar por el cliente o numero..."}
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

        <ModalCrearPresupuesto />
      </div>
    </section>
  );
};
