import Axios from "axios"
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
} from "../constanst/productConstants"

export const getListProducts = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    try {
        const { data } = await Axios.get('/api/products')
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: PRODUCT_LIST_FAIL, payload: message })
    }
}

export const getProductDetail = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })
    try {
        const { data } = await Axios.get(`/api/products/${productId}`)
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: PRODUCT_DETAIL_FAIL, payload: message })
    }
}