import { Dispatch } from 'redux';
import axios from 'axios';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/userContant';

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/users/login', { email, password, config });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const logout = () => (dispatch: Dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};
