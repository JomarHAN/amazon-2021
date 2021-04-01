import React from "react";
import WeeklyChart from "./WeekIncomeChart";

function WeekDashboardScreen() {
  const d = new Date();
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  console.log(d.getDate());
  return (
    <div className="weekly">
      <div className="row">
        <div className="change-week">
          <button>
            <i className="fa fa-caret-left"></i>
          </button>
          <h1>03/29/2021</h1> - <h1>04/04/2021</h1>
          <button>
            <i className="fa fa-caret-right"></i>
          </button>
        </div>
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
