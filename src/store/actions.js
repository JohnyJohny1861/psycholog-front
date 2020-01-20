import axios from '../axios';
import { types } from './actionTypes';

let SAVE_FAKE_USER = null;

/////////////////////////////////////////////////////////////////////////////////
// State Change Functions
export const loading = (payload) => ({type: types.loading, payload});
export const message = (payload) => ({type: types.message, payload});
export const user = (payload) => ({type: types.user, payload});
export const fakeUser = (payload) => ({type: types.fakeUser, payload});
export const errorMsg = (payload) => ({type: types.errorMsg, payload});
export const toggleModal = (payload) => ({type: types.toggleModal, payload})

/////////////////////////////////////////////////////////////////////////////////
// ASYNC ACTIONS
export const modalHandler = (payload) => dispatch => {
    if(!payload) {
        const buttons = document.querySelectorAll('button.close');
        if(buttons) {
            buttons.forEach(btn => btn.click())
        }
        dispatch(loading(false));
        dispatch(fakeUser(null));
        dispatch(message(null));
        dispatch(errorMsg(null))
    }
    dispatch(toggleModal(payload));
};

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
            dispatch(loading(false));
            dispatch(fakeUser(SAVE_FAKE_USER));
        }
    } catch (err) {
        dispatch(loading(true));
        dispatch(errorMsg('Serverda xatolik bor'));
    }
}

export const sendSms = (form) => async dispatch => {
    dispatch(loading(true));
    SAVE_FAKE_USER = form;
    try {
        const res = await axios.post('signupSms', form);
        if(res.status === 226) { // ERROR
            dispatch(loading(false));
            dispatch(errorMsg(res.data.error));
        } else {
            dispatch(loading(false));
            dispatch(errorMsg(null));
            dispatch(message(res.data.message));
            setTimeout(() => {
                dispatch(message(null))
            }, 50000)
        }
    } catch(err) {
        dispatch(loading(false));
        dispatch(errorMsg('Serverda xatolik bor'));
    }
}

export const login = (form) => async dispatch => {
    dispatch(loading(true));
    dispatch(fakeUser(null));
    try {
        const res = await axios.post('login', form);
        if(res.status === 226) { // ERROR
            dispatch(loading(false));
            dispatch(errorMsg(res.data.error));
        } else {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setTimeout(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                dispatch(user(null));
            }, 1000 * 60 * 60) // After 1 hour
            dispatch(modalHandler(false));
            dispatch(user(res.data.user));
        }
    } catch(err) {
        dispatch(loading(false));
        dispatch(errorMsg('Serverda xatolik bor'));
    }
}

export const logout = () => async dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(user(null));
}

export const getUser = () => async dispatch => {
    if(localStorage.hasOwnProperty('user')){
        dispatch(user(JSON.parse(localStorage.getItem('user'))))
    } 
}

/////////////////////////////////////////////////////////////////////////////////
// No State Change Functions