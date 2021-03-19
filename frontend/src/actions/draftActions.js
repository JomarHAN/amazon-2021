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
    DRAFT_UPDATE_SUCCESS
} from "../constanst/draftConstants"

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

