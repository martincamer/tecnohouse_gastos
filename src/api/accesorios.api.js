import axios from "./axios";

export const crearNuevoAccesorio = (data) => axios.post("/accesorios", data);

export const obtenerAccesorios = () => axios.get("/accesorios");

export const editarAccesorio = (obtenerParams, data) =>
  axios.put(`/accesorios/${obtenerParams}`, data);

export const obtenerUnicoAccesorio = (obtenerParams) =>
  axios.get(`/accesorios/${obtenerParams}`);

export const eliminarAccesorio = (id) => axios.delete(`/accesorios/${id}`);
