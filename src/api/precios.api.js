import axios from "./axios";

export const crearNuevoPrecio = (data) => axios.post("/precios", data);

export const obtenerPrecios = () => axios.get("/precios");

export const obtenerPrecio = (obtenerId) => axios.get(`/precios/${obtenerId}`);

export const editarPrecio = (obtenerId, data) =>
  axios.put(`/precios/${obtenerId}`, data);

export const eliminarPrecio = (id) => axios.delete(`/precios/${id}`);
