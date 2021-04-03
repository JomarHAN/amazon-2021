import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getBarChartInfo } from "../actions/dashboardActions";
import LoadingBox from "../components/LoadingBox";

function BarChart({ title, weekDateInfo, orders }) {
  const { chartWeeklyInfo } = useSelector(
    (state) => state.dashboardChartWeekly
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (orders) {
      dispatch(getBarChartInfo(weekDateInfo, orders));
    }
  }, [weekDateInfo, dispatch, orders]);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data:
          chartWeeklyInfo.length > 0 ? chartWeeklyInfo : [0, 0, 0, 0, 0, 0, 0],
        label: title,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
          },
        },
      ],
    },
    parsing: {
      xAxisKey: chartWeeklyInfo?.length > 0 && "date",
      yAxisKey: chartWeeklyInfo?.length > 0 && "sold.income",
    },
    legend: {
      display: false,
    },
  };
  return (
    <div className="tableChart-dashboard">
      <h1>{title}</h1>
      {chartWeeklyInfo.length === 0 ? (
        <LoadingBox />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
}

export default BarChart;
