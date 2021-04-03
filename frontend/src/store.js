import { productCreatedReducer, productDeleteReducer, productDetailReducer, productFieldsReducer, productReviewReducer, productsListReducer, productsTopSellReducer, productUpdateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { userAdminUpdateReducer, userDeleteReducer, userListReducer, userProfileReducer, userRegisterReducer, userReviewReducer, userShippingAddressReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDeleteReducer, orderDeliveryReducer, orderDetailsReducer, orderHistoryReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers'
import { draftCreatedReducer, draftDetailReducer, draftListReducer, draftRemoveReducer, draftUpdateReducer } from './reducers/draftReducers'
import { dashboardCardsReducer, dashboardChartWeeklyReducer, dashboardWeekReducer } from './reducers/dashboardReducers'
const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    },
    paymentMethod: "PayPal"
}

const reducer = combineReducers({
    productsList: productsListReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productDetail: productDetailReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderHistory: orderHistoryReducer,
    userProfile: userProfileReducer,
    userUpdate: userUpdateReducer,
    productCreated: productCreatedReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDelivery: orderDeliveryReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userAdminUpdate: userAdminUpdateReducer,
    productsTopSell: productsTopSellReducer,
    productFields: productFieldsReducer,
    productReview: productReviewReducer,
    userReview: userReviewReducer,
    userShippingAddress: userShippingAddressReducer,
    draftCreated: draftCreatedReducer,
    draftDetail: draftDetailReducer,
    draftUpdate: draftUpdateReducer,
    draftList: draftListReducer,
    draftRemove: draftRemoveReducer,
    dashboardCards: dashboardCardsReducer,
    dashboardWeek: dashboardWeekReducer,
    dashboardChartWeekly: dashboardChartWeeklyReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;