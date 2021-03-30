import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardCardsInfo } from "../actions/dashboardActions";
import { getOrderList } from "../actions/orderActions";
import TopCardChart from "./TopCardChart";
import TopCardIncome from "./TopCardIncome";

function DashboardScreen(props) {
  const [isDashboard, setIsDashboard] = useState(false);
  const d = new Date();
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const today = `${ye}-${mo}-${da}`;
  const { orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { cardDashboard } = useSelector((state) => state.dashboardCards);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders || !isDashboard) {
      dispatch(getOrderList({}));
      setIsDashboard(true);
    } else {
      dispatch(getDashboardCardsInfo(today));
    }
  }, [dispatch, today, orders, isDashboard]);

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
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
  };

  return (
    <div>
      <h1 className="dashboard">{userInfo.name}'s Dashboard</h1>
      <div className="row">
        <TopCardIncome
          title="Earning"
          today={`$${cardDashboard.todayIncome?.toFixed(2)}`}
          week={`$${cardDashboard.totalIncome?.toFixed(2)}`}
          green={cardDashboard.todayIncome}
        />
        <TopCardIncome
          title="Orders"
          today={`${cardDashboard.todayOrders} orders`}
          week={`${cardDashboard.totalOrders} orders`}
          green={cardDashboard.todayOrders}
        />

        <TopCardChart
          title="Paid Order"
          subDone={cardDashboard.paidOrders}
          subNotDone={cardDashboard.totalOrders - cardDashboard.paidOrders}
          Paid
        />
        <TopCardChart
          title="Delivered Order"
          subDone={cardDashboard.deliveredOrders}
          subNotDone={cardDashboard.totalOrders - cardDashboard.deliveredOrders}
        />
      </div>
      <div className="row">
        <div className="tableChart-dashboard">
          <h1>Income</h1>
          <Bar data={data} options={options} />
        </div>
        <div className="tableChart-dashboard">
          <h1>Orders</h1>
          <Bar data={data} options={options} />
        </div>
        <div className="tableChart-dashboard">
          <h1>Products Trending</h1>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
