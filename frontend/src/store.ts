import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromStorage: any = JSON.parse(localStorage.getItem('cartItems')!) || [];
const userInfoFromStorage: any = JSON.parse(localStorage.getItem('userInfo')!) || null;
const shippingAddressFromStorage: any = JSON.parse(localStorage.getItem('shippingAddress')!) || {
    address: '',
    city: '',
    postalCode: '',
    country: '',
};

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    //@ts-ignore
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
