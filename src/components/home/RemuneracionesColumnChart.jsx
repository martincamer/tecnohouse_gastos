import Chart from "react-apexcharts";

const RemuneracionesColumnChart = ({ datos }) => {
  // Extracting data for the chart
  const fechas = datos.map(
    (remuneracion) => remuneracion.created_at.split("T")[0]
  ); // Extracting only date, removing time

  const remuneracionesData = datos.map((remuneracion) =>
    parseFloat(remuneracion.total)
  ); // Convert to ARS (considering 1 USD = 97 ARS)

  // Configuring chart options
  const options = {
    chart: {
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: fechas,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumIntegerDigits: 2,
          }); // Add currency symbol to y-axis labels and format as currency
        },
        style: {
          fontSize: "12px",
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        colors: {
          ranges: [
            {
              from: Number.MIN_SAFE_INTEGER,
              to: 3,
              color: "#FF0000",
            },
          ],
          backgroundBarColors: [],
          backgroundBarOpacity: 1,
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
  };

  // Configuring chart series
  const series = [
    {
      name: "Total en presupuestos",
      data: remuneracionesData,
    },
  ];

  return (
    <div className="w-full">
      {" "}
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%" // Adjust chart width as needed
        height={500} // Adjust chart height as needed
      />
    </div>
  );
};

export default RemuneracionesColumnChart;
