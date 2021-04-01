import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardCardsInfo } from "../actions/dashboardActions";
import { getOrderList } from "../actions/orderActions";
import TodayDashboardScreen from "./TodayDashboardScreen";

import WeekDashboardScreen from "./WeekDashboardScreen";

function DashboardScreen() {
  const [isDashboard, setIsDashboard] = useState(false);
  const d = new Date();
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const today = `${ye}-${mo}-${da}`;
  const { orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders || !isDashboard) {
      dispatch(getOrderList({}));
      setIsDashboard(true);
    } else {
      dispatch(getDashboardCardsInfo(today));
    }
  }, [dispatch, today, orders, isDashboard]);

  return (
    <div>
      <h1 className="dashboard">{userInfo.name}'s Dashboard</h1>
      <TodayDashboardScreen />
      <WeekDashboardScreen />
    </div>
  );
}

export default DashboardScreen;
