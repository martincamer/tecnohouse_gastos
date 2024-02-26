// Archivo GastosChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const GastosChart = ({ gastos, ventas }) => {
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    let graficoAnterior; // Almacena referencia al gráfico anterior

    if (gastos.length > 0 || ventas.length > 0) {
      const ctx = document.getElementById("graficoGastos").getContext("2d");

      if (graficoAnterior) {
        graficoAnterior.destroy(); // Destruye el gráfico anterior antes de crear uno nuevo
      }

      // Agrupar los gastos por mes y año
      const gastosAgrupados = gastos.reduce((acumulador, gasto) => {
        const fecha = new Date(gasto.created_at);
        const mesAnio = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;

        if (!acumulador[mesAnio]) {
          acumulador[mesAnio] = {
            total: gasto.total,
            mes: fecha.toLocaleString("es-AR", { month: "long" }),
          };
        } else {
          acumulador[mesAnio].total += gasto.total;
        }

        return acumulador;
      }, {});

      const ventasAgrupadas = ventas.reduce((acumulador, venta) => {
        const fecha = new Date(venta.created_at);
        const mesAnio = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;

        if (!acumulador[mesAnio]) {
          acumulador[mesAnio] = {
            total: venta.total,
            mes: fecha.toLocaleString("es-AR", { month: "long" }),
          };
        } else {
          acumulador[mesAnio].total += venta.total;
        }

        return acumulador;
      }, {});

      const mesesUnicos = new Set([
        ...Object.keys(gastosAgrupados),
        ...Object.keys(ventasAgrupadas),
      ]);

      const nombresMeses = Array.from(mesesUnicos);

      const montosGastos = nombresMeses.map(
        (mes) => gastosAgrupados[mes]?.total || 0
      );

      const montosVentas = nombresMeses.map(
        (mes) => ventasAgrupadas[mes]?.total || 0
      );

      const nuevaTotalGastos = montosGastos.reduce(
        (acumulador, monto) => acumulador + monto,
        0
      );

      const nuevaTotalVentas = montosVentas.reduce(
        (acumulador, monto) => acumulador + monto,
        0
      );

      setTotalGastos(nuevaTotalGastos);
      setTotalVentas(nuevaTotalVentas);

      // Agregar un nuevo conjunto de datos para los gastos
      const datosGastos = [
        {
          label: "Gastos Mensuales",
          backgroundColor: "#A8AAFF",
          borderColor: "#6366F1",
          borderWidth: 1,
          data: montosGastos,
        },
      ];

      // Agregar un nuevo conjunto de datos para las ventas
      const datosVentas = [
        {
          label: "Ventas Mensuales",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          data: montosVentas,
        },
      ];

      graficoAnterior = new Chart(ctx, {
        type: "bar",
        data: {
          labels: nombresMeses,
          datasets: [...datosGastos, ...datosVentas],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      // Limpia y destruye el gráfico cuando el componente se desmonta
      if (graficoAnterior) {
        graficoAnterior.destroy();
      }
    };
  }, [gastos, ventas, totalGastos, totalVentas]);

  return (
    <div>
      <canvas id="graficoGastos" width="400" height="200"></canvas>
      <p className="text-lg font-normal mt-4">
        <span className="text-indigo-500 uppercase font-bold">
          Cantidad total de gastos:
        </span>{" "}
        {totalGastos.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 2,
        })}
      </p>
      <p className="text-lg font-normal">
        <span className="text-slate-700 uppercase font-bold">
          Cantidad total de ventas:
        </span>{" "}
        {totalVentas.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

export default GastosChart;
