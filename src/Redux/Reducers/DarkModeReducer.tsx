import { DARK_MODE } from "../Constant";


const initialState = {
    darkMode: false,
};


export const darkModeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            };
        default:
            return state;
    }
};