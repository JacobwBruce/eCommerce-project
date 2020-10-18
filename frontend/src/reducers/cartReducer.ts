import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';
import ProductInterface from '../interfaces/ProductInterface';

export const cartReducer = (
    state: { cartItems: Array<ProductInterface> },
    action: { type: string; payload: ProductInterface }
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => (x._id === existItem._id ? item : x)),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x._id !== action.payload._id),
            };

        default:
            return { ...state };
    }
};
