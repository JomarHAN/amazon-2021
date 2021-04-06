import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getPieChartInfo } from "../actions/dashboardActions";
import { backgroundColor, borderColor } from "../utils";

function ProductPortionChart({ title, weekDateInfo, orders }) {
  const { labelsInfo, dataInfo } = useSelector((state) => state.pieChart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (orders) {
      dispatch(getPieChartInfo(orders));
    }
  }, [dispatch, orders]);
  const data = {
    labels: labelsInfo,
    datasets: [
      {
        data: dataInfo,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    legend: {
      position: "right",
      labels: {
        boxWidth: 30,
      },
      maxWidth: "50",
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
