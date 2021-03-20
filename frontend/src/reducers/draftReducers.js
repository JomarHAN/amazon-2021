import {
    DRAFT_CREATE_FAIL,
    DRAFT_CREATE_REQUEST,
    DRAFT_CREATE_RESET,
    DRAFT_CREATE_SUCCESS,
    DRAFT_DETAIL_FAIL,
    DRAFT_DETAIL_REQUEST,
    DRAFT_DETAIL_SUCCESS,
    DRAFT_LIST_FAIL,
    DRAFT_LIST_REQUEST,
    DRAFT_LIST_SUCCESS,
    DRAFT_REMOVE_FAIL,
    DRAFT_REMOVE_REQUEST,
    DRAFT_REMOVE_SUCCESS,
    DRAFT_REMOVE_RESET,
    DRAFT_UPDATE_FAIL,
    DRAFT_UPDATE_REQUEST,
    DRAFT_UPDATE_RESET,
    DRAFT_UPDATE_SUCCESS,
} from "../constanst/draftConstants"

export const draftCreatedReducer = (state = {}, action) => {
    switch (action.type) {
        case DRAFT_CREATE_REQUEST:
            return { loading: true }
        case DRAFT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case DRAFT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case DRAFT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const draftDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case DRAFT_DETAIL_REQUEST:
            return { loading: true }
        case DRAFT_DETAIL_SUCCESS:
            return { loading: false, draft: action.payload }
        case DRAFT_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const draftUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case DRAFT_UPDATE_REQUEST:
            return { loading: true }
        case DRAFT_UPDATE_SUCCESS:
            return { loading: false, success: true, draft: action.payload }
        case DRAFT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case DRAFT_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

export const draftListReducer = (state = {}, action) => {
    switch (action.type) {
        case DRAFT_LIST_REQUEST:
            return { loading: true }
        case DRAFT_LIST_SUCCESS:
            return { loading: false, drafts: action.payload }
        case DRAFT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const draftRemoveReducer = (state = {}, action) => {
    switch (action.type) {
        case DRAFT_REMOVE_REQUEST:
            return { loading: true }
        case DRAFT_REMOVE_SUCCESS:
            return { loading: false, success: true }
        case DRAFT_REMOVE_FAIL:
            return { loading: false, error: action.payload }
        case DRAFT_REMOVE_RESET:
            return {}
        default:
            return state;
    }
}