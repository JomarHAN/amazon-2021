import React from "react";
import WeeklyChart from "./WeekIncomeChart";

function WeekDashboardScreen() {
  return (
    <div className="weekly">
      <div className="row change-week">
        <button>
          <i className="fa fa-caret-left"></i>
        </button>
        <h1>03-29-2021</h1>-<h1>04-04-2021</h1>
        <button>
          <i className="fa fa-caret-right"></i>
        </button>
      </div>
      <div className="row">
        <WeeklyChart title="Income" />
        <WeeklyChart title="Orders" />
        <WeeklyChart title="Products Trending" />
      </div>
    </div>
  );
}

export default WeekDashboardScreen;
