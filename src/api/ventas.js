import axios from "./axios";

export const crearVentaNueva = (data) => axios.post("/ventas", data);

export const obtenerVentas = () => axios.get("/ventas");

export const obtenerVentaMensuales = () => axios.get("/ventas/mes");

export const editarVenta = (obtenerParams, data) =>
  axios.put(`/ventas/${obtenerParams}`, data);

export const obtenerUnicoVenta = (obtenerParams) =>
  axios.get(`/ventas/${obtenerParams}`);

export const eliminarVenta = (id) => axios.delete(`/ventas/${id}`);
