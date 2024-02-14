import axios from "./axios";

export const crearNuevoPerfil = (data) => axios.post("/perfiles", data);

export const obtenerPerfiles = () => axios.get("/perfiles");

export const editarPerfil = (obtenerParams, data) =>
  axios.put(`/perfiles/${obtenerParams}`, data);

export const obtenerUnicoPerfil = (obtenerParams) =>
  axios.get(`/perfiles/${obtenerParams}`);

export const eliminarPerfil = (id) => axios.delete(`/perfiles/${id}`);
