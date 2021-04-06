import React from "react";
import { Line } from "react-chartjs-2";

function ProductTrendChart({ title }) {
  const red = "255, 99, 132";
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 8],
        fill: false,
        backgroundColor: `rgb(${red})`,
        borderColor: `rgba(${red}, 0.2)`,
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  return (
    <div className="tableChart-dashboard">
      <h1>{title}</h1>
      <Line data={data} options={options} />
    </div>
  );
}

export default ProductTrendChart;
