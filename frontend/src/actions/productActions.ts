import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';
import axios from 'axios';
import { Dispatch } from 'redux';
import ReviewInterface from '../interfaces/ReviewInterface';

export const listProducts = (keyword = '') => async (
    dispatch: (arg0: { type: string; payload?: Object }) => void
) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get(`/api/products/?keyword=${keyword}`);

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const listProductDetails = (id: any) => async (
    dispatch: (arg0: { type: string; payload?: Object }) => void
) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const deleteProduct = (id: string) => async (dispatch: Dispatch, getState: any) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/products/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const createProduct = () => async (dispatch: Dispatch, getState: any) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post('/api/products', {}, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

// should change product back to ProductInterface
export const updateProduct = (product: any) => async (dispatch: Dispatch, getState: any) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(`/api/products/${product._id}`, product, config);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const createReview = (productId: string, review: any) => async (
    dispatch: Dispatch,
    getState: any
) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(`/api/products/${productId}/reviews`, review, config);

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
                err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};
