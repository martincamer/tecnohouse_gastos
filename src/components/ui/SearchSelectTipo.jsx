export const SearchSelectTipo = ({ handleTipoChange, tipoSeleccionado }) => {
  return (
    <div>
      <select
        value={tipoSeleccionado}
        onChange={handleTipoChange}
        className="bg-white max-md:text-sm border-[1px] border-gray-300 text-gray-700 font-bold rounded-md shadow-black/20 shadow-md py-3 px-3 w-[175px] placeholder:text-gray-500/90 outline-none"
      >
        <option>TODOS LOS TIPOS</option>
        <option value="ventana">VENTANA</option>
        <option value="puerta">PUERTA</option>
      </select>
    </div>
  );
};
