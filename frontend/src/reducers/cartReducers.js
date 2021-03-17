import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_ADD_ITEM_FAIL_RESET, CART_DELETE_ITEM, CART_EMPTY, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } from "../constanst/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.productId === item.productId)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.productId === existItem.productId ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_ADD_ITEM_FAIL:
            return { ...state, cartItems: [...state.cartItems], error: action.payload }
        case CART_ADD_ITEM_FAIL_RESET:
            return { ...state, cartItems: [...state.cartItems], error: null }
        case CART_DELETE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.productId !== action.payload)
            }
        case SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload }
        case SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload }
        case CART_EMPTY:
            return { ...state, cartItems: [] }
        default:
            return state;
    }
}