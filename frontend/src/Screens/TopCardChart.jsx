import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

function TopChart({ title, subDone, subNotDone, Paid }) {
  const { cardDashboard } = useSelector((state) => state.dashboardCards);
  const data = {
    dataPaid: {
      datasets: [
        {
          data: [
            cardDashboard.paidOrders,
            cardDashboard.totalOrders - cardDashboard.paidOrders,
          ],
          backgroundColor: ["lightgreen", "lightgray"],
        },
      ],
      labels: ["Paid", "Not"],
    },
    dataDelivered: {
      labels: ["Delivered", "Not"],
      datasets: [
        {
          data: [
            cardDashboard.deliveredOrders,
            cardDashboard.totalOrders - cardDashboard.deliveredOrders,
          ],
          backgroundColor: ["lightblue", "lightgray"],
        },
      ],
    },
  };
  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
        align: "center",
        labels: {
          title: {
            font: {
              weight: "bold",
              size: "20",
            },
          },
        },
      },
    },
  };
  return (
    <div className="card-dashboard">
      <h3 className="title-card">{title}</h3>
      <Doughnut
        data={Paid ? data.dataPaid : data.dataDelivered}
        options={options}
      />
      <div className="row">
        <small className="subOrder">
          {Paid ? "Paid" : "Delivered"}: {subDone}
        </small>
        <small className="subOrder">
          Not {Paid ? "Paid" : "Delivered"}: {subNotDone}
        </small>
      </div>
    </div>
  );
}

export default TopChart;
