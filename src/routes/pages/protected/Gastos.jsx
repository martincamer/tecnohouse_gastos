import { CrearGastosCategorias } from "../../../components/gastos/CrearGastosCategorias";
import { GastosIntro } from "../../../components/gastos/GastosIntro";
import { ModalCrearGastos } from "../../../components/gastos/ModalCrearGastos";
import { ModalEliminarGasto } from "../../../components/gastos/ModalEliminarGasto";
import { TableGastos } from "../../../components/gastos/TableGastos";
import { Search } from "../../../components/ui/Search";
import { useGastosContext } from "../../../context/GastosProvider";
// import { SearchSelect } from "../../../components/ui/SearchSelect";
// import { SearchSelectAnio } from "../../../components/ui/SearchSelectAnio";

export const Gastos = () => {
  const {
    search,
    searcher,
    // categoriaSeleccionada,
    // handleCategoriaChange,
    // anioSeleccionado,
    // handleAnioChange,
    results,
  } = useGastosContext();

  return (
    <section className="w-full py-24 px-12 max-md:px-4 flex flex-col gap-8">
      <GastosIntro />
      <CrearGastosCategorias results={results} />
      <div className="border-slate-300 rounded-xl border-[1px] shadow py-5 px-10 flex gap-12 items-center">
        <Search
          variable={"Buscar tipo de gasto..."}
          search={search}
          searcher={searcher}
        />
        {/* <SearchSelect
          categoriaSeleccionada={categoriaSeleccionada}
          handleCategoriaChange={handleCategoriaChange}
        />
        <SearchSelectAnio
          anioSeleccionado={anioSeleccionado}
          handleAnioChange={handleAnioChange}
        /> */}
      </div>
      <TableGastos />
      <ModalCrearGastos />
      <ModalEliminarGasto />
    </section>
  );
};
