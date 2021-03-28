import { DASHBOARD_CARDS_INFO_REQUEST } from "../constanst/dashboardConstants"

export const getDashboardCardsInfo = (today) => async (dispatch, getState) => {
    const { orderList: { orders } } = getState()

    if (orders?.length > 0) {
        dispatch({ type: DASHBOARD_CARDS_INFO_REQUEST, payload: { orders, today } })
    }
}