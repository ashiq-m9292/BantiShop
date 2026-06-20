import {
    ADDRESS_REQUEST,
    GET_USER_ADDRESS_SUCCESS,
    ADDRESS_FAIL,
    ADD_USER_ADDRESS_SUCCESS,
    UPDATE_USER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_SUCCESS,
    SET_DEFAULT_ADDRESS_SUCCESS,
} from '../Constant';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';


// create address
export const createAddress = (addressData: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/address/createaddress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(addressData),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: ADDRESS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: ADD_USER_ADDRESS_SUCCESS, payload: data.address });
        ToastAndroid.show('Address added successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: ADDRESS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// get user address
export const getUserAddress = () => async (dispatch: any) => {
    try {
        dispatch({ type: ADDRESS_REQUEST });
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/address/alladdresses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: ADDRESS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: GET_USER_ADDRESS_SUCCESS, payload: data.address });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: ADDRESS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// update address
export const updatingAddress = (id: string, values: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/address/updateaddress/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: ADDRESS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: UPDATE_USER_ADDRESS_SUCCESS, payload: data.address });
        ToastAndroid.show('Address updated successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: ADDRESS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// delete address
export const deleteAddress = (id: string) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/address/deleteaddress/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: ADDRESS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: DELETE_USER_ADDRESS_SUCCESS, payload: id });
        ToastAndroid.show('Address deleted successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: ADDRESS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// update default address
export const updateDefaultAddress = (id: string) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/address/setdefault/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: ADDRESS_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: SET_DEFAULT_ADDRESS_SUCCESS, payload: data.address });
        ToastAndroid.show('Default address updated successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: ADDRESS_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};