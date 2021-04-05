import {
    DASHBOARD_CARDS_INFO_REQUEST,
    DASHBOARD_CARDS_INFO_RESET,
    DASHBOARD_BAR_CHART_WEEKLY,
    DASHBOARD_WEEKLY_FAIL,
    DASHBOARD_WEEKLY_REQUEST,
    DASHBOARD_WEEKLY_RESET,
    DASHBOARD_WEEKLY_SUCCESS,
    DASHBOARD_PIE_CHART_WEEKLY
} from "../constanst/dashboardConstants";

export const dashboardCardsReducer = (state = { cardDashboard: {} }, action) => {
    switch (action.type) {
        case DASHBOARD_CARDS_INFO_REQUEST:
            const orders = action.payload.orders;
            const today = action.payload.today
            const todayOrders = orders?.reduce((a, c) => c.orderDate === today ? a + 1 : a, 0)
            const paidOrders = orders.reduce((a, c) => c.isPaid ? a + 1 : a, 0)
            const deliveredOrders = orders.reduce((a, c) => c.isDelivered ? a + 1 : a, 0)
            const totalIncome = orders.reduce((a, c) => c.isPaid ? c.totalPrice + a : a, 0)
            const todayIncome = orders.reduce((a, c) => c.isPaid && c.orderDate === today ? c.totalPrice + a : a, 0)
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

export const barChartReducer = (state = { chartInfo: {} }, action) => {
    switch (action.type) {
        case DASHBOARD_BAR_CHART_WEEKLY:
            const array = []
            const data = action.payload
            data.map(d => array.push(d.sold.income))
            return {
                ...state,
                chartInfo: array
            }
        default:
            return state;
    }
}

export const pieChartReducer = (state = { productsInfo: [] }, action) => {
    switch (action.type) {
        case DASHBOARD_PIE_CHART_WEEKLY:
            const item = action.payload
            const copyProductInfo = state.productsInfo
            copyProductInfo.reduce((a, c) => {
                return c.id === item.id ? item.qty + a : item
            }, 0)
            return {
                ...state,
                productsInfo: copyProductInfo
            }
        default:
            return state;
    }
}