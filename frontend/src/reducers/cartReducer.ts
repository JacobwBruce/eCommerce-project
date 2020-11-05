import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import ProductInterface from '../interfaces/ProductInterface';
import ShippingAddressInterface from '../interfaces/ShippingAddressInterface';

export const cartReducer = (
    state: { cartItems: Array<ProductInterface>; shppingAddress: ShippingAddressInterface },
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

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };

        default:
            return { ...state };
    }
};
