import axios from "axios"
import numeral from "numeral"
import { DASHBOARD_CARDS_INFO_REQUEST, DASHBOARD_BAR_CHART_WEEKLY, DASHBOARD_WEEKLY_FAIL, DASHBOARD_WEEKLY_REQUEST, DASHBOARD_WEEKLY_SUCCESS } from "../constanst/dashboardConstants"

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