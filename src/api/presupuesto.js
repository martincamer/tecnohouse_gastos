import axios from "./axios";

export const crearPresupuesto = (data) => axios.post("/presupuestos", data);

export const obtenerPresupuestosApi = () => axios.get("/presupuestos");

export const obtenerUnicosPresupuestos = (id) =>
  axios.get(`/presupuestos/${id}`);

// // export const editarAberturas = (obtenerId, data) =>
// //   axios.put(`/aberturas/${obtenerId}`, data);

// export const eliminarAbertura = (id) => axios.delete(`/aberturas/${id}`);
