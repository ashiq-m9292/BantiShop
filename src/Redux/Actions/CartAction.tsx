import {
    CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    REMOVE_FROM_CART_SUCCESS,
    CART_FAIL,
    GET_USER_CART_ITEM,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
} from '../Constant';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';


// add to cart
export const addToCart = (productId: any, size: any, price: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/cart/createcart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, size, price }),
        });
        const data = await response.json();
        if (!response.ok) {
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.cart });
        ToastAndroid.show(data.message || 'Product added to cart successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};


// remove from cart
export const removeFromCart = (productId: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/cart/deletecart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });
        const data = await response.json();
        if (!response.ok) {
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: data.cart });
        ToastAndroid.show(data.message || 'Product removed from cart successfully', ToastAndroid.SHORT);
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};


// get cart data
export const allCartItems = () => async (dispatch: any) => {
    try {
        dispatch({ type: CART_REQUEST });
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/cart/getallcart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: CART_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: GET_USER_CART_ITEM, payload: data.cart });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: CART_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};


// increase quantity
export const increaseQuantity = (productId: any, quantity: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/cart/updatequantity/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity }),
        });
        const data = await response.json();
        if (!response.ok) {
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: INCREASE_QUANTITY, payload: data.cart });
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

// decrease quantity 
export const decreaseQuantity = (productId: any, quantity: any) => async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            ToastAndroid.show('Please login first', ToastAndroid.SHORT);
            return;
        }
        const response = await fetch(`${BASE_URL}/api/v1/cart/updatequantity/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity }),
        });
        const data = await response.json();
        if (!response.ok) {
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: DECREASE_QUANTITY, payload: data.cart })
        return { success: true };
    } catch (error: any) {
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};
