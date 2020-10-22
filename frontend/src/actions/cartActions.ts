import axios from 'axios';
import { Dispatch } from 'redux';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import ProductInterface from '../interfaces/ProductInterface';

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
