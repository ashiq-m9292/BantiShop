import {
    RECENTLY_VIEWED_REQUEST,
    RECENTLY_VIEWED_GET_SUCCESS,
    RECENTLY_VIEWED_CREATE_SUCCESS,
    RECENTLY_VIEWED_FAIL
} from '../Constant';
import { BASE_URL } from '@env';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// create recently viewed
export const createRecently = (productId: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/recently/createviewed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: RECENTLY_VIEWED_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: RECENTLY_VIEWED_CREATE_SUCCESS, payload: data.viewed });
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// get recently viewed
export const getRecently = () => async (dispatch: any) => {
    try {
        dispatch({ type: RECENTLY_VIEWED_REQUEST });
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/recently/getallviewed`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: RECENTLY_VIEWED_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: RECENTLY_VIEWED_GET_SUCCESS, payload: data.viewed });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: RECENTLY_VIEWED_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};