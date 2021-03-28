import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardCards } from "../actions/dashboardActions";
import { getOrderList } from "../actions/orderActions";
import TopCardChart from "./TopCardChart";
import TopCardIncome from "./TopCardIncome";

function DashboardScreen() {
  const d = new Date();
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const today = `${ye}-${mo}-${da}`;
  // const { orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderList({}));
    dispatch(dashboardCards(today));
  }, [dispatch, today]);
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
