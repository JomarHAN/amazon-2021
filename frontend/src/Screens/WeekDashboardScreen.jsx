import moment from "moment";
import React, { useEffect, useState } from "react";
import WeeklyChart from "./WeekIncomeChart";

function WeekDashboardScreen() {
  const [first, setFirst] = useState(1);
  const [last, setLast] = useState(7);
  const [mon, setMon] = useState();
  const [sun, setSun] = useState();

  useEffect(() => {
    const getDay = (num) => {
      const day = moment().get("date") - moment().get("day") + num;
      const result = moment().set("date", day).format("YYYY-MM-DD");
      return result;
    };
    setMon(getDay(first));
    setSun(getDay(last));
  }, [first, last]);

  const onChangeWeek = (num) => {
    setFirst(first + num);
    setLast(last + num);
  };

  return (
    <div className="weekly">
      <div className="row">
        <div className="change-week">
          <button
            type="button"
            onClick={() => {
              onChangeWeek(-7);
            }}
          >
            <i className="fa fa-caret-left"></i>
          </button>
          <h1>{mon}</h1> - <h1>{sun}</h1>
          <button
            type="button"
            onClick={() => {
              onChangeWeek(7);
            }}
          >
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
