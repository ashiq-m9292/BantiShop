import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_PROFILE_SUCCESS
} from '../Constant';

const initialState = {
    token: null,
    loading: true,
    user: null,
    darkMode: false,
    error: null,
};


const userAuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.payload.token
            };
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: null
            };
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                error: null
            };
        default:
            return state;
    }
}

export default userAuthReducer;
