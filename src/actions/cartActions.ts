import axios from 'axios';
import { Dispatch } from 'redux';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';
import ProductInterface from '../interfaces/ProductInterface';
import ShippingAddressInterface from '../interfaces/ShippingAddressInterface';

export const addToCart = (id: string, qty: number) => async (dispatch: Dispatch, getState: any) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: { ...data, qty },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (item: ProductInterface) => (dispatch: Dispatch, getState: any) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: item,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data: ShippingAddressInterface) => (dispatch: Dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (method: string) => (dispatch: Dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: method,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(method));
};
