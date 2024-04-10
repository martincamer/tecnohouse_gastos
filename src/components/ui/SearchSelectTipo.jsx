export const SearchSelectTipo = ({ handleTipoChange, tipoSeleccionado }) => {
  return (
    <div>
      <select
        value={tipoSeleccionado}
        onChange={handleTipoChange}
        className="bg-white py-2 px-4 text-sm uppercase border-[1px] border-slate-300 rounded-xl w-full"
      >
        <option>TODOS LOS TIPOS</option>
        <option value="ventanas">VENTANAS</option>
        <option value="puertas">PUERTAS</option>
        <option value="rajas de abrir">RAJAS DE ABRIR</option>
        <option value="paños fijo">PAÑOS FIJO</option>
        <option value="portones">PORTONES</option>
        <option value="celosias de abrir">CELOSIAS DE ABRIR</option>
        <option value="celosias corredizas">CELOSIAS CORREDIZAS</option>
        <option value="puertas de abrir">PUERTAS DE ABRIR</option>
      </select>
    </div>
  );
};
