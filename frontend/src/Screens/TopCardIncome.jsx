import React from "react";

function TopCardIncome({ title, today, week }) {
  return (
    <div className="card-dashboard">
      <h3 className="title-card">{title}</h3>
      <h2 className="today-card">
        Today: <span>+{today}</span>
      </h2>
      <small className="week-card">
        This Week: <span>{week}</span>
      </small>
    </div>
  );
}

export default TopCardIncome;
