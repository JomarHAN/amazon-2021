import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeekBussiness } from "../actions/dashboardActions";
import WeeklyChart from "./WeeklyChart";

function WeekDashboardScreen() {
  const [first, setFirst] = useState(1);
  const [last, setLast] = useState(7);
  const getDay = (num) => {
    const day = moment().get("date") - moment().get("day") + num;
    const result = moment().set("date", day).format("MM-DD-YYYY");
    return result;
  };
  const [dayStart, setDayStart] = useState();
  const [dayEnd, setDayEnd] = useState();
  const [click, setClick] = useState(false);
  const { orders } = useSelector((state) => state.dashboardWeek);

  const dispatch = useDispatch();
  useEffect(() => {
    if ((!dayStart && !dayEnd) || click) {
      setDayStart(getDay(first));
      setDayEnd(getDay(last));
      setClick(false);
    }
    dispatch(getWeekBussiness(dayEnd, dayStart));
  }, [dispatch, dayEnd, dayStart, first, last, click]);

  const onChangeWeek = (num) => {
    setFirst(first + num);
    setLast(last + num);
    setClick(true);
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
          <h1>{dayStart}</h1> - <h1>{dayEnd}</h1>
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
        <WeeklyChart title="Income" orders={orders} />
        <WeeklyChart title="Orders" />
        <WeeklyChart title="Products Trending" />
      </div>
    </div>
  );
}

export default WeekDashboardScreen;
