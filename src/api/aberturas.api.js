import axios from "./axios";

export const crearAbertura = (data) => axios.post("/aberturas", data);

export const obtenerAberturasApi = () => axios.get("/aberturas");

export const obtenerUnicaAbertura = (id) => axios.get(`/aberturas/${id}`);

// export const editarAberturas = (obtenerId, data) =>
//   axios.put(`/aberturas/${obtenerId}`, data);

export const eliminarAbertura = (id) => axios.delete(`/aberturas/${id}`);
