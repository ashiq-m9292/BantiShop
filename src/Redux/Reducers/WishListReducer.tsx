import {
    WISHLIST_REQUEST,
    GET_USER_WISHLIST_ITEM,
    WISHLIST_FAIL,
    ADD_TO_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST_SUCCESS
} from '../Constant';


const initialState = {
    loading: false,
    wishlistItems: [],
    error: null,
};

export const wishListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_WISHLIST_ITEM:
            return {
                ...state,
                loading: false,
                error: null,
                wishlistItems: action.payload,
            };
        case WISHLIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_TO_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                wishlistItems: action.payload,
            };
        case REMOVE_FROM_WISHLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                wishlistItems: action.payload,
            };
        default:
            return state;
        }
};