import {
    ORDER_REQUEST,
    GET_USER_ORDER_SUCCESS,
    ORDER_FAIL,
    ADD_ORDER_SUCCESS
} from '../Constant';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';


// get user order api
export const getUserOrder = () => async (dispatch: any) => {
    dispatch({ type: ORDER_REQUEST });
    const token = await AsyncStorage.getItem('token');
    if (!token) {
        ToastAndroid.show('Please login first', ToastAndroid.SHORT);
        return;
    }
    try {
        const response = await fetch(`${BASE_URL}/api/v1/order/getallorders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: GET_USER_ORDER_SUCCESS, payload: data.orders });
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};


// create order
export const createOrder = (orderData: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/order/createorder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });
        const data = await response.json();
        if (!response.ok) {
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: ADD_ORDER_SUCCESS, payload: data.orders });
        ToastAndroid.show('Order created successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};


