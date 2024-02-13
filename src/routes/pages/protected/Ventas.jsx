import { CrearGastosCategorias } from "../../../components/ventas/CrearGastosCategorias";
import { GastosIntro } from "../../../components/ventas/GastosIntro";
import { ModalCrearGastos } from "../../../components/ventas/ModalCrearGastos";
import { ModalEliminarGasto } from "../../../components/ventas/ModalEliminarGasto";
import { TableGastos } from "../../../components/ventas/TableGastos";
import { Search } from "../../../components/ui/Search";
import { SearchSelect } from "../../../components/ui/SearchSelect";
import { SearchSelectAnio } from "../../../components/ui/SearchSelectAnio";
import { useVentasContext } from "../../../context/VentasProvider";

export const Ventas = () => {
  const {
    search,
    searcher,
    categoriaSeleccionada,
    handleCategoriaChange,
    anioSeleccionado,
    handleAnioChange,
    results,
  } = useVentasContext();

  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-8">
      <GastosIntro />
      <CrearGastosCategorias results={results} />
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-5 px-10 flex gap-12 items-center">
        <Search
          variable={"Buscar tipo de venta..."}
          search={search}
          searcher={searcher}
        />
        <SearchSelect
          categoriaSeleccionada={categoriaSeleccionada}
          handleCategoriaChange={handleCategoriaChange}
        />
        <SearchSelectAnio
          anioSeleccionado={anioSeleccionado}
          handleAnioChange={handleAnioChange}
        />
      </div>
      <TableGastos />
      <ModalCrearGastos />
      <ModalEliminarGasto />
    </section>
  );
};
