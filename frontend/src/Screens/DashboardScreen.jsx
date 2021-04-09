import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardCardsInfo } from "../actions/dashboardActions";
import { getOrderList } from "../actions/orderActions";
import TodayDashboardScreen from "./TodayDashboardScreen";

import WeekDashboardScreen from "./WeekDashboardScreen";

function DashboardScreen(props) {
  const sellerMode = props.location.pathname.indexOf("/seller") > 0;
  const [isDashboard, setIsDashboard] = useState(false);
  const today = moment().format("MM-DD-YYYY");
  const { orders } = useSelector((state) => state.orderList);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders || !isDashboard) {
      dispatch(getOrderList({ seller: sellerMode ? userInfo._id : "" }));
      setIsDashboard(true);
    }
    dispatch(getDashboardCardsInfo(today));
  }, [dispatch, today, orders, isDashboard, sellerMode, userInfo]);

  return (
    <div>
      <h1 className="dashboard">{userInfo.name}'s Dashboard</h1>
      <TodayDashboardScreen sellerMode={sellerMode} />
      <hr />
      <WeekDashboardScreen sellerMode={sellerMode} />
    </div>
  );
}

export default DashboardScreen;
