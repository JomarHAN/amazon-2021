import Axios from 'axios'
import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNOUT,
    USER_PROFILE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
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

export const register = (user) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST })
    if (user.password !== user.confirmPassword) {
        dispatch({ type: USER_REGISTER_FAIL, payload: "Password and Confirm Password are not matched!" })
    } else {
        try {
            const { data } = await Axios.post('/api/users/register', user)
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            dispatch({ type: USER_REGISTER_FAIL, payload: message })
        }
    }
}

export const signout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    dispatch({ type: USER_SIGNOUT })
}

export const getUserProfile = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_PROFILE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_PROFILE_FAIL, payload: message })
    }
}