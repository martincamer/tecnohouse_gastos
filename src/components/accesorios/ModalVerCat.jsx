import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import { eliminarCategoria } from "../../api/categorias.api";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";

export const ModalVerCat = ({ isOpenVerCat, closeVerCategorias }) => {
  const { categorias, setCategorias } = useAccesoriosContext();

  const handleEliminarCat = async (id) => {
    try {
      await eliminarCategoria(id);

      setCategorias((prevSalidas) =>
        prevSalidas.filter((abertura) => abertura.id !== id)
      );

      toast.error(
        "¡Categoria eliminada correctamente, no la podrás recuperar!",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            padding: "10px",
            borderRadius: "15px",
            boxShadow: "none",
            border: "1px solid rgb(203 213 225)",
          },
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Menu as="div" className="z-50">
      <ToastContainer />
      <Transition appear show={isOpenVerCat} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeVerCategorias}
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
              <div className="inline-block w-1/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="py-2 flex justify-end items-center px-2">
                  <p
                    onClick={closeVerCategorias}
                    className="bg-red-100 text-red-700 py-2 px-2 rounded-xl cursor-pointer"
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
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </p>
                </div>

                <div className="flex flex-col  gap-5">
                  <div className="font-bold text-sm uppercase underline">
                    VER CATEGORIAS CREADAS
                  </div>

                  <div className="grid grid-cols-3 gap-3 uppercase text-sm">
                    {categorias.map((c) => (
                      <div
                        className="flex gap-2 border-[1px] rounded-lg shadow border-gray-300 py-2 px-2 items-center justify-center"
                        key={c.id}
                      >
                        <p>{c.categoria}</p>
                        {/* <button
                          className="bg-indigo-100 px-2 text-sm rounded-lg border-[1px] border-indigo-500 text-indigo-800"
                          type="button"
                        >
                          E
                        </button> */}
                        <button
                          className="text-red-800"
                          type="button"
                          onClick={() => handleEliminarCat(c.id)}
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
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
