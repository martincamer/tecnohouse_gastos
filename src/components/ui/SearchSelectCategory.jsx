export const SearchSelectCategory = ({
  categoriaSeleccionada,
  handleCategoriaChange,
}) => {
  return (
    <div>
      <select
        value={categoriaSeleccionada}
        onChange={handleCategoriaChange}
        className="bg-white max-md:text-sm border-[1px] border-slate-300 text-gray-700 font-bold rounded-xl shadow-black/20 shadow-md py-3 px-3 w-[230px] placeholder:text-gray-500/90 outline-none"
      >
        <option>TODAS LAS CATEGORIAS</option>
        <option value="herrero">HERRERO</option>
        <option value="modena">MODENA</option>
      </select>
    </div>
  );
};
