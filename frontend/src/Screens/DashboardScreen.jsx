import React from "react";
import { useSelector } from "react-redux";
import { Pie, Doughnut } from "react-chartjs-2";

function DashboardScreen() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const dataPaid = {
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["lightgreen", "lightgray"],
      },
    ],
  };
  const dataDelivered = {
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["lightblue", "lightgray"],
      },
    ],
  };
  return (
    <div>
      <h1 className="dashboard">Dashboard of {userInfo.name}</h1>
      <div className="row">
        <div className="card-dashboard">
          <h3>Earning</h3>
          <h2>
            Today: <span>$1,000</span>
          </h2>
          <small>
            This Week: <span>$2,900</span>
          </small>
        </div>
        <div className="card-dashboard">
          <h3>Orders</h3>
          <h2>
            Today: <span>12 orders</span>
          </h2>
          <small>
            This Week: <span>20 orders</span>
          </small>
        </div>
        <div className="card-dashboard">
          <h3>Paid Orders</h3>
          <Pie data={dataPaid} />
          <div className="row">
            <small className="done">Paid: 10</small>
            <small className="notyet">Not Paid: 5</small>
          </div>
        </div>
        <div className="card-dashboard">
          <h3>Delivered Orders</h3>
          <Doughnut data={dataDelivered} />
          <div className="row">
            <small className="done">Delivered: 10</small>
            <small className="notyet">Not Develiverd: 5</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
