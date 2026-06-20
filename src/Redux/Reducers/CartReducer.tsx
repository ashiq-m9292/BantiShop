import {
    CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    REMOVE_FROM_CART_SUCCESS,
    CART_FAIL,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    GET_USER_CART_ITEM
} from '../Constant';

const initialState = {
    cart: [],
    loading: true,
    error: null,
};


export const cartredu = (state = initialState, action: any) => {
    switch (action.type) {
        case CART_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_USER_CART_ITEM:
            return {
                ...state,
                loading: false,
                error: null,
                cart: action.payload,
            };
        case CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                cart: action.payload,
            };
        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                cart: action.payload,
            };
        case INCREASE_QUANTITY:
            return {
                ...state,
                loading: false,
                error: null,
                cart: action.payload,
            };
        case DECREASE_QUANTITY:
            return {
                ...state,
                loading: false,
                error: null,
                cart: action.payload,
            };
        default:
            return state;
    }
};