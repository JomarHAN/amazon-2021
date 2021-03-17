import Axios from 'axios'
import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_DELETE_ITEM, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD } from '../constanst/cartConstants'

export const cartAddItem = (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`)
    const { cart: { cartItems } } = getState()
    if (cartItems.length > 0 && cartItems[0].seller._id !== data.seller._id) {
        dispatch({ type: CART_ADD_ITEM_FAIL, payload: `Can not add item. Only can purchase item from ${cartItems[0].seller.seller.business}` })
        return;
    }
    dispatch({
        type: CART_ADD_ITEM, payload: {
            name: data.name,
            image: data.imageAlbum.image1,
            price: data.price,
            countInStock: data.countInStock,
            productId: data._id,
            seller: data.seller,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const cartDeleteItem = (id) => async (dispatch, getState) => {
    dispatch({ type: CART_DELETE_ITEM, payload: id })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingAddress) => async (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: shippingAddress })
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
}

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethod })
}