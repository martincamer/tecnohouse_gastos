import { useAberturasContext } from "../../context/AberturasProvider";
import { Link } from "react-router-dom";
import { usePreciosContext } from "../../context/PreciosProvider";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadPDFButton } from "../pdf/DownloadPDFButton";
import * as XLSX from "xlsx";

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

  const [applyAumento, setApplyAumento] = useState(true);

  const aberturasConPreciosFinales = resultados.map((abertura) => {
    const vidriosConPrecio = abertura.datos.vidrioSelect.map((vidrio) => {
      const precioVidrio = precios.find(
        (precio) => precio.categoria === vidrio.categoria
      );
      const precio = precioVidrio
        ? vidrio.metrosCuadrados * precioVidrio.precio
        : 0;
      return {
        ...vidrio,
        precio,
      };
    });

    const accesoriosConPrecio = abertura.datos.accesoriosSelect.map(
      (accesorio) => {
        const accesorioEncontrado = accesorios.find(
          (a) => a.detalle === accesorio.detalle
        );
        const precio = accesorioEncontrado
          ? accesorioEncontrado.precio_unidad * accesorio.cantidad
          : 0;
        return {
          ...accesorio,
          precio,
        };
      }
    );
    const perfilesConPrecio = abertura.datos.perfilesSelect.map((perfil) => {
      const precioPerfil = precios.find(
        (precio) =>
          precio.categoria.toLowerCase() === perfil.categoria.toLowerCase()
      );
      const precio = precioPerfil ? perfil.totalKG * precioPerfil.precio : 0;
      return {
        ...perfil,
        precio,
      };
    });

    const vidriosPrecioTotal = vidriosConPrecio.reduce(
      (total, vidrio) => total + vidrio.precio,
      0
    );
    const accesoriosPrecioTotal = accesoriosConPrecio.reduce(
      (total, accesorio) => total + accesorio.precio,
      0
    );
    const perfilesPrecioTotal = perfilesConPrecio.reduce(
      (total, perfil) => total + perfil.precio,
      0
    );

    // Filtrar los precios que coinciden con las categorías a sumar
    const categoriasAsumar = [
      "luz",
      "agua",
      "produccion",
      "wifi",
      "alquiler",
      "gasto adicional",
    ];

    const preciosASumar = precios.filter((precio) =>
      categoriasAsumar.includes(precio.categoria)
    );

    // Calcular la suma de los precios
    const sumaPrecios = preciosASumar.reduce((total, precio) => {
      return total + parseFloat(precio.precio);
    }, 0);

    const precioFinal =
      vidriosPrecioTotal +
      accesoriosPrecioTotal +
      perfilesPrecioTotal +
      sumaPrecios;

    // Calcular el 40% de totalConAumento
    const totalConAumento = applyAumento ? precioFinal * 1.4 : precioFinal;

    return {
      ...abertura,
      datos: {
        ...abertura.datos,
        vidrioSelect: vidriosConPrecio,
        accesoriosSelect: accesoriosConPrecio,
        perfilesSelect: perfilesConPrecio,
      },
      precioFinal,
      totalConAumento,
      sumaPrecios,
    };
  });

  const fechaActual = new Date();

  const downloadAberturasAsExcel = () => {
    const aberturasData = aberturasConPreciosFinales.map((abertura) => {
      // Customize the data structure based on your needs
      return {
        TIPO: abertura.tipo.toUpperCase(),
        DETALLE: abertura.detalle.toUpperCase(),
        COLOR: abertura.color.toUpperCase(),
        CATEGORIA: abertura.categoria.toUpperCase(),
        ANCHO: abertura.ancho,
        ALTO: abertura.alto,
        // Add more fields as needed
        "PRECIO UND": abertura.totalConAumento.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 2,
        }),
      };
    });

    // Create a worksheet with the aberturas data
    const ws = XLSX.utils.json_to_sheet(aberturasData);

    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Aberturas");

    // Save the file
    XLSX.writeFile(wb, `aberturas_data.xlsx`);
  };

  const [showDetail, setShowDetail] = useState(
    Array(resultados.length).fill(false)
  ); // Inicializa un array de estados locales, uno para cada fila

  const toggleDetail = (index) => {
    const newShowDetail = [...showDetail]; // Crea una copia del array de estados locales
    newShowDetail[index] = !newShowDetail[index]; // Cambia el estado para la fila correspondiente
    setShowDetail(newShowDetail); // Actualiza el estado
  };
  return (
    <div>
      {" "}
      <div className="overflow-x-scroll">
        <table className="border-[1px] p-[5px] table-auto w-full rounded uppercase shadow shadow-black/20 ">
          <thead>
            <tr>
              <th className="p-3 max-md:text-xs border-b-[1px]">Tipo</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Detalle</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Color</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Categoria</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Ancho</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Alto</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Eliminar</th>
              <th className="p-3 max-md:text-xs border-b-[1px]">Ver</th>
            </tr>
          </thead>
          <tbody>
            {currentResults?.map((g, index) => (
              <tr
                className="hover:bg-slate-100 transition-all ease-in-out duration-200 cursor-pointer"
                key={g.id}
              >
                {/* <th className="border-[1px] border-gray-300 p-3 font-medium text-sm uppercase">
              {g.id}
            </th> */}
                <th className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase">
                  {g.tipo}
                </th>
                 <th className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase md:block max-md:hidden">
                  {g.tipo}
                </th>
                <th
                  className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase max-md:block md:hidden"
                  onClick={() => toggleDetail(index)}
                >
                  {showDetail[index] ? (
                    g.detalle
                  ) : (
                    <span className="bg-white border-slate-300 border-[1px] rounded-xl py-2 px-2 shadow text-slate-900 max-md:block md:hidden">
                      CLICK
                    </span>
                  )}
                </th>
                <th className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase">
                  {g.color}
                </th>
                <th className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase">
                  {g.categoria}
                </th>{" "}
                <th className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase">
                  {g.ancho}
                </th>{" "}
                <th className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase">
                  {g.alto}
                </th>
                <th
                  onClick={() => handleEliminarAbertura(g.id)}
                  className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase"
                >
                  <p className="border-red-300 border-[1px] rounded-xl shadow p-[3px] bg-red-100 text-center text-red-800 cursor-pointer">
                    ELIMINAR
                  </p>
                </th>
                <th className="border-b-[1px] border-gray-300 py-4 px-3 max-md:text-xs font-medium text-sm uppercase">
                  <Link
                    to={`/aberturas/${g.id}`}
                    className="rounded-xl shadow py-2 px-5 bg-indigo-500 text-center text-white cursor-pointer font-bold "
                  >
                    Ver
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4 gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-indigo-500 hover:bg-slate-700 transition-all ease-in-out text-white shadow shadow-black/20"
                  : "bg-gray-100 shadow shadow-black/20"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <div className="mt-5 flex gap-5 max-md:flex-col max-md:text-sm max-md:items-start">
        <button
          className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-100 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md shadow hover:shadow-black/10 hover:border-indigo-500 max-md:rounded-xl"
          onClick={() => setApplyAumento(!applyAumento)}
        >
          {!applyAumento ? "AGREGAR AUMENTO DEL 40%" : "SACAR AUMENTO DEL 40%"}
        </button>
        <button className="border-gray-300 rounded-md border-[1px]  py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-100 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md shadow hover:shadow-black/10 hover:border-indigo-500 max-md:rounded-xl">
          <PDFDownloadLink
            fileName={`Aberturas Precios ${fechaActual?.toLocaleString(
              "es-AR",
              { month: "long" }
            )}`}
            document={
              <DownloadPDFButton
                aberturasConPreciosFinales={aberturasConPreciosFinales}
              />
            }
          >
            {" "}
            DESCARGAR INVENTARIO
          </PDFDownloadLink>
        </button>
        <button
          className="border-gray-300 rounded-md border-[1px] py-3 px-3 flex gap-10 font-bold cursor-pointer hover:bg-indigo-100 transition-all ease-in-out duration-400 hover:text-indigo-500 hover:shadow-md shadow hover:shadow-black/10 hover:border-indigo-500 max-md:rounded-xl"
          onClick={downloadAberturasAsExcel}
        >
          DESCARGAR ABERTURAS EN EXCEL
        </button>
      </div>
    </div>
  );
};
