import axios from '../axios';
import { types } from './actionTypes';

export const loading = (payload) => ({type: types.loading, payload});
export const message = (payload) => ({type: types.message, payload});
export const user = (payload) => ({type: types.user, payload});
export const errorMsg = (payload) => ({type: types.errorMsg, payload});

// ASYNC ACTIONS
export const signup = (smsCode) => async dispatch => {
    dispatch(loading(true));
    try {
        const res = await axios.post('signup', {smsCode});
        if(res.status === 226) {
            dispatch(errorMsg(res.data.error));
            dispatch(loading(false));
        } else {
            dispatch(message(null));
            dispatch(errorMsg(null));
            dispatch(user(res.data.data));
            dispatch(loading(false));
        }
    } catch (err) {
        dispatch(loading(true));
    }
}

export const sendSms = (form) => async dispatch => {
    dispatch(loading(true));
    try {
        // console.log(form.firstName, form.lastName)
        const res = await axios.post('signupSms', {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            password: form.password.value,
            phoneNumber: form.phoneNumber.value
        });
        if(res.status === 226) { // ERROR
            dispatch(loading(false));
            dispatch(errorMsg(res.data.error));
        } else {
            dispatch(errorMsg(null));
            dispatch(message(res.data.message))
        }
        dispatch(loading(false))
    } catch(err) {
        dispatch(loading(false));
        console.log(err)
    }
}

export const login = (form) => async dispatch => {
    dispatch(loading(true));
    try {
        const res = await axios.post('login', {
            password: form.password.value,
            phoneNumber: form.phoneNumber.value
        });
        if(res.status === 226) { // ERROR
            dispatch(loading(false));
            dispatch(errorMsg(res.data.error));
        } else {
            console.log(res.data)
            window.localStorage.setItem('token', res.data.token);
            dispatch(user(res.data.user));
        }
        dispatch(loading(false))
    } catch(err) {
        dispatch(loading(false));
        console.log(err)
    }
}