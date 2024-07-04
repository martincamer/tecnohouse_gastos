export const SearchSelectTipo = ({ handleTipoChange, tipoSeleccionado }) => {
  return (
    <div>
      <select
        value={tipoSeleccionado}
        onChange={handleTipoChange}
        className="border border-indigo-500 py-1 px-2 rounded font-semibold text-sm capitalize outline-none"
      >
        <option className="font-bold text-indigo-500" value="">
          Todos los tipos
        </option>
        <option className="font-semibold" value="ventanas">
          Ventanas
        </option>
        <option className="font-semibold" value="puertas">
          Puertas
        </option>
        <option className="font-semibold" value="rajas de abrir">
          Rajas de abrir
        </option>
        <option className="font-semibold" value="paños fijo">
          Paños fijos
        </option>
        <option className="font-semibold" value="portones">
          Portones
        </option>
        <option className="font-semibold" value="celosias de abrir">
          Celosias de abrir
        </option>
        <option className="font-semibold" value="celosias corredizas">
          CEelosias corredizas
        </option>
        <option className="font-semibold" value="puertas de abrir">
          Puertas de abrir
        </option>
      </select>
    </div>
  );
};
