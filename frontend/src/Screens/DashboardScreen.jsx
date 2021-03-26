import React from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import TopCardChart from "./TopCardChart";
import TopCardIncome from "./TopCardIncome";

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
      <h1 className="dashboard">{userInfo.name}'s Dashboard</h1>
      <div className="row">
        <TopCardIncome title="Earning" today={`$1000`} week={`$2900`} />
        <TopCardIncome title="Orders" today={`12 orders`} week={`20 orders`} />

        <TopCardChart
          title="Paid Order"
          dataChart={dataPaid}
          subDone={10}
          subNotDone={5}
        />
        <TopCardChart
          title="Delivered Order"
          dataChart={dataDelivered}
          subDone={10}
          subNotDone={5}
        />
      </div>
    </div>
  );
}

export default DashboardScreen;
