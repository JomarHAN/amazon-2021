import React from "react";
import { Bar } from "react-chartjs-2";

function StackedChart({ title }) {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Red",
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Blue",
        data: [2, 3, 20, 5, 1, 4, 9],
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "Green",
        data: [3, 10, 13, 15, 22, 30, 45],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
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
      <Bar data={data} options={options} />
    </div>
  );
}

export default StackedChart;
