import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerUnicaAbertura } from "../../../api/aberturas.api";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";
import { usePreciosContext } from "../../../context/PreciosProvider";

export const ViewAbertura = () => {
  const [abertura, setAbertura] = useState([]);
  const { accesorios } = useAccesoriosContext();
  const { precios } = usePreciosContext();
  const params = useParams();

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
      const cantidad = Number(perfil.cantidad);
      const totalKG = Number(perfil.totalKG);

      // Calcula el precio final multiplicando cantidad, totalKG y precio
      const precioFinal = cantidad * totalKG * precioNumber;

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

  console.log(perfilesConPrecioFinal);

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
      const cantidad = Number(vidrio.cantidad);
      const ancho = Number(vidrio.ancho);
      const alto = Number(vidrio.alto);

      // Calcula el precio final multiplicando cantidad, ancho, alto y precio
      const precioFinal =
        Number(ancho * alto) * Number(cantidad) * precioNumber;

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
    ["luz", "agua", "empleados"].includes(precioAdicional.categoria)
  );

  // Suma los precios adicionales filtrados
  const precioTotalAdicionales = preciosAdicionalesFiltrados.reduce(
    (total, precioAdicional) => total + parseFloat(precioAdicional.precio),
    0
  );

  console.log("Precio total de adicionales:", precioTotalAdicionales);

  // Suma el precio total de la abertura con los precios adicionales
  const precioFinalAbertura = precioTotalAbertura + precioTotalAdicionales;

  console.log(
    "Precio final de la abertura con adicionales:",
    precioFinalAbertura
  );

  return (
    <section className="w-full py-12 px-12 max-md:px-4 flex flex-col gap-8">
      <div className="border-gray-300 rounded-md border-[1px] shadow-md shadow-black/20 py-12 px-10 w-full flex flex-col gap-8 items-start">
        <article className="flex gap-6">
          <div className="bg-gray-100/20 py-10 px-10 border-[1px] border-gray-300 shadow shadow-black/20 rounded-lg space-y-2">
            <p className="text-teal-500 font-semibold text-base uppercase">
              DETALLE:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.detalle}
              </span>
            </p>

            <p className="text-teal-500 font-semibold text-base uppercase">
              COLOR:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.color}
              </span>
            </p>

            <p className="text-teal-500 font-semibold text-base uppercase">
              CATEGORIA:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.categoria}
              </span>
            </p>

            <p className="text-teal-500 font-semibold text-base uppercase">
              TIPO:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.tipo}
              </span>
            </p>

            <p className="text-teal-500 font-semibold text-base uppercase">
              TAMAÑO:{" "}
              <span className="font-normal text-gray-900">
                {abertura?.ancho}x{abertura?.alto}
              </span>
            </p>
          </div>

          <div className="bg-gray-100/20 py-10 px-10 border-[1px] border-gray-300 shadow shadow-black/20 rounded-lg space-y-2">
            <p className="text-teal-500 font-semibold text-base uppercase">
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

            <p className="text-teal-500 font-semibold text-base uppercase">
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

            <p className="text-teal-500 font-semibold text-base uppercase">
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

            <p className="text-teal-500 font-semibold text-base uppercase">
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

            <p className="text-teal-500 font-semibold text-base uppercase">
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

          <div className="bg-gray-100/20 py-10 px-10 border-[1px] border-gray-300 shadow shadow-black/20 rounded-lg space-y-2">
            <div className="flex gap-2">
              {precios.map((p) => (
                <div className="flex gap-2">
                  <div className="flex gap-1 uppercase text-sm">
                    <p className="text-teal-500 font-bold">
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
                    <p className="text-teal-500 font-bold">
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
                    <p className="text-teal-500 font-bold">
                      {p.categoria == "empleados" && p.categoria}
                    </p>
                    <p>
                      {p.categoria == "empleados" && (
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
                </div>
              ))}
            </div>
            <p className="text-teal-500 font-semibold text-base uppercase">
              SIN PRODUCCIÓN, AGUA, LUZ:{" "}
              <span className="font-normal text-gray-900">
                {precioTotalAbertura.toLocaleString("es-ar", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                })}{" "}
                ARS
              </span>
            </p>

            <p className="text-teal-500 font-semibold text-base uppercase">
              CON PRODUCCIÓN, LUZ, AGUA:{" "}
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
        </article>

        <div className="flex flex-col w-full items-start max-w-[1350px]">
          <div className="mb-7 text-lg font-bold text-gray-800 border-b-2 border-teal-400">
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

        <div className="flex flex-col w-full items-start max-w-[1350px]">
          <div className="mb-6 text-lg font-bold text-gray-800 border-b-2 border-teal-400">
            PERFILES DE LA ABERTURA
          </div>

          <div className="border-b-[1px] w-full border-gray-500 pb-1 flex gap-20">
            <p className="text-gray-600 font-semibold w-[350px]">DETALLE</p>
            <p className="text-gray-600 font-semibold w-[350px]">CATEGORIA</p>
            <p className="text-gray-600 font-semibold w-[350px]">KILOS</p>
            <p className="text-gray-600 font-semibold w-[350px]">CANTIDAD</p>
            <p className="text-gray-600 font-semibold w-[350px]">
              PRECIO X UNIDAD
            </p>
          </div>
          {perfilesConPrecioFinal?.map((perfil, index) => (
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
                {perfil?.totalKG}
              </p>
              <p className="text-sm py-3 uppercase w-[350px]">
                {perfil?.cantidad}
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

        <div className="flex flex-col w-full items-start max-w-[1350px]">
          <div className="mb-6 text-lg font-bold text-gray-800 border-b-2 border-teal-400">
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
          {vidriosConPrecioFinal?.map((perfil, index) => (
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
                {perfil?.ancho} x {perfil?.alto}
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
    </section>
  );
};
