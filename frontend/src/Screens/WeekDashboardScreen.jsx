import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeekBussiness } from "../actions/dashboardActions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import StackedChart from "./StackedChart";

function WeekDashboardScreen() {
  const { orders } = useSelector((state) => state.dashboardWeek);
  const [first, setFirst] = useState(1);
  const [last, setLast] = useState(7);
  const [mon, setMon] = useState();
  const [tue, setTue] = useState();
  const [wed, setWed] = useState();
  const [thu, setThu] = useState();
  const [fri, setFri] = useState();
  const [sat, setSat] = useState();
  const [sun, setSun] = useState();
  const getDay = (num) => {
    const day = moment().get("date") - moment().get("day") + num;
    const result = moment().set("date", day).format("MM-DD-YYYY");
    return result;
  };
  const today = moment().format("MM-DD-YYYY");
  const [dayStart, setDayStart] = useState();
  const [dayEnd, setDayEnd] = useState();
  const [click, setClick] = useState(false);
  const weekDateInfo = [
    { date: mon, sold: {} },
    { date: tue, sold: {} },
    { date: wed, sold: {} },
    { date: thu, sold: {} },
    { date: fri, sold: {} },
    { date: sat, sold: {} },
    { date: sun, sold: {} },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    if ((!dayStart && !dayEnd) || click) {
      setDayStart(getDay(first));
      setDayEnd(getDay(last));
      setClick(false);
    }
    setMon(getDay(first));
    setTue(getDay(first + 1));
    setWed(getDay(first + 2));
    setThu(getDay(first + 3));
    setFri(getDay(first + 4));
    setSat(getDay(first + 5));
    setSun(getDay(first + 6));
    dispatch(getWeekBussiness(dayEnd, dayStart));
  }, [dispatch, dayEnd, dayStart, first, last, click]);

  const onPreviousWeek = (num) => {
    setFirst(first - num);
    setLast(last - num);
    setClick(true);
  };
  const onNextWeek = (num) => {
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
              onPreviousWeek(7);
            }}
          >
            <i className="fa fa-caret-left"></i>
          </button>
          <h1>{dayStart}</h1> - <h1>{dayEnd}</h1>
          <button
            type="button"
            onClick={() => {
              onNextWeek(7);
            }}
            disabled={getDay(first + 7) > today}
          >
            <i className="fa fa-caret-right"></i>
          </button>
        </div>
      </div>
      <div className="row">
        <BarChart title="Income" weekDateInfo={weekDateInfo} orders={orders} />
        <StackedChart title="Orders" />
        <LineChart title="Products Trending" />
      </div>
    </div>
  );
}

export default WeekDashboardScreen;
