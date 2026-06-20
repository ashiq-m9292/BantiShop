import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL
} from '../Constant';
import { BASE_URL } from '@env';
import { ToastAndroid } from 'react-native';

// get products
export const getProductData = () => async (dispatch: any) => {
    try {
        dispatch({ type: PRODUCT_REQUEST });
        const response = await fetch(`${BASE_URL}/api/v1/product/getallproducts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: PRODUCT_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: PRODUCT_SUCCESS, payload: data.products });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: PRODUCT_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};


// search products
export const getSearchProducts = ({ keyword, category, minPrice, maxPrice }: any) => async (dispatch: any) => {
    try {
        dispatch({ type: SEARCH_REQUEST });
        const params = new URLSearchParams()
        if (keyword) params.append('keyword', keyword)
        if (category) params.append('category', category)
        if (minPrice) params.append('minPrice', minPrice)
        if (maxPrice) params.append('maxPrice', maxPrice)
        const response = await fetch(`${BASE_URL}/api/v1/product/search?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            dispatch({ type: SEARCH_FAIL, payload: data.message });
            ToastAndroid.show(data.message || 'Something went wrong', ToastAndroid.SHORT);
            return { success: false };
        }
        dispatch({ type: SEARCH_SUCCESS, payload: data.products });
        return { success: true };
    } catch (error: any) {
        dispatch({ type: SEARCH_FAIL, payload: error.message });
        ToastAndroid.show(error.message || 'Something went wrong', ToastAndroid.SHORT);
        return { success: false };
    }
};

