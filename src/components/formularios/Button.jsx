import React from "react";

export const Button = ({ type, titulo }) => {
  return (
    <button
      className="bg-indigo-500 py-2 px-6 w-full rounded-full font-bold text-white text-sm hover:shadow-md transition-all ease-linear"
      type={type}
    >
      {titulo}
    </button>
  );
};
