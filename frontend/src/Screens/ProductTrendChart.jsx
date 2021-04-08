import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getLineChartInfo } from "../actions/dashboardActions";
import { backgroundColor, borderColor } from "../utils";

function ProductTrendChart({ title, weekDateInfo, orders }) {
  const { info } = useSelector((state) => state.lineChart);
  const [indexItem, setIndexItem] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orders) {
      dispatch(getLineChartInfo(weekDateInfo, orders));
    }
  }, [weekDateInfo, orders, dispatch]);
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: info[indexItem]?.week,
        fill: false,
        backgroundColor: borderColor[indexItem],
        borderColor: backgroundColor[indexItem],
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
    plugins: {
      datalabels: {
        display: true,
        color: "gray",
        align: "top",
        labels: {
          title: {
            font: {
              weight: "bold",
              size: "12",
            },
          },
        },
      },
    },
  };
  return (
    <div className="tableChart-dashboard">
      <div className="lineChart-select">
        <h1>{title}</h1>
        <select onChange={(e) => setIndexItem(e.target.value)}>
          {info.map((item, i) => (
            <option key={i} value={i}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default ProductTrendChart;
