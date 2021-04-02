import { DASHBOARD_CARDS_INFO_REQUEST, DASHBOARD_CARDS_INFO_RESET, DASHBOARD_WEEKLY_FAIL, DASHBOARD_WEEKLY_REQUEST, DASHBOARD_WEEKLY_RESET, DASHBOARD_WEEKLY_SUCCESS } from "../constanst/dashboardConstants";

export const dashboardCardsReducer = (state = { cardDashboard: {} }, action) => {
    switch (action.type) {
        case DASHBOARD_CARDS_INFO_REQUEST:
            const orders = action.payload.orders;
            const today = action.payload.today
            const todayOrders = orders?.reduce((a, c) => c.createdAt.substring(10, 0) === today ? a + 1 : a, 0)
            const paidOrders = orders.reduce((a, c) => c.isPaid ? a + 1 : a, 0)
            const deliveredOrders = orders.reduce((a, c) => c.isDelivered ? a + 1 : a, 0)
            const totalIncome = orders.reduce((a, c) => c.isPaid ? c.totalPrice + a : a, 0)
            const todayIncome = orders.reduce((a, c) => c.isPaid && c.createdAt.substring(10, 0) === today ? c.totalPrice + a : a, 0)
            const totalOrders = orders?.length
            return {
                ...state,
                cardDashboard: {
                    totalOrders,
                    todayOrders,
                    paidOrders,
                    deliveredOrders,
                    totalIncome,
                    todayIncome
                }
            }
        case DASHBOARD_CARDS_INFO_RESET:
            return {
                ...state,
                cardDashboard: {}
            }
        default:
            return state;
    }
}

export const dashboardWeekReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case DASHBOARD_WEEKLY_REQUEST:
            return { loading: true }
        case DASHBOARD_WEEKLY_SUCCESS:
            return { loading: false, orders: action.payload }
        case DASHBOARD_WEEKLY_FAIL:
            return { loading: false, error: action.payload }
        case DASHBOARD_WEEKLY_RESET:
            return {}
        default:
            return state;
    }
}