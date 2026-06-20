import {
    ORDER_REQUEST,
    GET_USER_ORDER_SUCCESS,
    ORDER_FAIL,
    ADD_ORDER_SUCCESS
} from '../Constant';

const initialState = {
    loading: false,
    orders: [],
    error: null,
};


export const orderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_USER_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload,
            };
        case ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: action.payload,
            };
        default:
            return state;
    }
}