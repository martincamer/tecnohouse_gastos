import { Link } from "react-router-dom";
import { ModalNuevoProveedor } from "../../../components/proveedores/ModalNuevoProveedor";
import { useGastosContext } from "../../../context/GastosProvider";
import { formatearFecha } from "../../../helpers/formatearFecha";
import { formatearDinero } from "../../../helpers/formatearDinero";
import { ModalEditarSaldo } from "../../../components/proveedores/ModalEditarSaldo";
import { useObtenerId } from "../../../helpers/obtenerId";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const Proveedores = () => {
  const { proveedores } = useGastosContext();
  const { idObtenida, handleObtenerId } = useObtenerId();

  const [searchTermCliente, setSearchTermCliente] = useState("");

  const handleSearchClienteChange = (e) => {
    setSearchTermCliente(e.target.value);
  };

  // Filtrar por término de búsqueda y usuario seleccionado
  let filteredData = proveedores.filter((proveedor) => {
    const matchesSearchTerm = proveedor.proveedor
      .toLowerCase()
      .includes(searchTermCliente.toLowerCase());

    return matchesSearchTerm;
  });

  const totalProveedor = filteredData.reduce((accumulator, comprobante) => {
    return accumulator + Number(comprobante.total);
  }, 0);

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
          to={"/proveedores"}
          className="bg-indigo-500 flex h-full px-4 justify-center items-center font-bold text-white"
        >
          Proveedores
        </Link>
      </div>

      <div className="mx-5 my-5 px-10 py-5 bg-white">
        <p className="font-semibold text-orange-500 text-lg">
          Crear nuevos proveedores, cargar pagos, lleva al día a tus
          proveedores.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-5 bg-white py-5 px-5 mx-5">
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Total de proveedores cargados.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {proveedores.length}
            </p>
          </div>
        </article>
        <article class="py-5 px-5 border">
          <div className="flex flex-col gap-1">
            <p class="text-sm text-gray-500 font-semibold">
              Deuda con proveedores hasta el momento.
            </p>

            <p class="text-2xl font-bold text-gray-900 max-md:text-base">
              {formatearDinero(totalProveedor)}
            </p>
          </div>
        </article>
      </div>
      <div className="bg-white mx-5 py-5 px-5 flex gap-2">
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

      <div className="bg-white py-5 px-5 mt-6 mx-5 flex gap-2">
        <div className=" w-1/4 bg-white py-1.5 px-3 text-sm font-bold border border-indigo-500 rounded cursor-pointer flex items-center">
          <input
            value={searchTermCliente}
            onChange={handleSearchClienteChange}
            type="text"
            className="outline-none text-slate-600 w-full max-md:text-sm uppercase bg-white"
            placeholder="Buscar por nombre del proveedor"
          />
          <FaSearch className="text-indigo-500" />
        </div>
      </div>

      <div className=" bg-white mx-5 mb-20">
        <table className="table">
          <thead>
            <tr className="uppercase text-indigo-600">
              <th className="py-5">Referencia</th>
              <th className="py-5">Proveedor</th>
              <th className="py-5">Fecha</th>
              <th className="py-5">Total</th>
              <th className="py-5">Acciones</th>
            </tr>
          </thead>
          <tbody className="font-bold uppercase text-xs">
            {filteredData.map((p) => (
              <tr>
                {" "}
                <td className="">{p.id}</td>
                <td className="">{p.proveedor}</td>
                <td className="">{formatearFecha(p.created_at)}</td>
                <td className="text-red-500">
                  {formatearDinero(Number(p.total))}
                </td>
                <td>
                  <div className="flex">
                    <p
                      className={`${
                        p.total > 0
                          ? "bg-red-500 py-1 px-6 rounded text-white"
                          : "bg-green-500 py-1 px-6 rounded text-white"
                      }`}
                    >
                      {p.total > 0 ? "Debemos" : "Sin deudas"}
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
                        className="bg-violet-500 py-2 px-4 text-white font-semibold rounded hover:bg-orange-500 transition-all text-center"
                      >
                        Ver saldos/deudas/etc
                      </button>{" "}
                      <button
                        onClick={() => {
                          handleObtenerId(p.id),
                            document
                              .getElementById("my_modal_editar_saldo")
                              .showModal();
                        }}
                        type="button"
                        className="bg-green-500 py-2 px-4 text-white font-semibold rounded hover:bg-orange-500 transition-all text-center"
                      >
                        Editar el saldo
                      </button>{" "}
                      <button className="bg-red-500 py-2 px-4 text-white font-semibold rounded hover:bg-red-800 transition-all text-center">
                        Eliminar el proveedor
                      </button>{" "}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalNuevoProveedor />
      <ModalEditarSaldo idObtenida={idObtenida} />
    </section>
  );
};
