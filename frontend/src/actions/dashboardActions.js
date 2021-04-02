import axios from "axios"
import { DASHBOARD_CARDS_INFO_REQUEST, DASHBOARD_WEEKLY_FAIL, DASHBOARD_WEEKLY_REQUEST, DASHBOARD_WEEKLY_SUCCESS } from "../constanst/dashboardConstants"

export const getDashboardCardsInfo = (today) => async (dispatch, getState) => {
    const { orderList: { orders } } = getState()

    if (orders?.length > 0) {
        dispatch({ type: DASHBOARD_CARDS_INFO_REQUEST, payload: { orders, today } })
    }
}

export const getWeekBussiness = (dayEnd, dayStart) => async (dispatch, getState) => {
    // console.log(dayStart + " ---> " + dayEnd)
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