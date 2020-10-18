import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const cartItemsFromStorage: any = JSON.parse(localStorage.getItem('cartItems') || '[]');

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    //@ts-ignore
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
