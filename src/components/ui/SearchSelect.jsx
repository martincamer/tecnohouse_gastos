export const SearchSelect = ({
  categoriaSeleccionada,
  handleCategoriaChange,
}) => {
  return (
    <div>
      <select
        value={categoriaSeleccionada}
        onChange={handleCategoriaChange}
        className="bg-white max-md:text-sm border-[1px] border-gray-300 text-gray-700 font-bold rounded-md shadow-black/20 shadow-md py-3 px-3 w-[200px] placeholder:text-gray-500/90 outline-none"
      >
        <option>SELECCIONAR MES</option>
        <option value="1">ENERO</option>
        <option value="2">FEBRERO</option>
      </select>
    </div>
  );
};
