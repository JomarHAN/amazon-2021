import Axios from 'axios'
import { CART_EMPTY } from '../constanst/cartConstants'
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_HISTORY_FAIL,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
} from "../constanst/orderConstants"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST })
    try {
        const { userSignin: { userInfo } } = getState()
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem('cartItems')
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: ORDER_CREATE_FAIL, payload: message })
    }
}

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
    }
}

export const payOrder = (order, result) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.put(`/api/orders/${order._id}/pay`, result, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data.order })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: ORDER_PAY_FAIL, payload: message })
    }
}

export const getOrderHistory = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_HISTORY_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: ORDER_HISTORY_FAIL, payload: message })
    }
}

export const getOrderList = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.get('/api/orders', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: ORDER_LIST_FAIL, payload: message })
    }
}