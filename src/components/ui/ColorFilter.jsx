import React from "react";

const ColorFilter = ({ colorSeleccionado, handleColorChange }) => {
  const colores = ["blanco", "negro", "gris", "natural", "blanco brillante"]; // Agrega los colores disponibles

  return (
    <div>
      <select
        id="colorFilter"
        value={colorSeleccionado}
        onChange={handleColorChange}
        className="bg-white py-2 px-4 text-sm uppercase border-[1px] border-slate-300 rounded-xl w-full"
      >
        <option value="">TODOS LOS COLORES</option>
        {colores.map((color) => (
          <option key={color} value={color.toLowerCase()}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorFilter;
