import Chart from "react-apexcharts";

const RemuneracionesColumnChart = ({ datos }) => {
  const fechas = datos.map(
    (remuneracion) => remuneracion.created_at.split("T")[0]
  );
  const remuneracionesData = datos.map((remuneracion) =>
    parseFloat(remuneracion.total)
  );

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
          });
        },
        style: {
          fontSize: "12px",
          colors: "#000000", // Cambiar color del texto a negro
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

  const series = [
    {
      name: "Total en presupuestos",
      data: remuneracionesData,
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Chart
        options={options}
        series={series}
        type="bar"
        // width="1000"
        className="w-[100%] max-md:w-[1000px]"
        height={500}
      />
    </div>
  );
};

export default RemuneracionesColumnChart;
