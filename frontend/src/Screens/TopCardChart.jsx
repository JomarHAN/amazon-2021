import React from "react";
import { Pie } from "react-chartjs-2";

function TopChart({ title, dataChart, subDone, subNotDone, Paid }) {
  return (
    <div className="card-dashboard">
      <h3 className="title-card">{title}</h3>
      <Pie data={dataChart} />
      <div className="row">
        <small className="subOrder">
          {Paid ? "Paid" : "Delivered"}: {subDone}
        </small>
        <small className="subOrder">
          Not {Paid ? "Paid" : "Delivered"}: {subNotDone}
        </small>
      </div>
    </div>
  );
}

export default TopChart;
