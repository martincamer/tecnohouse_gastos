import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerUnicaAbertura } from "../../../api/aberturas.api";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { usePreciosContext } from "../../../context/PreciosProvider";
import { ModalEditarAcccesorio } from "../../../components/modalAberturas/ModalEditarAccesorio";

export const ViewAbertura = () => {
  const [abertura, setAbertura] = useState([]);
  const { accesorios } = useAccesoriosContext();
  const { precios } = usePreciosContext();

  //modals
  const [isOpen, setIsOpen] = useState(false);
  const [obtenerId, setObtenerId] = useState(null);

  const handleObtenerId = (id) => {
    setObtenerId(id);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const params = useParams();

  console.log(abertura);

  useEffect(() => {
    const obtenerData = async () => {
      const res = await obtenerUnicaAbertura(params.id);

      setAbertura(res.data);
    };

    obtenerData();
  }, [params.id]);

  // Accesorios seleccionados precio final
  const calculateTotalPrice = (accesoriosSelect, accesorios) => {
    return accesoriosSelect?.map((item) => {
      const accesorioItem = accesorios?.find(
        (acc) => acc.detalle === item.detalle
      );

      if (accesorioItem) {
        const precio_unidad = parseFloat(accesorioItem.precio_unidad);
        const cantidad = parseInt(item.cantidad, 10);
        const totalPrecio = precio_unidad * cantidad;

        return {
          ...item,
          totalPrecio,
        };
      }

      return item;
    });
  };

  const results = calculateTotalPrice(
    abertura?.datos?.accesoriosSelect,
    accesorios
  );

  // Accesorios seleccionados precio final
  const calculateTotalUnidad = (accesoriosSelect, accesorios) => {
    return accesoriosSelect?.map((item) => {
      const accesorioItem = accesorios?.find(
        (acc) => acc.detalle === item.detalle
      );

      if (accesorioItem) {
        const precio_unidad = parseFloat(accesorioItem.precio_unidad);

        return {
          ...item,
          totalPrecio: precio_unidad, // Assigning unit price directly
        };
      }

      return item;
    });
  };

  const resultsUnidad = calculateTotalUnidad(
    abertura?.datos?.accesoriosSelect,
    accesorios
  );

  // Función para buscar el precio por categoría (insensible a mayúsculas y minúsculas)
  const buscarPrecioPorCategoria = (categoria) => {
    const categoriaLowerCase = categoria.toLowerCase();
    return precios.find(
      (precio) => precio.categoria.toLowerCase() === categoriaLowerCase
    );
  };

  // Función para calcular el precio final para cada perfil
  const calcularPrecioFinal = (perfil) => {
    const precioEncontrado = buscarPrecioPorCategoria(perfil.categoria);

    if (precioEncontrado) {
      const precioNumber = Number(precioEncontrado.precio);
      // const cantidad = Number(perfil.cantidad);
      const totalKG = Number(perfil.totalKG);

      // Calcula el precio final multiplicando cantidad, totalKG y precio
      const precioFinal = totalKG * precioNumber;

      return {
        ...perfil,
        precioFinal,
      };
    }

    return perfil;
  };

  // Aplica la función calcularPrecioFinal a cada perfil en perfilesSelect
  const perfilesConPrecioFinal = abertura?.datos?.perfilesSelect?.map(
    (perfil) => calcularPrecioFinal(perfil)
  );

  // Calcula el precio total sumando los precios finales de todos los perfiles
  const precioTotal = perfilesConPrecioFinal?.reduce(
    (total, perfil) => total + (perfil?.precioFinal || 0),
    0
  );

  // Función para calcular el precio final para cada vidrio
  const calcularPrecioFinalVidrio = (vidrio) => {
    const precioEncontrado = buscarPrecioPorCategoria(vidrio.categoria);

    if (precioEncontrado) {
      const precioNumber = Number(precioEncontrado.precio);
      const totalMetros = Number(vidrio.metrosCuadrados);

      // Calcula el precio final multiplicando cantidad, ancho, alto y precio
      const precioFinal = totalMetros * precioNumber;

      return {
        ...vidrio,
        precioFinal,
      };
    }

    return vidrio;
  };

  // Aplica la función calcularPrecioFinalVidrio a cada vidrio en vidriosSelect
  const vidriosConPrecioFinal = abertura?.datos?.vidrioSelect?.map((vidrio) =>
    calcularPrecioFinalVidrio(vidrio)
  );

  // Calcula el precio total sumando los precios finales de todos los vidrios
  const precioTotalVidrios = vidriosConPrecioFinal?.reduce(
    (total, vidrio) => total + (vidrio?.precioFinal || 0),
    0
  );

  // Calcula el precio total de los perfiles
  const precioTotalPerfiles = perfilesConPrecioFinal?.reduce(
    (total, perfil) => total + (perfil?.precioFinal || 0),
    0
  );

  // Calcula el precio total de los accesorios
  const precioTotalAccesorios = results?.reduce(
    (total, accesorio) => total + (accesorio?.totalPrecio || 0),
    0
  );

  // Calcula el precio total de la abertura sumando los totales de perfiles, accesorios y vidrios
  const precioTotalAbertura =
    precioTotalPerfiles + precioTotalAccesorios + precioTotalVidrios;

  console.log("Precio total de la abertura:", precioTotalAbertura);

  // Filtra los precios adicionales relevantes (luz, agua, empleados)
  const preciosAdicionalesFiltrados = precios.filter((precioAdicional) =>
    [
      "luz",
      "agua",
      "produccion",
      "wifi",
      "alquiler",
      "gasto adicional",
    ].includes(precioAdicional.categoria)
  );

  // Suma los precios adicionales filtrados
  const precioTotalAdicionales = preciosAdicionalesFiltrados.reduce(
    (total, precioAdicional) => total + parseFloat(precioAdicional.precio),
    0
  );

  console.log("Precio total de adicionales:", precioTotalAdicionales);

  // Suma el precio total de la abertura con los precios adicionales
  const precioFinalAbertura =
    (precioTotalAbertura + precioTotalAdicionales) * Number(1.4);

  // Suma el precio total de la abertura con los precios adicionales
  const precioFinalAberturaSin = precioTotalAbertura + precioTotalAdicionales;

  console.log(
    "Precio final de la abertura con adicionales:",
    precioFinalAbertura
  );

  return (
    <section className="w-full py-24 px-5 max-md:px-4 flex flex-col gap-8 max-md:py-5 max-md:pb-44">
      <div>
        <article className="flex mb-5 items-start gap-6 max-md:flex-col max-md:gap-4">
          <div className="bg-white py-10 px-10 shadow-xl transition-all ease-linears cursor-pointer shadow-black/20 rounded-2xl space-y-2 h-full">
            <p className="text-indigo-500 font-semibold text-base uppercase">
              DETALLE:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.detalle}
              </span>
            </p>

            <p className="text-indigo-500 font-semibold text-base uppercase">
              COLOR:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.color}
              </span>
            </p>

            <p className="text-indigo-500 font-semibold text-base uppercase">
              CATEGORIA:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.categoria}
              </span>
            </p>

            <p className="text-indigo-500 font-semibold text-base uppercase">
              TIPO:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.tipo}
              </span>
            </p>

            <p className="text-indigo-500 font-semibold text-base uppercase">
              TAMAÑO:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.ancho}x{abertura?.alto} mm
              </span>
            </p>
          </div>

          <div className="bg-white py-10 px-10 shadow-xl transition-all ease-linears cursor-pointer shadow-black/20 rounded-2xl space-y-2 h-full">
            <p className="text-indigo-500 font-semibold text-base uppercase">
              TOTAL EN ALUMINIO:{" "}
              <span className="font-normal text-gray-900">
                {perfilesConPrecioFinal
                  ?.reduce((sum, b) => sum + (b?.precioFinal || 0), 0)
                  .toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}{" "}
                ARS
              </span>
            </p>

            <p className="text-indigo-500 font-semibold text-base uppercase">
              TOTAL EN KG:{" "}
              <span className="font-normal text-gray-900">
                {perfilesConPrecioFinal
                  ?.reduce((sum, b) => sum + (b?.totalKG || 0), 0)
                  .toLocaleString("es-ar", {
                    minimumFractionDigits: 2,
                  })}{" "}
                kgs
              </span>
            </p>

            <p className="text-indigo-500 font-semibold text-base uppercase">
              TOTAL EN VIDRIO:{" "}
              <span className="font-normal text-gray-900">
                {vidriosConPrecioFinal
                  ?.reduce((sum, b) => sum + (b?.precioFinal || 0), 0)
                  .toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}{" "}
                ARS
              </span>
            </p>

            <p className="text-indigo-500 font-semibold text-base uppercase">
              TOTAL EN ACCESORIO:{" "}
              <span className="font-normal text-gray-900">
                {results
                  ?.reduce((sum, b) => sum + (b?.totalPrecio || 0), 0)
                  .toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}{" "}
                ARS
              </span>
            </p>

            <p className="text-indigo-500 font-semibold text-base uppercase">
              PRECIO FINAL ABERTURA:{" "}
              <span className="font-normal text-gray-900">
                {precioTotalAbertura.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}{" "}
                ARS
              </span>
            </p>
          </div>
          <div className="bg-white py-10 px-10 shadow-xl transition-all ease-linears cursor-pointer shadow-black/20 rounded-2xl space-y-2 h-full">
            <div className="h-full space-y-[0.2px]">
              {precios.map((p) => (
                <>
                  <div className="flex gap-1 uppercase text-sm">
                    <p className="text-indigo-500 font-bold">
                      {p.categoria == "luz" && p.categoria}
                    </p>
                    {p.categoria == "luz" && (
                      <span className="">
                        {Number(p.precio).toLocaleString("es-ar", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 uppercase text-sm">
                    <p className="text-indigo-500 font-bold">
                      {p.categoria == "agua" && p.categoria}
                    </p>
                    {p.categoria == "agua" && (
                      <span className="">
                        {Number(p.precio).toLocaleString("es-ar", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 uppercase text-sm">
                    <p className="text-indigo-500 font-bold">
                      {p.categoria == "produccion" && p.categoria}
                    </p>
                    <p>
                      {p.categoria == "produccion" && (
                        <span className="">
                          {Number(p.precio).toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex gap-1 uppercase text-sm">
                    <p className="text-indigo-500 font-bold">
                      {p.categoria == "wifi" && p.categoria}
                    </p>
                    <p>
                      {p.categoria == "wifi" && (
                        <span className="">
                          {Number(p.precio).toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex gap-1 uppercase text-sm">
                    <p className="text-indigo-500 font-bold">
                      {p.categoria == "alquiler" && p.categoria}
                    </p>
                    <p>
                      {p.categoria == "alquiler" && (
                        <span className="">
                          {Number(p.precio).toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex gap-1 uppercase text-sm">
                    <p className="text-indigo-500 font-bold">
                      {p.categoria == "gasto adicional" && p.categoria}
                    </p>
                    <p>
                      {p.categoria == "gasto adicional" && (
                        <span className="">
                          {Number(p.precio).toLocaleString("es-ar", {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          })}
                        </span>
                      )}
                    </p>
                  </div>
                </>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-indigo-500 font-semibold text-base uppercase">
                SIN PRODUCCIÓN, AGUA, LUZ, ETC:{" "}
                <span className="font-normal text-gray-900">
                  {precioTotalAbertura.toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}{" "}
                  ARS
                </span>
              </p>

              <p className="text-indigo-500 font-semibold text-base uppercase">
                CON PRODUCCIÓN, AGUA, LUZ, Y SIN EL 40%, ETC:{" "}
                <span className="font-normal text-gray-900">
                  {precioFinalAberturaSin.toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}{" "}
                  ARS
                </span>
              </p>

              <p className="text-indigo-500 font-semibold text-base uppercase">
                CON PRODUCCIÓN, LUZ, AGUA, Y EL 40%, ETC:{" "}
                <span className="font-bold text-gray-900">
                  {precioFinalAbertura.toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}{" "}
                  ARS
                </span>
              </p>
            </div>
          </div>
        </article>

        <div className="flex flex-col  max-w-[1350px] items-start max-md:overflow-x-scroll max-md:w-full px-10 bg-white py-10 rounded-xl shadow-xl">
          <div className="mb-7 text-lg font-bold text-gray-800 border-b-2 border-indigo-400">
            ACCESORIOS DE LA ABERTURA
          </div>

          <div className="border-b-[1px] w-full border-gray-500 pb-1 flex gap-20">
            <p className="text-gray-600 font-semibold w-[250px]">DETALLE</p>
            <p className="text-gray-600 font-semibold w-[250px]">CATEGORIA</p>
            <p className="text-gray-600 font-semibold w-[250px]">CANTIDAD</p>
            <p className="text-gray-600 font-semibold w-[250px]">
              PRECIO X UNIDAD
            </p>
            <p className="text-gray-600 font-semibold w-[250px]">
              {" "}
              PRECIO FINAL
            </p>
          </div>
          {abertura?.datos?.accesoriosSelect?.map((a, index) => (
            <div
              key={a.id}
              className="border-b-[1px] w-full border-gray-300 flex gap-20 space-y-3 items-center hover:bg-gray-100/50 transition-all ease-in-out cursor-pointer hover:text-gray-800 text-gray-500"
            >
              <p className=" uppercase text-sm py-3 w-[250px]">{a?.detalle}</p>
              <p className=" uppercase text-sm py-3 w-[250px]">
                {a?.categoria}
              </p>
              <p className=" uppercase text-sm py-3 w-[250px]">{a?.cantidad}</p>
              <p className=" uppercase text-sm py-3 w-[250px]">
                {resultsUnidad[index]?.totalPrecio?.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className=" uppercase text-sm py-3 w-[250px]">
                {results[index]?.totalPrecio?.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>

        <div className=" flex flex-col w-full items-start max-w-[1350px] px-10 bg-white py-10 rounded-xl shadow-xl mt-5">
          <div className="mb-6 text-lg font-bold text-gray-800 border-b-2 border-indigo-400">
            PERFILES DE LA ABERTURA
          </div>

          <div className="border-b-[1px] w-full border-gray-500 pb-1 flex gap-20">
            <p className="text-gray-600 font-semibold w-[350px]">DETALLE</p>
            <p className="text-gray-600 font-semibold w-[350px]">CATEGORIA</p>
            <p className="text-gray-600 font-semibold w-[350px]">KILOS</p>
            <p className="text-gray-600 font-semibold w-[350px]">CANTIDAD</p>
            <p className="text-gray-600 font-semibold w-[350px]">LARGO</p>
            <p className="text-gray-600 font-semibold w-[350px]">
              PRECIO X UNIDAD
            </p>
          </div>
          {perfilesConPrecioFinal?.map((perfil) => (
            <div
              key={perfil?.id}
              className="border-b-[1px] w-full border-gray-300 flex gap-20 space-y-3 items-center hover:bg-gray-100/50 transition-all ease-in-out cursor-pointer hover:text-gray-800 text-gray-500"
            >
              <p className="text-sm py-3 uppercase w-[350px]">
                {perfil?.detalle}
              </p>
              <p className="text-sm py-3 uppercase w-[350px]">
                {perfil?.categoria}
              </p>
              <p className="text-sm py-3 uppercase w-[350px]">
                {perfil?.totalKG.toLocaleString("es-ar", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <p className="text-sm py-3 uppercase w-[350px]">
                {perfil?.cantidad}
              </p>
              <p className="text-sm py-3 uppercase w-[350px]">
                {perfil?.largo} mm
                {/* {console.log(abertura)} */}
              </p>
              <p className="text-sm py-3 uppercase w-[350px]">
                {perfil?.precioFinal?.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full items-start max-w-[1350px] px-10 bg-white py-10 rounded-xl shadow-xl mt-5">
          <div className="mb-6 text-lg font-bold text-gray-800 border-b-2 border-indigo-400">
            VIDRIOS DE LA ABERTURA
          </div>

          <div className="border-b-[1px] w-full border-gray-500 pb-1 flex gap-20">
            <p className="text-gray-600 font-semibold w-[300px]">DETALLE</p>
            <p className="text-gray-600 font-semibold w-[300px]">CANTIDAD</p>
            <p className="text-gray-600 font-semibold w-[300px]">ANCHOXALTO</p>
            <p className="text-gray-600 font-semibold w-[300px]">
              PRECIO FINAL
            </p>
          </div>
          {vidriosConPrecioFinal?.map((perfil) => (
            <div
              key={perfil?.id}
              className="border-b-[1px] w-full border-gray-300 flex gap-20 space-y-3 items-center hover:bg-gray-100/50 transition-all ease-in-out cursor-pointer hover:text-gray-800 text-gray-500"
            >
              <p className="text-sm py-3 uppercase w-[300px]">
                {perfil?.categoria}
              </p>
              <p className="text-sm py-3 uppercase w-[300px]">
                {perfil?.cantidad}
              </p>
              <p className="text-sm py-3 uppercase w-[300px]">
                {perfil?.ancho} mm x {perfil?.alto} mm
              </p>
              <p className="text-sm py-3 uppercase w-[300px]">
                {perfil?.precioFinal?.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ModalEditarAcccesorio
        obtenerId={obtenerId}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </section>
  );
};
