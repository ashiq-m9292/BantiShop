import {
    ADDRESS_REQUEST,
    GET_USER_ADDRESS_SUCCESS,
    ADDRESS_FAIL,
    ADD_USER_ADDRESS_SUCCESS,
    UPDATE_USER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_SUCCESS,
    SET_DEFAULT_ADDRESS_SUCCESS,
} from '../Constant';


const initialState = {
    loading: false,
    addresses: [],
    error: null,
};


export const addressReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                addresses: action.payload,
            };
        case ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                addresses: action.payload
            };
        case UPDATE_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                addresses: action.payload
            };
        case DELETE_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                addresses: action.payload
            };
        case SET_DEFAULT_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                addresses: action.payload
            };
        default:
            return state;
    }
};