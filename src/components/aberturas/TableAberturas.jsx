import { useAberturasContext } from "../../context/AberturasProvider";
import { Link } from "react-router-dom";
import { usePreciosContext } from "../../context/PreciosProvider";
import { useAccesoriosContext } from "../../context/AccesoriosProvider";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DownloadPDFButton } from "../pdf/DownloadPDFButton";
import * as XLSX from "xlsx";

export const TableAberturas = ({ openModal, handleId }) => {
  const {
    obtenerAberturas,
    handleEliminarAbertura,
    results: resultados,
  } = useAberturasContext();

  const { precios } = usePreciosContext();

  const { accesorios } = useAccesoriosContext();

  const [showPrecioSinNada, setShowPrecioSinNada] = useState(false);

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

  // Ordenar resultados por categoría y luego por detalle alfabéticamente
  const sortedResultados = resultados?.sort((a, b) => {
    if (a.categoria < b.categoria) {
      return -1;
    }
    if (a.categoria > b.categoria) {
      return 1;
    }
    // Si las categorías son iguales, ordenar por detalle
    if (a.detalle < b.detalle) {
      return -1;
    }
    if (a.detalle > b.detalle) {
      return 1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentResults = sortedResultados?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(sortedResultados?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [applyAumento, setApplyAumento] = useState(false);

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

    const precioSinNada =
      vidriosPrecioTotal + accesoriosPrecioTotal + perfilesPrecioTotal;

    const precioFinal =
      vidriosPrecioTotal +
      accesoriosPrecioTotal +
      perfilesPrecioTotal +
      sumaPrecios;

    // Calcular el total dependiendo de applyAumento y showPrecioSinNada
    let totalConAumento;
    if (applyAumento) {
      totalConAumento = precioFinal * 1.4;
    } else {
      totalConAumento = precioFinal;
    }
    if (!applyAumento && showPrecioSinNada) {
      totalConAumento = precioSinNada;
    }

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

  const aberturasConPreciosFinalesDos = resultados.map((abertura) => {
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

    const precioSinNada =
      vidriosPrecioTotal + accesoriosPrecioTotal + perfilesPrecioTotal;

    const precioFinal =
      vidriosPrecioTotal +
      accesoriosPrecioTotal +
      perfilesPrecioTotal +
      sumaPrecios;

    // Calcular el total dependiendo de applyAumento y showPrecioSinNada
    let totalConAumento;
    if (applyAumento) {
      totalConAumento = precioFinal * 1.4;
    } else {
      totalConAumento = precioFinal;
    }
    if (!applyAumento && showPrecioSinNada) {
      totalConAumento = precioSinNada;
    }

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
      <div className="flex gap-5 max-md:gap-2 max-md:flex-col max-md:text-sm max-md:items-start mb-4">
        <button
          className="text-sm uppercase bg-green-100 text-green-700 px-4 rounded-xl py-2 flex gap-2 items-center"
          onClick={() => setShowPrecioSinNada(!showPrecioSinNada)}
        >
          {!showPrecioSinNada
            ? "Mostrar Precio Sin Nada"
            : "Mostrar Precio Final"}

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
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>

        {/* Botón para aplicar o quitar el aumento del 40% */}
        <button
          className="text-sm uppercase bg-indigo-100 text-indigo-700 px-4 rounded-xl py-2 flex gap-2 items-center"
          onClick={() => setApplyAumento(!applyAumento)}
        >
          {!applyAumento ? "AGREGAR AUMENTO DEL 40%" : "SACAR AUMENTO DEL 40%"}

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
              d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
            />
          </svg>
        </button>
        <button className="text-sm uppercase bg-orange-100 text-orange-700 px-4 rounded-xl py-2 flex gap-2 items-center">
          <PDFDownloadLink
            fileName={`Aberturas Precios ${fechaActual?.toLocaleString(
              "es-AR",
              { month: "long" }
            )}`}
            document={
              <DownloadPDFButton
                aberturasConPreciosFinales={aberturasConPreciosFinalesDos}
              />
            }
          >
            DESCARGAR INVENTARIO PDF
          </PDFDownloadLink>{" "}
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </button>
        <button
          className="text-sm uppercase bg-slate-200 text-slate-700 px-4 rounded-xl py-2 flex gap-2 items-center"
          onClick={downloadAberturasAsExcel}
        >
          DESCARGAR ABERTURAS EN EXCEL
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </button>
      </div>
      <div className="md:hidden max-md:flex flex-col gap-4">
        {currentResults?.map((g, index) => (
          <div
            className="rounded-xl bg-white shadow border-[1px] border-slate-300 py-2 px-3"
            key={index}
          >
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-2">
                <p className="text-slate-700 text-xs font-semibold uppercase">
                  {g.tipo} {g.categoria}
                </p>

                <p className="text-slate-700 text-xs uppercase">{g.detalle}</p>
                <p className="text-slate-700 text-xs uppercase">{g.color}</p>
                <p className="text-slate-700 text-xs uppercase">
                  {g.ancho}x{g.alto}
                </p>
              </div>
              <div className="flex flex-col gap-4 items-center justify-center">
                <span onClick={() => handleEliminarAbertura(g.id)}>
                  <span className="border-red-300 border-[1px] rounded-xl shadow py-2 px-4 text-xs bg-red-100 text-center text-red-800 cursor-pointer">
                    ELIMINAR
                  </span>
                </span>

                <Link
                  to={`/aberturas/${g.id}`}
                  className="rounded-xl uppercase shadow py-2 px-6 text-xs bg-indigo-500 text-center text-white cursor-pointer"
                >
                  Ver
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>{" "}
      <div className="max-md:hidden md:block rounded-xl shadow-md hover:shadow-md transition-all ease-linear bg-white">
        <table className="uppercase min-w-full table">
          <thead className="">
            <tr>
              <th className="px-4 py-4 text-sm text-left">Tipo</th>
              <th className="px-4 py-4 text-sm text-left">Detalle</th>
              <th className="px-4 py-4 text-sm text-left">Color</th>
              <th className="px-4 py-4 text-sm text-left">Categoria</th>
              <th className="px-4 py-4 text-sm text-left">AnchoXAlto</th>
              <th className="px-4 py-4 text-sm text-left">Precio</th>
              <th className="px-4 py-4 text-sm text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="">
            {resultados?.map((g, index) => (
              <tr className="cursor-pointer" key={g.id}>
                <th className="py-4 px-4 text-left max-md:text-xs font-medium text-sm uppercase">
                  {g.tipo}
                </th>
                <th className="py-4 px-4 text-left max-md:text-xs font-medium text-sm uppercase">
                  {g.detalle}
                </th>
                <th className="py-4 px-4 text-left max-md:text-xs font-medium text-sm uppercase">
                  {g.color}
                </th>
                <th className="py-4 px-4 text-left max-md:text-xs font-medium text-sm uppercase">
                  {g.categoria}
                </th>{" "}
                <th className="py-4 px-4 text-left max-md:text-xs font-medium text-sm uppercase">
                  {g.ancho}x{g.alto}
                </th>{" "}
                <th>
                  {aberturasConPreciosFinales[
                    index
                  ]?.totalConAumento.toLocaleString("es-ar", {
                    style: "currency",
                    currency: "ARS",
                    minimumFractionDigits: 2,
                  })}
                </th>
                <th className="py-4 px-4 text-left max-md:text-xs font-medium text-sm uppercase flex space-x-2">
                  <div className="dropdown dropdown-bottom dropdown-end">
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
                      className="dropdown-content z-[1] menu p-2 shadow-xl border bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <p
                          onClick={() => {
                            handleId(g.id), openModal();
                          }}
                        >
                          Editar
                        </p>
                      </li>
                      <li>
                        <p onClick={() => handleEliminarAbertura(g.id)}>
                          ELIMINAR
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
                              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </p>
                      </li>
                      <li>
                        <Link to={`/aberturas/${g.id}`}>
                          Ver
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
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 mb-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded-xl ${
                currentPage === index + 1
                  ? "bg-indigo-500 border border-indigo-500 hover:bg-slate-700 transition-all ease-in-out text-white shadow shadow-black/20 max-md:text-xs"
                  : "bg-white shadow shadow-black/20 max-md:text-xs"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
};
