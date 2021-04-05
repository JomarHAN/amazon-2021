import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { getPieChartInfo } from "../actions/dashboardActions";
import { backgroundColor, borderColor } from "../utils";

function ProductPortionChart({ title, weekDateInfo, orders }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (orders) {
      dispatch(getPieChartInfo(orders));
    }
  }, [dispatch, weekDateInfo, orders]);
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        data: [12, 19, 3, 5, 9, 8, 9, 12, 10, 6, 7],
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    legend: {
      position: "right",
    },
    plugins: {
      datalabels: {
        color: "gray",
        align: "center",
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
      <Pie data={data} options={options} />
    </div>
  );
}

export default ProductPortionChart;
