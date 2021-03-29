import React, { useEffect, useState } from "react";
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
  const dataPaid = {
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
  };
  const dataDelivered = {
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
  };
  return (
    <div>
      <h1 className="dashboard">{userInfo.name}'s Dashboard</h1>
      <div className="row">
        <TopCardIncome
          title="Earning"
          today={`$${cardDashboard?.todayIncome?.toFixed(2)}`}
          week={`$${cardDashboard?.totalIncome?.toFixed(2)}`}
        />
        <TopCardIncome
          title="Orders"
          today={`${cardDashboard.todayOrders} orders`}
          week={`${cardDashboard.totalOrders} orders`}
        />

        <TopCardChart
          title="Paid Order"
          dataChart={dataPaid}
          subDone={cardDashboard.paidOrders}
          subNotDone={cardDashboard.totalOrders - cardDashboard.paidOrders}
          Paid
        />
        <TopCardChart
          title="Delivered Order"
          dataChart={dataDelivered}
          subDone={cardDashboard.deliveredOrders}
          subNotDone={cardDashboard.totalOrders - cardDashboard.deliveredOrders}
        />
      </div>
    </div>
  );
}

export default DashboardScreen;
