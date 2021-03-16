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
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_ADMIN_UPDATE_REQUEST,
    USER_ADMIN_UPDATE_FAIL,
    USER_ADMIN_UPDATE_SUCCESS,
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

export const handleUserUpdate = (name, email, password, confirmPassword) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST })
    if (password !== confirmPassword) {
        dispatch({ type: USER_UPDATE_FAIL, payload: "Password and Confirm Password are not match" })
    } else {
        const { userSignin: { userInfo } } = getState()
        try {
            const { data } = await Axios.put('/api/users/profile', { name, email, password }, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            dispatch({ type: USER_UPDATE_FAIL, payload: message })
        }
    }
}

export const getUserList = () => async (dispatch, getState) => {
    dispatch({ type: USER_LIST_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.get('/api/users', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_LIST_FAIL, payload: message })
    }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
    dispatch({ type: USER_DELETE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.delete(`/api/users/delete/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_DELETE_SUCCESS, payload: data.message })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_DELETE_FAIL, payload: message })
    }
}

export const adminUpdateUser = (user) => async (dispatch, getState) => {
    dispatch({ type: USER_ADMIN_UPDATE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.put(`/api/users/update/${user._id}`, user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: USER_ADMIN_UPDATE_SUCCESS, payload: data.user })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: USER_ADMIN_UPDATE_FAIL, payload: message })
    }
}