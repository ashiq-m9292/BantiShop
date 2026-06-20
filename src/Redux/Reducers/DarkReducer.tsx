import {
    DARK_MODE_SUCCESS,
    DARK_MODE_FAIL,
    GET_DARK_MODE
} from '../Constant';


const initialState = {
    darkMode: false,
    error: null,
};


export const darkModeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case DARK_MODE_SUCCESS:
            return {
                ...state,
                darkMode: action.payload,
            };
        case DARK_MODE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case GET_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload,
            };
        default:
            return state;
    }
}