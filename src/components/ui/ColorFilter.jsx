import React from "react";

const ColorFilter = ({ colorSeleccionado, handleColorChange }) => {
  const colores = ["BLANCO", "NEGRO", "GRIS", "NATURAL", ""]; // Agrega los colores disponibles

  return (
    <div>
      <select
        id="colorFilter"
        value={colorSeleccionado}
        onChange={handleColorChange}
        className="bg-white max-md:text-sm border-[1px] border-gray-300 text-gray-700 font-bold rounded-md shadow-black/20 shadow-md py-3 px-3 w-[200px] placeholder:text-gray-500/90 outline-none uppercase"
      >
        <option value="">Todos los colores</option>
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
