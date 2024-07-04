export const SearchSelectCategory = ({
  categoriaSeleccionada,
  handleCategoriaChange,
}) => {
  return (
    <div>
      <select
        value={categoriaSeleccionada}
        onChange={handleCategoriaChange}
        className="border border-indigo-500 py-1 px-2 rounded font-semibold text-sm capitalize outline-none"
      >
        <option className="font-bold text-indigo-500" value="">
          Todas las categorias
        </option>
        <option className="font-semibold" value="herrero">
          Herrero
        </option>
        <option className="font-semibold" value="modena">
          Modena
        </option>
      </select>
    </div>
  );
};
