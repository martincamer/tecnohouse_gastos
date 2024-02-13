import axios from "./axios";

export const crearGastoNuevo = (data) => axios.post("/gastos", data);

export const obtenerGastos = () => axios.get("/gastos");

export const obtenerGastosMensuales = () => axios.get("/gastos/mes");

export const editarGasto = (obtenerParams, data) =>
  axios.put(`/gastos/${obtenerParams}`, data);

export const obtenerUnicoGasto = (obtenerParams) =>
  axios.get(`/gastos/${obtenerParams}`);

export const eliminarGasto = (id) => axios.delete(`/gastos/${id}`);
