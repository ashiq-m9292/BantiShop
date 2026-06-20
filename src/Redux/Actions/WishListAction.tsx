import {
    WISHLIST_REQUEST,
    GET_USER_WISHLIST_ITEM,
    WISHLIST_FAIL,
    ADD_TO_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST_SUCCESS
} from '../Constant';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

// add to wishlist
export const addToWishList = (productId: string) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/wishlist/createwishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: WISHLIST_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: data.wishList });
        ToastAndroid.show(data.message || 'Added to wishlist', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        dispatch({ type: WISHLIST_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// revove from wishlist
export const removeFromWishList = (productId: string) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/wishlist/deletewishlist/${productId}`, {
            method: 'DELETE',
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
        dispatch({ type: REMOVE_FROM_WISHLIST_SUCCESS, payload: data.wishList });
        ToastAndroid.show(data.message || 'Removed from wishlist', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// get user wishlist item
export const getallwishlist = () => async (dispatch: any) => {
    try {
        dispatch({ type: WISHLIST_REQUEST });
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/wishlist/getallwishlists`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: WISHLIST_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: GET_USER_WISHLIST_ITEM, payload: data.wishLists });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: WISHLIST_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};