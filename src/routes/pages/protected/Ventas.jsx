import { CrearGastosCategorias } from "../../../components/ventas/CrearGastosCategorias";
import { GastosIntro } from "../../../components/ventas/GastosIntro";
import { ModalCrearVenta } from "../../../components/ventas/ModalCrearGastos";
import { ModalEliminarGasto } from "../../../components/ventas/ModalEliminarGasto";
import { TableGastos } from "../../../components/ventas/TableGastos";
import { Search } from "../../../components/ui/Search";
import { useVentasContext } from "../../../context/VentasProvider";
// import { SearchSelect } from "../../../components/ui/SearchSelect";
// import { SearchSelectAnio } from "../../../components/ui/SearchSelectAnio";

export const Ventas = () => {
  const {
    search,
    searcher,
    results,
    // categoriaSeleccionada,
    // handleCategoriaChange,
    // anioSeleccionado,
    // handleAnioChange,
  } = useVentasContext();

  return (
    <section className="w-full py-24 px-12 max-md:px-4 flex flex-col gap-8">
      <GastosIntro />
      <CrearGastosCategorias results={results} />
      <div className="border-slate-300 rounded-xl border-[1px] shadow py-5 px-10 flex gap-12 items-center bg-white">
        <Search
          variable={"Buscar tipo de venta..."}
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
      <ModalCrearVenta />
      <ModalEliminarGasto />
    </section>
  );
};
