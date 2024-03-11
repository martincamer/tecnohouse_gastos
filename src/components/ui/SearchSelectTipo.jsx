export const SearchSelectTipo = ({ handleTipoChange, tipoSeleccionado }) => {
  return (
    <div>
      <select
        value={tipoSeleccionado}
        onChange={handleTipoChange}
        className="bg-white text-sm border-[1px] border-slate-300 text-gray-700 font-bold rounded-xl shadow-black/20 shadow-md py-3 px-3 w-[230px] placeholder:text-gray-500/90 outline-none"
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
