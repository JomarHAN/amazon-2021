import Axios from 'axios'
import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
} from "../constanst/userConstants"

export const signin = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST })
    try {
        const { data } = await Axios.post('/api/users/signin', user)
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_SIGNIN_FAIL, payload: message })
    }
}

export const signout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    dispatch({ type: USER_SIGNOUT })
}