import { combineReducers } from 'redux';

import { darkModeReducer } from './Reducers/DarkModeReducer';

export const rootReducer = combineReducers({
    DARKMODE: darkModeReducer,
});
