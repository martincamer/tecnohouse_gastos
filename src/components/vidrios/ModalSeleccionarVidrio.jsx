import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Search } from "../ui/Search";
import { Link } from "react-router-dom";
import { useAberturasContext } from "../../context/AberturasProvider";
import { ModalSeleccionarCantidadPerfil } from "./ModalSeleccionarCantidadPerfil";
// import { usePerfilesContex } from "../../context/PerfilesProvider";
// import { useFacturaContext } from "../../context/FacturaProvider";

export const ModalSeleccionarVidrio = ({
  closeModalProductos,
  isOpenProductos,
}) => {
  //   const { search, searcher, results } = useAluminioContext();
  const { addToVidrio } = useAberturasContext();
  // const { perfiles } = usePerfilesContex();

  // let [isOpenModal, setIsModal] = useState(false);

  // function closeModalCantidad() {
  //   setIsModal(false);
  // }

  // function openModalCantidad() {
  //   setIsModal(true);
  // }

  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleChangeAncho = (event) => {
    setAncho(event.target.value);
  };

  const handleChangeAlto = (event) => {
    setAlto(event.target.value);
  };

  const handleChangeCantidad = (event) => {
    setCantidad(event.target.value);
  };

  const handleChangeCategoria = (event) => {
    setCategoria(event.target.value);
  };

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={isOpenProductos} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalProductos}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-3/4 inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl space-y-6">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 uppercase"
                >
                  Elegir Vidrio / en cm
                </Dialog.Title>
                {/* <Search
                  variable={"Buscar por el codigo o detalle..."}
                  search={search}
                  searcher={searcher}
                /> */}

                <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex gap-6 w-full py-10 px-10 overflow-y-scroll">
                  <div className="flex gap-2 items-center">
                    <label
                      className="uppercase text-teal-500 font-semibold"
                      htmlFor=""
                    >
                      Ancho
                    </label>
                    <input
                      value={ancho}
                      onChange={handleChangeAncho}
                      type="text"
                      placeholder="ANCHO DEL VIDRIO"
                      className="border-[1px] border-gray-200 rounded-lg shadow shadow-black/20 py-1 px-3 placeholder:text-sm outline-none"
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <label
                      className="uppercase text-teal-500 font-semibold"
                      htmlFor=""
                    >
                      Alto
                    </label>
                    <input
                      value={alto}
                      onChange={handleChangeAlto}
                      type="text"
                      placeholder="ALTO DEL VIDRIO"
                      className="border-[1px] border-gray-200 rounded-lg shadow shadow-black/20 py-1 px-3 placeholder:text-sm outline-none"
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <label
                      className="uppercase text-teal-500 font-semibold"
                      htmlFor=""
                    >
                      Cantidad
                    </label>
                    <input
                      value={cantidad}
                      onChange={handleChangeCantidad}
                      type="text"
                      placeholder="CANTIDAD DE VIDRIOS"
                      className="border-[1px] border-gray-200 rounded-lg shadow shadow-black/20 py-1 px-3 placeholder:text-sm outline-none"
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <label
                      className="uppercase text-teal-500 font-semibold"
                      htmlFor=""
                    >
                      Seleccionar
                    </label>
                    <select
                      value={categoria}
                      onChange={handleChangeCategoria}
                      type="text"
                      placeholder="CANTIDAD DE VIDRIOS"
                      className="border-[1px] border-gray-200 bg-white rounded-lg shadow shadow-black/20 py-2 px-3 placeholder:text-sm outline-none"
                    >
                      <option>SELECCIONAR</option>
                      <option>6 mls</option>
                      <option>3 mls</option>
                      <option>4 mls</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    className="bg-teal-500 py-2 px-10 shadow shadow-black/10 rounded-lg text-white uppercase font-semibold"
                    type="button"
                    onClick={() => {
                      addToVidrio(ancho, alto, cantidad, categoria),
                        closeModalProductos();
                    }}
                  >
                    Crear vidrio
                  </button>
                </div>
                {/* <div className="border-[1px] border-gray-200 rounded shadow-black/10 shadow flex flex-col gap-3 w-full h-[30vh] overflow-y-scroll">
                  <table className="border-[1px]  p-[5px] table-auto w-full rounded uppercase">
                    <thead>
                      <tr>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Numero
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Codigo
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Detalle
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Color
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Categoria
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Peso Barra
                        </th>
                        <th className="p-2 text-sm font-extrabold text-center">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {perfiles.map((c) => (
                        <tr key={c.id}>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center w-[20px]">
                            {c.id}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.codigo}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.detalle}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.color}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c.categoria}
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm text-center">
                            {c?.peso_barra_6_mts?.toLocaleString("arg", {
                              minimumFractionDigits: 2,
                            })}{" "}
                            kg
                          </th>
                          <th className="border-[1px] border-gray-300 p-2 text-sm w-[120px] text-center">
                            <Link
                              onClick={() => {
                                openModalCantidad(),
                                  handleSeleccionarProducto(c.id);
                              }}
                              className="bg-secondary py-1 px-2 text-center text-white rounded-md"
                            >
                              Seleccionar
                            </Link>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                {/* </div> */}
                {/* <ModalSeleccionarCantidadPerfil
                  isOpenModal={isOpenModal}
                  closeModalCantidad={closeModalCantidad}
                  openModalCantidad={openModalCantidad}
                  closeModalProductos={closeModalProductos}
                /> */}
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer uppercase"
                  onClick={closeModalProductos}
                >
                  Cerrar Ventana
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
