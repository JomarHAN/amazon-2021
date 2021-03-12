import Axios from 'axios'
import { CART_ADD_ITEM, CART_DELETE_ITEM, SAVE_SHIPPING_ADDRESS } from '../constanst/cartConstants'

export const cartAddItem = (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`)
    dispatch({
        type: CART_ADD_ITEM, payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            productId: data._id,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const cartDeleteItem = (id) => async (dispatch, getState) => {
    dispatch({ type: CART_DELETE_ITEM, payload: id })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingAddress) => async (dispatch, getState) => {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: shippingAddress })
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
}