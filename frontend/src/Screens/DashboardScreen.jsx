import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardCardsInfo } from "../actions/dashboardActions";
import { getOrderList } from "../actions/orderActions";
import TodayDashboardScreen from "./TodayDashboardScreen";

import WeekDashboardScreen from "./WeekDashboardScreen";

function DashboardScreen() {
  const [isDashboard, setIsDashboard] = useState(false);
  const today = moment().format("YYYY-MM-DD");

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
      <hr />
      <WeekDashboardScreen />
    </div>
  );
}

export default DashboardScreen;
