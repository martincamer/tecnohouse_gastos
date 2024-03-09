import { PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DownloadPDFButton } from "../../../components/pdf/DownloadPDFButton";
import { useAberturasContext } from "../../../context/AberturasProvider";
import { usePreciosContext } from "../../../context/PreciosProvider";
import { useAccesoriosContext } from "../../../context/AccesoriosProvider";

export const ViewPdf = () => {
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
    const totalConAumento = precioFinal * 1.4;

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

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <DownloadPDFButton
        aberturasConPreciosFinales={aberturasConPreciosFinales}
      />
    </PDFViewer>
  );
};
