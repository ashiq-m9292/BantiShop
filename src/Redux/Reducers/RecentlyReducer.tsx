import {
    RECENTLY_VIEWED_REQUEST,
    RECENTLY_VIEWED_GET_SUCCESS,
    RECENTLY_VIEWED_CREATE_SUCCESS,
    RECENTLY_VIEWED_FAIL
} from '../Constant';


const initialState = {
    recently: [],
    recentlyLoading: true,
    error: null
};


export const recentlyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case RECENTLY_VIEWED_REQUEST:
            return {
                ...state,
                recentlyLoading: true,
                error: null
            }
        case RECENTLY_VIEWED_GET_SUCCESS:
            return {
                ...state,
                recentlyLoading: false,
                error: null,
                recently: action.payload
            }
        case RECENTLY_VIEWED_CREATE_SUCCESS:
            return {
                ...state,
                recentlyLoading: false,
                error: null,
                recently: action.payload
            }
        case RECENTLY_VIEWED_FAIL:
            return {
                ...state,
                recentlyLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}