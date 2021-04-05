import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getBarChartInfo } from "../actions/dashboardActions";
import LoadingBox from "../components/LoadingBox";
import { backgroundColor, borderColor } from "../utils";

function IncomeChart({ title, weekDateInfo, orders }) {
  const { chartInfo } = useSelector((state) => state.barChart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orders) {
      dispatch(getBarChartInfo(weekDateInfo, orders));
    }
  }, [weekDateInfo, dispatch, orders]);

  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    datasets: [
      {
        data: chartInfo.length > 0 ? chartInfo : [0, 0, 0, 0, 0, 0, 0],
        label: title,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return "$" + value;
            },
          },
        },
      ],
    },

    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        display: true,
        color: "gray",
        align: "top",
        labels: {
          title: {
            font: {
              weight: "bold",
              size: "15",
            },
          },
        },
      },
    },
  };
  return (
    <div className="tableChart-dashboard">
      <h1>{title}</h1>
      {chartInfo.length === 0 ? (
        <LoadingBox />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
}

export default IncomeChart;
