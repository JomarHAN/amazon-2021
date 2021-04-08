import axios from "axios"
import {
    DASHBOARD_CARDS_INFO_REQUEST,
    DASHBOARD_BAR_CHART_WEEKLY,
    DASHBOARD_WEEKLY_FAIL,
    DASHBOARD_WEEKLY_REQUEST,
    DASHBOARD_WEEKLY_SUCCESS,
    DASHBOARD_PIE_CHART_WEEKLY,
    DASHBOARD_LINE_CHART_WEEKLY,
    DASHBOARD_PIE_CHART_RESET,
    DASHBOARD_LINE_CHART_RESET
} from "../constanst/dashboardConstants"

export const getDashboardCardsInfo = (today) => async (dispatch, getState) => {
    const { orderList: { orders } } = getState()
    if (orders?.length > 0) {
        dispatch({ type: DASHBOARD_CARDS_INFO_REQUEST, payload: { orders, today } })
    }
}

export const getWeekBussiness = (dayEnd, dayStart) => async (dispatch, getState) => {
    dispatch({ type: DASHBOARD_WEEKLY_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`/api/orders?dayStart=${dayStart}&dayEnd=${dayEnd}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: DASHBOARD_WEEKLY_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: DASHBOARD_WEEKLY_FAIL, payload: message })
    }
}

export const getBarChartInfo = (weekDateInfo, orders) => async (dispatch) => {
    weekDateInfo.map(d => (
        d.sold.income = orders?.reduce((a, c) => {
            return c.orderDate === d.date && c.isPaid ? a + c.totalPrice : a
        }, 0)
    ))
    dispatch({ type: DASHBOARD_BAR_CHART_WEEKLY, payload: weekDateInfo })
}

export const getPieChartInfo = (orders) => (dispatch) => {
    dispatch({ type: DASHBOARD_PIE_CHART_RESET })
    const orderItems = []
    orders?.map(order => order.orderItems.map(o => orderItems.push({ id: o.productId, name: o.name, qty: o.qty })))
    orderItems.map(item => dispatch({ type: DASHBOARD_PIE_CHART_WEEKLY, payload: item }))
}

export const getLineChartInfo = (weekDateInfo, orders) => (dispatch) => {
    dispatch({ type: DASHBOARD_LINE_CHART_RESET })
    const itemsArray = []
    orders?.map(order => order.orderItems.map(o => itemsArray.push({
        name: o.name,
        qty: o.qty,
        date: order.orderDate,
        week: weekDateInfo.map(date =>
            date.date === order.orderDate
                ? date.qty = o.qty
                : date.qty = 0
        )
    })
    ))
    itemsArray.map(item =>
        dispatch({ type: DASHBOARD_LINE_CHART_WEEKLY, payload: item })
    )
}