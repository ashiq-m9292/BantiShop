import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL
} from '../Constant';

const initialState = {
    product: [],
    loading: true,
    error: null
};

export const productReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                product: action.payload
            };
        case PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                product: action.payload
            };
        case SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}