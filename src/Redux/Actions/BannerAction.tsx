import {
    BANNER_REQUEST,
    BANNER_GET_SUCCESS,
    BANNER_FAIL
} from '../Constant';
import { BASE_URL } from '@env';
import { ToastAndroid } from 'react-native';

export const bannerData = () => async (dispatch: any) => {
    try {
        dispatch({ type: BANNER_REQUEST });
        const response = await fetch(`${BASE_URL}/api/v1/banner/getallbanner`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: BANNER_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: BANNER_GET_SUCCESS, payload: data.banner });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: BANNER_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};
