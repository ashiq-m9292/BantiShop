import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_PROFILE_SUCCESS
} from '../Constant';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

// signup api 
export const signup = (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/user/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        ToastAndroid.show(data.message || 'User created successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};


// login api
export const login = (email: string, password: string) => async (dispatch: any) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const response = await fetch(`${BASE_URL}/api/v1/user/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: USER_LOGIN_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        await AsyncStorage.setItem('token', data.token);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        ToastAndroid.show(data.message || 'User logged in successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// logout api
export const logout = () => async (dispatch: any) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
        ToastAndroid.show('Please login first', ToastAndroid.SHORT);
        return;
    }
    try {
        const response = await fetch(`${BASE_URL}/api/v1/user/logoutuser`, {
            method: 'POST',
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
        await AsyncStorage.removeItem('token');
        dispatch({ type: USER_LOGOUT_SUCCESS });
        ToastAndroid.show(data.message || 'User logged out successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// load token 
export const loadToken = () => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            dispatch({ type: USER_LOGOUT_SUCCESS });
            return { success: false };
        }
        dispatch({ type: USER_LOGIN_SUCCESS, payload: { token } });
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};


// get user profile 
export const getProfile = () => async (dispatch: any) => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
        ToastAndroid.show('Please login first', ToastAndroid.SHORT);
        return;
    }
    try {
        const response = await fetch(`${BASE_URL}/api/v1/user/profile`, {
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
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};
