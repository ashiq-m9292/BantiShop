import { DARK_MODE } from "../Constant";



// toggle dark mode
export const toggleDarkMode = () => async (dispatch: any) => {
    dispatch({ type: DARK_MODE });
};

