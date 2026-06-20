import {
    BANNER_REQUEST,
    BANNER_GET_SUCCESS,
    BANNER_FAIL
} from '../Constant';


const initialState = {
    banner: [],
    bannerLoading: true,
    error: null
};

export const bannerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case BANNER_REQUEST:
            return {
                ...state,
                bannerLoading: true,
                error: null
            };
        case BANNER_GET_SUCCESS:
            return {
                ...state,
                bannerLoading: false,
                error: null,
                banner: action.payload
            };
        case BANNER_FAIL:
            return {
                ...state,
                bannerLoading: false,
                error: action.payload
            };
        default:
            return state
    }
};