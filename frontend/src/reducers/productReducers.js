import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_FIELDS_LIST,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_RESET,
} from "../constanst/productConstants";

export const productFieldsReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_FIELDS_LIST:
            return { ...state, fields: action.payload }
        default:
            return state;
    }
}

export const productsListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productsTopSellReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true }
        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productDetailReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true }
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const productCreatedReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: false }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true, resultMessage: action.payload }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_DELETE_RESET:
            return {}
        default:
            return state;
    }
}

export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_REVIEW_SUCCESS:
            return { loading: false, success: true, review: action.payload }
        case PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_REVIEW_RESET:
            return {}
        default:
            return state;
    }
}