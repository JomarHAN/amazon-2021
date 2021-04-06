import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeekBussiness } from "../actions/dashboardActions";
import IncomeChart from "./IncomeChart";
import ProductTrendChart from "./ProductTrendChart";
import ProductPortionChart from "./ProductPortionChart";

function WeekDashboardScreen() {
  const getDay = (num) => {
    const day = moment().get("date") - moment().get("day") + num;
    const result = moment().set("date", day).format("MM-DD-YYYY");
    return result;
  };
  const { orders } = useSelector((state) => state.dashboardWeek);
  const [first, setFirst] = useState(0);
  const [mon, setMon] = useState();
  const [tue, setTue] = useState();
  const [wed, setWed] = useState();
  const [thu, setThu] = useState();
  const [fri, setFri] = useState();
  const [sat, setSat] = useState();
  const [sun, setSun] = useState();
  const today = moment().format("MM-DD-YYYY");
  const [dayStart, setDayStart] = useState();
  const [dayEnd, setDayEnd] = useState();
  const [click, setClick] = useState(false);
  const weekDateInfo = [
    { date: sun, sold: {} },
    { date: mon, sold: {} },
    { date: tue, sold: {} },
    { date: wed, sold: {} },
    { date: thu, sold: {} },
    { date: fri, sold: {} },
    { date: sat, sold: {} },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    if (!dayStart || click) {
      setDayStart(getDay(first));
      setDayEnd(getDay(first + 6));
      setClick(false);
    }
    if (!click) {
      dispatch(getWeekBussiness(dayEnd, dayStart));
    }
    setMon(getDay(first + 1));
    setTue(getDay(first + 2));
    setWed(getDay(first + 3));
    setThu(getDay(first + 4));
    setFri(getDay(first + 5));
    setSat(getDay(first + 6));
    setSun(getDay(first));
  }, [dispatch, dayStart, dayEnd, first, click]);

  const onPreviousWeek = (num) => {
    setFirst(first - num);

    setClick(true);
  };
  const onNextWeek = (num) => {
    setFirst(first + num);
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
            disabled={getDay(first + 6) > today}
          >
            <i className="fa fa-caret-right"></i>
          </button>
        </div>
      </div>
      <div className="row">
        <IncomeChart
          title="Income ($)"
          weekDateInfo={weekDateInfo}
          orders={orders}
        />
        <ProductPortionChart
          title="Product Portion (items)"
          weekDateInfo={weekDateInfo}
          orders={orders}
        />
        <ProductTrendChart
          title="Products Trending"
          weekDateInfo={weekDateInfo}
          orders={orders}
        />
      </div>
    </div>
  );
}

export default WeekDashboardScreen;
