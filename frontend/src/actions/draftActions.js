import Axios from "axios"
import {
    DRAFT_CREATE_FAIL,
    DRAFT_CREATE_REQUEST,
    DRAFT_CREATE_SUCCESS,
    DRAFT_DETAIL_FAIL,
    DRAFT_DETAIL_REQUEST,
    DRAFT_DETAIL_SUCCESS,
    DRAFT_UPDATE_FAIL,
    DRAFT_UPDATE_REQUEST,
    DRAFT_UPDATE_SUCCESS,
    DRAFT_LIST_FAIL,
    DRAFT_LIST_REQUEST,
    DRAFT_LIST_SUCCESS,
    DRAFT_REMOVE_FAIL,
    DRAFT_REMOVE_REQUEST,
    DRAFT_REMOVE_SUCCESS,
} from "../constanst/draftConstants"
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS } from "../constanst/productConstants"

export const createDraft = () => async (dispatch, getState) => {
    dispatch({ type: DRAFT_CREATE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.post('/api/drafts', {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: DRAFT_CREATE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: DRAFT_CREATE_FAIL, payload: message })
    }
}


export const getDraftDetail = (productId) => async (dispatch, getState) => {
    dispatch({ type: DRAFT_DETAIL_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.get(`/api/drafts/${productId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: DRAFT_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: DRAFT_DETAIL_FAIL, payload: message })
    }
}



export const updateDraft = (draft) => async (dispatch, getState) => {
    dispatch({ type: DRAFT_UPDATE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.put(`/api/drafts/${draft._id}`, draft, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: DRAFT_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: DRAFT_UPDATE_FAIL, payload: message })
    }
}

export const getDraftList = ({ seller = "" }) => async (dispatch, getState) => {
    dispatch({ type: DRAFT_LIST_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.get(`/api/drafts?seller=${seller}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: DRAFT_LIST_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: DRAFT_LIST_FAIL, payload: message })
    }
}

export const publicDraftToProduct = (draft) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.post('/api/products', draft, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: message })
    }
}

export const removeDraft = (draftId) => async (dispatch, getState) => {
    dispatch({ type: DRAFT_REMOVE_REQUEST })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await Axios.delete(`/api/drafts/${draftId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: DRAFT_REMOVE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch({ type: DRAFT_REMOVE_FAIL, payload: message })
    }
}