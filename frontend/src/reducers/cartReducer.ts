import { CART_ADD_ITEM } from '../constants/cartConstants';
import ProductInterface from '../interfaces/ProductInterface';

export const cartReducer = (
    state: { cartItems: Array<ProductInterface> },
    action: { type: string; payload: { product: ProductInterface } }
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        default:
            return { ...state };
    }
};
