// Archivo GastosChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const GastosChart = ({ gastos }) => {
  const [totalGastos, setTotalGastos] = useState(0);

  useEffect(() => {
    let graficoAnterior; // Almacena referencia al gráfico anterior

    if (gastos.length > 0) {
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

      const nombresMeses = Object.values(gastosAgrupados).map(
        (gasto) => gasto.mes
      );

      const montosGastos = Object.values(gastosAgrupados).map(
        (gasto) => gasto.total
      );

      const nuevaTotalGastos = montosGastos.reduce(
        (acumulador, monto) => acumulador + monto,
        0
      );

      setTotalGastos(nuevaTotalGastos);

      // Agregar un nuevo conjunto de datos para la cantidad total de gastos
      const datosGastos = [
        {
          label: "Gastos Mensuales",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: montosGastos,
        },
      ];

      graficoAnterior = new Chart(ctx, {
        type: "bar",
        data: {
          labels: nombresMeses,
          datasets: datosGastos,
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
  }, [gastos, totalGastos]);

  return (
    <div>
      <canvas id="graficoGastos" width="400" height="200"></canvas>
      <p className="text-xl font-normal">
        <span className="text-teal-500 uppercase font-bold">
          Cantidad total de gastos:
        </span>{" "}
        {totalGastos.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

export default GastosChart;
