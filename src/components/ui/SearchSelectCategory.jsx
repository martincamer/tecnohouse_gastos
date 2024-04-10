export const SearchSelectCategory = ({
  categoriaSeleccionada,
  handleCategoriaChange,
}) => {
  return (
    <div>
      <select
        value={categoriaSeleccionada}
        onChange={handleCategoriaChange}
        className="bg-white py-2 px-4 text-sm uppercase border-[1px] border-slate-300 rounded-xl w-full"
      >
        <option>TODAS LAS CATEGORIAS</option>
        <option value="herrero">HERRERO</option>
        <option value="modena">MODENA</option>
      </select>
    </div>
  );
};
