import { Link } from "react-router-dom";
import { useGastosContext } from "../../../context/GastosProvider";
import { ModalCrearGasto } from "../../../components/gastos/ModalCrearGasto";
import { useState } from "react";
import { formatearFecha } from "../../../helpers/formatearFecha";
import { formatearDinero } from "../../../helpers/formatearDinero";
import client from "../../../api/axios";
import { toast } from "react-toastify";
import { ModalNuevoProveedor } from "../../../components/proveedores/ModalNuevoProveedor";
// import { SearchSelect } from "../../../components/ui/SearchSelect";
// import { SearchSelectAnio } from "../../../components/ui/SearchSelectAnio";

export const Gastos = () => {
  const { gastos, proveedores, setProveedores } = useGastosContext();

  const handleEliminar = async (nombreProveedor, idComprobante) => {
    const res = await client.delete(
      `/proveedores/${nombreProveedor}/comprobantes/${idComprobante}`
    );

    setProveedores(res.data.todosLosProveedores);

    toast.error("¡Eliminado correctamente!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        padding: "12px",
      },
    });
  };

  // Obtener el primer día del mes actual
  const today = new Date();

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Convertir las fechas en formato YYYY-MM-DD para los inputs tipo date
  const fechaInicioPorDefecto = firstDayOfMonth.toISOString().split("T")[0];
  const fechaFinPorDefecto = lastDayOfMonth.toISOString().split("T")[0];

  // Estado inicial de las fechas con el rango del mes actual
  const [fechaInicio, setFechaInicio] = useState(fechaInicioPorDefecto);
  const [fechaFin, setFechaFin] = useState(fechaFinPorDefecto);

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    setFechaFin(e.target.value);
  };

  const [isModalVisible, setModalVisible] = useState(false); // Estado para la visibilidad del modal
  const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

  // Abre el modal y establece la imagen seleccionada
  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  // Variable para almacenar las filas de comprobantes
  let rows = [];
  let totalProveedor = 0;
  let totalComprobantes = 0;

  // Iterar sobre proveedores y parsear comprobantes
  proveedores.forEach((proveedor) => {
    // Parsear comprobantes si existen
    let comprobantes = [];
    if (proveedor.comprobantes) {
      try {
        comprobantes = JSON.parse(proveedor.comprobantes);
      } catch (error) {
        console.error(
          `Error al parsear comprobantes para ${proveedor.proveedor}`,
          error
        );
      }
    }

    // Filtrar por proveedor seleccionado
    if (
      proveedorSeleccionado &&
      proveedor.proveedor !== proveedorSeleccionado
    ) {
      return null; // Salta este proveedor si no coincide con el seleccionado
    }

    // Filtrar por rango de fechas
    if (fechaInicio && fechaFin) {
      const fechaInicioObj = new Date(fechaInicio);
      const fechaFinObj = new Date(fechaFin);
      comprobantes = comprobantes.filter((item) => {
        const fechaOrden = new Date(item.fecha);
        return fechaOrden >= fechaInicioObj && fechaOrden <= fechaFinObj;
      });
    }

    // Ordenar por fecha de mayor a menor
    comprobantes.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaB - fechaA; // Ordena de mayor a menor (fecha más reciente primero)
    });

    const totalProveedor = comprobantes.reduce((accumulator, comprobante) => {
      return accumulator + Number(comprobante.total);
    }, 0);

    totalComprobantes += totalProveedor;

    // Agregar cada comprobante como una fila en el arreglo de filas
    comprobantes.forEach((comprobante, index) => {
      rows.push(
        <tr
          className="font-bold uppercase text-xs"
          key={`${proveedor.id}-${index}`}
        >
          <td>{comprobante.id}</td>
          <td>{comprobante.proveedor}</td>
          <td>{formatearFecha(comprobante.fecha)}</td>
          <td>
            <div className="flex">
              <p className="bg-violet-500 py-1 px-3 rounded text-white">
                {formatearDinero(Number(comprobante.total))}
              </p>
            </div>
          </td>
          <td>
            <div className="dropdown dropdown-top dropdown-end z-[999]">
              <div
                tabIndex={0}
                role="button"
                className="hover:bg-gray-300 py-2 px-2 transition-all text-gray-600 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-none text-xs z-[1] gap-1 w-52 p-2 border border-indigo-400"
              >
                <button
                  type="button"
                  onClick={() => handleViewImage(comprobante.comprobante)} // Abre el modal con la imagen
                  className="bg-violet-500 py-2 px-4 text-white font-semibold rounded hover:bg-orange-500 transition-all text-center"
                >
                  Ver comprobante
                </button>{" "}
                <button
                  onClick={() =>
                    handleEliminar(comprobante.proveedor, comprobante.id)
                  }
                  className="bg-red-500 py-2 px-4 text-white font-semibold rounded hover:bg-red-800 transition-all text-center"
                >
                  Eliminar comprobante
                </button>{" "}
              </ul>
            </div>
          </td>
          {/* Otros campos */}
        </tr>
      );
    });
  });

  console.log("p", proveedores);

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="bg-white mb-4 h-10 flex">
        <Link
          to={"/"}
          className="bg-indigo-100 flex h-full px-4 justify-center items-center font-bold text-indigo-600"
        >
          Inicio
        </Link>{" "}
        <Link
          to={"/gastos"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Gastos/compras de la fabrica
        </Link>
      </div>

      <div className="mx-5 my-5 px-10 py-5 bg-white">
        <p className="font-semibold text-orange-500 text-lg">
          Crear nuevos gastos/compras, lleva el controll de ellas y analiza tu
          fabrica.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-5 bg-white py-5 px-5 mx-5">
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Gastos generados hasta el momento.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {gastos.length}
            </p>
          </div>
        </article>
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Total en gastos/ordenes generados.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {Number(totalComprobantes).toLocaleString("es-ar", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </article>
      </div>
      <div className="bg-white mx-5 py-5 px-5 flex gap-2">
        <button
          onClick={() =>
            document.getElementById("my_modal_crear_gasto").showModal()
          }
          type="button"
          className="bg-indigo-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
        >
          Crear nuevos gastos/compras
        </button>{" "}
        <button
          onClick={() =>
            document.getElementById("my_modal_nuevo_proveedor").showModal()
          }
          type="button"
          className="bg-orange-500 px-5 rounded text-white font-semibold text-sm hover:shadow transition-all outline-none py-2"
        >
          Crear proveedores/etc
        </button>
      </div>

      <div className="bg-white py-5 px-5 my-10 mx-5 flex gap-2">
        <div className="flex gap-2 items-center font-bold text-indigo-500">
          <div className="bg-white py-2 px-3 text-sm font-bold w-full border border-indigo-500 cursor-pointer flex items-center rounded">
            <input
              value={fechaInicio}
              onChange={handleFechaInicioChange}
              type="date"
              className="outline-none text-slate-600 w-full max-md:text-sm uppercase bg-white"
              placeholder="Fecha de inicio"
            />
          </div>

          <div className="bg-white py-2 px-3 text-sm font-bold w-full border border-indigo-500 cursor-pointer flex items-center rounded">
            <input
              value={fechaFin}
              onChange={handleFechaFinChange}
              type="date"
              className="outline-none text-slate-600 w-full max-md:text-sm uppercase bg-white"
              placeholder="Fecha fin"
            />
          </div>
        </div>
        <div className="bg-white w-1/4 flex  border border-indigo-500 py-1 px-2 rounded font-semibold text-sm capitalize outline-none">
          <select
            id="proveedor"
            value={proveedorSeleccionado}
            onChange={(e) => setProveedorSeleccionado(e.target.value)}
            className="outline-none w-full capitalize font-semibold"
          >
            <option className="font-bold text-indigo-500" value="">
              Todos los proveedores
            </option>
            {proveedores.map((proveedor) => (
              <option
                className="font-semibold"
                key={proveedor.id}
                value={proveedor.proveedor}
              >
                {proveedor.proveedor}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className=" bg-white mx-5 mb-20">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="uppercase text-indigo-600">
              <th className="py-5">Referencia</th>
              <th className="py-5">Proveedor</th>
              <th className="py-5">Fecha</th>
              <th className="py-5">Total</th>
              <th className="py-5">Acciones</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      <ModalCrearGasto />

      <ImageModal
        isVisible={isModalVisible}
        onClose={handleCloseModal} // Cierra el modal
        imageUrl={selectedImage} // URL de la imagen seleccionada
      />
      <ModalNuevoProveedor />
    </section>
  );
};

const ImageModal = ({ isVisible, onClose, imageUrl }) => {
  if (!isVisible) return null; // Si el modal no está visible, no renderizar nada

  const handleClickOutside = (event) => {
    // Cierra el modal si haces clic fuera del contenido
    onClose();
  };

  const handleContentClick = (event) => {
    // Evitar la propagación del clic para no cerrar el modal cuando haces clic en el contenido
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleClickOutside} // Cierra el modal al hacer clic fuera
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div onClick={handleContentClick} className="relative p-5">
        {imageUrl && imageUrl.toLowerCase().endsWith(".pdf") ? (
          // Si la URL termina en ".pdf", mostrar el archivo PDF en un iframe
          <iframe
            src={imageUrl}
            title="Archivo PDF"
            className="w-[1220px] h-screen"
          />
        ) : (
          // Si no, mostrar la imagen
          <img src={imageUrl} alt="Comprobante" className="w-full h-auto" />
        )}
      </div>
    </div>
  );
};
