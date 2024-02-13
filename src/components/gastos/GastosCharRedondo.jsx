// Archivo GastosChart.js
import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

const GastosCharRedondo = ({ gastos }) => {
  const [totalGastos, setTotalGastos] = useState(0);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [nombresMeses, setNombresMeses] = useState([]);

  useEffect(() => {
    if (gastos.length > 0) {
      const ctx = canvasRef.current.getContext("2d");

      // Destruir el gráfico anterior si existe
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Extraer nombres de meses y montos de gastos
      const nombresMeses = gastos.map((gasto) => gasto.mes);
      const montosGastos = gastos.map((gasto) => gasto.total);

      // Calcular la cantidad total de gastos
      const nuevaTotalGastos = montosGastos.reduce(
        (acumulador, monto) => acumulador + monto,
        0
      );
      setTotalGastos(nuevaTotalGastos);

      // Configurar datos del gráfico
      const datosGastos = [
        {
          label: "Gastos Mensuales",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: montosGastos,
        },
        {
          label: "Cantidad Total de Gastos",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          data: [nuevaTotalGastos],
        },
      ];

      // Crear el gráfico
      chartRef.current = new Chart(ctx, {
        type: "doughnut", // O cambia a "pie" si prefieres un gráfico de tipo "pie"
        data: {
          labels: nombresMeses,
          datasets: datosGastos,
        },
      });
    }

    return () => {
      // Limpia y destruye el gráfico cuando el componente se desmonta
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [gastos, totalGastos]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="graficoGastos"
        width="400"
        height="200"
      ></canvas>
      <p>
        Cantidad total de gastos:{" "}
        {totalGastos.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

export default GastosCharRedondo;
