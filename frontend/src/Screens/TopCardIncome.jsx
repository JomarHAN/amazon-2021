import React from "react";

function TopCardIncome({ title, today, week, green }) {
  console.log(today);
  return (
    <div className="card-dashboard">
      <h3 className="title-card">{title}</h3>
      <h2 className="today-card">
        Today: <span className={green > 0 && "success"}>+{today}</span>
      </h2>
      <small className="week-card">
        Total Income: <span>{week}</span>
      </small>
    </div>
  );
}

export default TopCardIncome;
