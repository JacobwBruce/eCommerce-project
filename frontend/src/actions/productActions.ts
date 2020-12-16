import {
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';
import axios from 'axios';
import { Dispatch } from 'redux';

export const listProducts = () => async (
    dispatch: (arg0: { type: string; payload?: Object }) => void
) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get('/api/products/');

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
