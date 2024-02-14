import axios from "./axios";

// export const crearCategorias = (data) =>
//   axios.post("/categoria-perfiles", data);

export const obtenerPrecios = () => axios.get("/precios");

// export const editarCategoria = (obtenerId, data) =>
//   axios.put(`/categoria-perfiles/${obtenerId}`, data);

// export const obtenerUnicaCategoria = (id) =>
//   axios.get(`/categoria-perfiles/${id}`);

// export const eliminarCategoria = (id) =>
//   axios.delete(`/categoria-perfiles/${id}`);
