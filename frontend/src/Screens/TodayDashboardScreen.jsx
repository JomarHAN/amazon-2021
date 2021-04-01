import React from "react";
import { useSelector } from "react-redux";
import TopCardChart from "./TopCardChart";
import TopCardIncome from "./TopCardIncome";

function TodayDashboardScreen() {
  const { cardDashboard } = useSelector((state) => state.dashboardCards);
  return (
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
  );
}

export default TodayDashboardScreen;
