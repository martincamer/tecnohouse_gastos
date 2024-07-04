import React from "react";

const ColorFilter = ({ colorSeleccionado, handleColorChange }) => {
  const colores = ["blanco", "negro", "gris", "natural", "blanco brillante"]; // Agrega los colores disponibles

  return (
    <div>
      <select
        id="colorFilter"
        value={colorSeleccionado}
        onChange={handleColorChange}
        className="border border-indigo-500 py-1 px-2 rounded font-semibold text-sm capitalize outline-none"
      >
        <option className="font-bold text-indigo-500" value="">
          Todos los colores
        </option>
        {colores.map((color) => (
          <option
            className="font-semibold"
            key={color}
            value={color.toLowerCase()}
          >
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorFilter;
