import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import {
    userDeleteReducer,
    userDetailsReducer,
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer,
    userUpdateReducer,
} from './reducers/userReducers';
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderPayReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
});

export type RootState = ReturnType<typeof reducer>;

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
