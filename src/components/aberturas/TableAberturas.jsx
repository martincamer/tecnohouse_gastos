import { useAberturasContext } from "../../context/AberturasProvider";
import { Link } from "react-router-dom";
import { usePreciosContext } from "../../context/PreciosProvider";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { useState } from "react";

export const TableAberturas = () => {
  const {
    obtenerAberturas,
    handleEliminarAbertura,
    results: resultados,
  } = useAberturasContext();

  const { precios } = usePreciosContext();

  const { accesorios } = useAccesoriosContext();

  // Accesorios seleccionados precio final
  const calculateTotalPrice = (accesoriosSelect, accesorios) => {
    return accesoriosSelect.map((item) => {
      const accesorioItem = accesorios.find(
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

  const results = obtenerAberturas.map((abertura) => {
    const accesoriosSelect = abertura.datos.accesoriosSelect;
    return calculateTotalPrice(accesoriosSelect, accesorios);
  });

  console.log(obtenerAberturas);

  const calculateTotalPriceTwo = (perfilesSelect, precios, vidrioSelect) => {
    // // Calculate prices for perfilesSelect items
    // const perfilesTotal = perfilesSelect.reduce((total, item) => {
    //   const cantidad = parseInt(item.cantidad, 10);
    //   const totalKG = parseFloat(item.totalKG);
    //   const categoria = item.categoria.toLowerCase(); // Convert to lowercase for case-insensitive comparison

    //   const precioItem = precios.find(
    //     (p) => p.categoria.toLowerCase() === categoria
    //   );

    //   if (precioItem) {
    //     const precio = parseFloat(precioItem.precio);
    //     const subtotal = cantidad * totalKG * precio;
    //     return total + subtotal;
    //   }

    //   return total;
    // }, 0);

    // // Calculate prices for perfilesSelect items
    // const perfilesTotal = perfilesSelect.reduce((total, item) => {
    //   const cantidad = parseInt(item.cantidad, 10);
    //   const totalKG = parseFloat(item.totalKG);
    //   const largo = parseFloat(item.largo); // Assuming the length is provided in millimeters
    //   const categoria = item.categoria.toLowerCase();

    //   const precioItem = precios.find(
    //     (p) => p.categoria.toLowerCase() === categoria
    //   );

    //   if (precioItem) {
    //     const precio = parseFloat(precioItem.precio);
    //     // Calculate total KG for the given length and quantity
    //     const totalKGForItem = (largo / 1000) * cantidad * totalKG;
    //     const subtotal = totalKGForItem * precio;
    //     return total + subtotal;
    //   }

    //   return total;
    // }, 0);

    // Calculate total KG for perfilesSelect items by multiplying cantidad, totalKG, and precio
    const perfilesTotal = perfilesSelect.reduce((totalKG, item) => {
      // const cantidad = parseInt(item.cantidad, 10);
      const totalKGItem = parseFloat(item.totalKG);

      const categoria = item.categoria.toLowerCase();
      const precioItem = precios.find(
        (p) => p.categoria.toLowerCase() === categoria
      );

      if (precioItem) {
        const precio = parseFloat(precioItem.precio);
        const totalKGForItem = totalKGItem * precio;
        return totalKG + totalKGForItem;
      }

      return totalKG;
    }, 0);

    // return perfilesTotal;

    // Calculate prices for vidrioSelect items
    const vidrioTotal = vidrioSelect.reduce((total, item) => {
      const categoria = item.categoria.toLowerCase();

      const metroCuadrado = Number(item.metrosCuadrados);

      const precioItem = precios.find(
        (p) => p.categoria.toLowerCase() === categoria
      );

      if (precioItem) {
        // const precio = parseFloat(precioItem.precio);
        const subtotal = metroCuadrado * Number(precioItem?.precio);
        return subtotal;
      }

      return total;
    }, 0);

    // Multiply vidrioTotal by quantity
    const vidrioTotalWithQuantity = vidrioTotal;

    return { perfilesTotal, vidrioTotal: vidrioTotalWithQuantity }; // Return an object with both totals
  };

  const resultsTwo = obtenerAberturas?.map((abertura) => {
    const perfilesSelect = abertura?.datos?.perfilesSelect;
    const vidrioSelect = abertura?.datos?.vidrioSelect;
    const total = calculateTotalPriceTwo(perfilesSelect, precios, vidrioSelect);

    return {
      id: abertura.id,
      detalle: abertura.detalle,
      perfilesTotal: total?.perfilesTotal,
      vidrioTotal: total?.vidrioTotal,
    };
  });

  // Calculate the total for each abertura separately
  const totalsByIndex = obtenerAberturas.map((abertura) => {
    const accesoriosSelect = abertura.datos.accesoriosSelect;
    const totalAccesorios = calculateTotalPrice(
      accesoriosSelect,
      accesorios
    ).reduce((sum, acc) => sum + acc.totalPrecio, 0);

    const perfilesSelect = abertura?.datos?.perfilesSelect;
    const vidrioSelect = abertura?.datos?.vidrioSelect;
    const totalPerfilesVidrio = calculateTotalPriceTwo(
      perfilesSelect,
      precios,
      vidrioSelect
    );

    return {
      id: abertura.id,
      detalle: abertura.detalle,
      totalAccesorios,
      totalPerfilesVidrio:
        totalPerfilesVidrio.perfilesTotal + totalPerfilesVidrio.vidrioTotal,
    };
  });

  const calculateTotalCostForIndex = (index, totalAveragePrice) => {
    const totalAccesorios = Number(totalsByIndex[index]?.totalAccesorios) || 0;
    const totalPerfilesVidrio =
      Number(totalsByIndex[index]?.totalPerfilesVidrio) || 0;

    // Suma totalAveragePrice al resultado
    return totalAccesorios + totalPerfilesVidrio + totalAveragePrice;
  };
  //

  const categoryAverages = precios
    .filter((precio) =>
      [
        "luz",
        "agua",
        "produccion",
        "wifi",
        "alquiler",
        "gasto adicional",
      ].includes(precio.categoria)
    )
    .reduce((averages, precio) => {
      const categoria = precio.categoria;
      const precioNumber = Number(precio.precio);

      if (!averages[categoria]) {
        averages[categoria] = {
          total: 0,
          count: 0,
          averagePrice: 0,
          categoria,
        };
      }

      averages[categoria].total += precioNumber; // Sumar el precio directamente
      averages[categoria].count += 1; // Incrementar el contador en 1 por cada precio
      averages[categoria].averagePrice =
        averages[categoria].total / averages[categoria].count;

      return averages;
    }, {});

  const totalAveragePrice = Object.values(categoryAverages).reduce(
    (total, category) => total + category.averagePrice,
    0
  );
  // Llamas a calculateTotalCostForIndex pasando totalAveragePrice como argumento
  const totalCostForFirstIndex = calculateTotalCostForIndex(
    0,
    totalAveragePrice
  );

  const itemsPerPage = 10; // Cantidad de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = resultados?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(resultados?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20">
        <thead>
          <tr>
            {/* <th className="p-3">Numero</th> */}
            <th className="p-3">Tipo</th>
            <th className="p-3">Detalle</th>
            <th className="p-3">Color</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Ancho</th>
            <th className="p-3">Alto</th>
            <th className="p-3">Accesorios Total</th>
            <th className="p-3">Aluminio total</th>
            <th className="p-3">Vidrio Total</th>
            <th className="p-3">Total</th>
            <th className="p-3">Eliminar</th>
            <th className="p-3">Ver</th>
          </tr>
        </thead>
        <tbody>
          {currentResults?.map((g, index) => (
            <tr key={g.id}>
              {/* <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {g.id}
            </th> */}
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                {g.tipo}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                {g.detalle}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                {g.color}
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                {g.categoria}
              </th>{" "}
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                {g.ancho}
              </th>{" "}
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                {g.alto}
              </th>
              {/* <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              <div className="h-[40px] overflow-y-scroll">
                {results[index]?.map((result, i) => (
                  <div key={i}>
                    {`${result.detalle}: ${
                      result.cantidad
                    } x ${result.totalPrecio.toLocaleString("es-ar", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    })}`}{" "}
                    Assuming totalPrecio and cantidad are numeric values
                  </div>
                ))}
              </div>
            </th> */}
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                <div className="">
                  {/* Display the total cost for each "abertura" using the function */}
                  <p>
                    {results[index]
                      ?.reduce((sum, result) => sum + result.totalPrecio, 0)
                      .toLocaleString("es-ar", {
                        style: "currency",
                        currency: "ARS",
                        minimumFractionDigits: 2,
                      })}
                  </p>
                </div>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                <div className="h-[40px] overflow-y-scroll flex items-center justify-center">
                  {resultsTwo?.[index] && (
                    <>
                      {resultsTwo[index]?.perfilesTotal && (
                        <div>{`${resultsTwo[
                          index
                        ]?.perfilesTotal.toLocaleString("es-ar", {
                          style: "currency",
                          currency: "ARS",
                          minimumFractionDigits: 2,
                        })}`}</div>
                      )}
                    </>
                  )}
                </div>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                <div className="h-[40px] overflow-y-scroll flex items-center justify-center">
                  {resultsTwo?.[index] && (
                    <>
                      {resultsTwo[index]?.vidrioTotal && (
                        <div>{`${resultsTwo[index]?.vidrioTotal.toLocaleString(
                          "es-ar",
                          {
                            style: "currency",
                            currency: "ARS",
                            minimumFractionDigits: 2,
                          }
                        )}`}</div>
                      )}
                    </>
                  )}
                </div>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                <div className="font-semibold">
                  {/* Asegúrate de proporcionar el índice y totalAveragePrice a la función */}
                  <p>
                    {calculateTotalCostForIndex(
                      index,
                      totalAveragePrice
                    )?.toLocaleString("es-ar", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </th>
              <th
                onClick={() =>
                  // handleSeleccionarId(g.id), openModalEliminar();
                  handleEliminarAbertura(g.id)
                }
                className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase"
              >
                <p className="border-red-500 border-[1px] rounded shadow p-[3px] bg-red-100 text-center text-red-800 cursor-pointer">
                  ELIMINAR
                </p>
              </th>
              <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
                <Link
                  to={`/aberturas/${g.id}`}
                  className="border-teal-500 border-[1px] rounded shadow py-[3px] px-5 bg-teal-100 text-center text-teal-800 cursor-pointer"
                >
                  VER
                </Link>
              </th>
              {/* <th
              onClick={() => obtenerParamsId(g.id)}
              className="border-[1px] border-gray-300 p-3 font-semibold text-sm uppercase bg-teal-500 text-white cursor-pointer"
            >
              <Link to={`/gastos/${g.id}`}>VER GASTO</Link>
            </th> */}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-teal-500 hover:bg-teal-600 transition-all ease-in-out text-white shadow shadow-black/20"
                  : "bg-gray-100 shadow shadow-black/20"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};