import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAberturasContext } from "../../context/AberturasProvider";
import { ModalSeleccionarAberturaFinal } from "./ModalSeleccionarAberturaFinal";
import { Search } from "../ui/Search";

export const ModalSeleccionarAberturas = ({
  openSeleccionar,
  closeModalSeleccionar,
}) => {
  const { results, search, searcher } = useAberturasContext();

  const [obtenerId, setObtenerId] = useState("");
  const [seleccionarAberturaFinal, setSeleccionarAberturaFinal] =
    useState(false);

  const openModalSeleccionarAberturaFinal = () => {
    setSeleccionarAberturaFinal(true);
  };

  const closeModalSeleccionarAberturaFinal = () => {
    setSeleccionarAberturaFinal(false);
  };

  const handleId = (id) => {
    setObtenerId(id);
  };

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={openSeleccionar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModalSeleccionar}
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
              <div className="inline-block max-md:w-full w-5/6 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="mb-5 w-1/3">
                  <Search
                    variable="Buscar por el detalle..."
                    search={search}
                    searcher={searcher}
                  />
                </div>
                <form className="overflow-y-scroll h-[50vh] scroll-bar">
                  <table className="table">
                    <thead className="border-b-[2px] border-slate-300">
                      <tr className="text-left">
                        <th className="py-5 uppercase text-indigo-600">
                          DETALLE
                        </th>
                        <th className="py-5 uppercase text-indigo-600">
                          MEDIDA
                        </th>
                        <th className="py-5 uppercase text-indigo-600">
                          COLOR
                        </th>
                        <th className="py-5 uppercase text-indigo-600">
                          CATEGORIA
                        </th>
                        <th className="py-5 uppercase text-indigo-600">
                          Seleccionar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="uppercase text-xs">
                      {results
                        ?.sort((a, b) => {
                          // Ordenar por detalle (orden alfabético ascendente)
                          if (a.detalle < b.detalle) return -1;
                          if (a.detalle > b.detalle) return 1;
                          // Si son iguales por detalle, ordenar por categoría (orden alfabético ascendente)
                          if (a.categoria < b.categoria) return -1;
                          if (a.categoria > b.categoria) return 1;
                          return 0;
                        })
                        .map((r) => (
                          <tr key={r?.id} className="">
                            <th className="">{r?.detalle}</th>
                            <th className="">
                              {r?.ancho}x{r?.alto}
                            </th>
                            <th className="">{r?.color}</th>
                            <th className="">{r?.categoria}</th>
                            <th className="">
                              <button
                                onClick={() => {
                                  handleId(r?.id),
                                    openModalSeleccionarAberturaFinal();
                                }}
                                type="button"
                                className="text-xs bg-indigo-500 py-1 px-6 rounded text-white hover:shadow-md transition-all"
                              >
                                Seleccionar
                              </button>
                            </th>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </form>
              </div>
            </Transition.Child>

            <ModalSeleccionarAberturaFinal
              obtenerId={obtenerId}
              seleccionarAberturaFinal={seleccionarAberturaFinal}
              closeModalSeleccionar={closeModalSeleccionar}
              closeModalSeleccionarAberturaFinal={
                closeModalSeleccionarAberturaFinal
              }
            />
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
