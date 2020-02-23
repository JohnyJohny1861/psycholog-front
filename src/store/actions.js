import axios from '../axios';
import { types } from './actionTypes';

/////////////////////////////////////////////////////////////////////////////////
// State Change Functions
export const user = (payload) => ({type: types.user, payload});
export const categories = (payload) => ({type: types.categories, payload});

/////////////////////////////////////////////////////////////////////////////////
// ASYNC ACTIONS
export const logout = () => async dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(user(null));
}

export const getUser = () => async dispatch => {
    if(localStorage.hasOwnProperty('userId')){
        const userId = JSON.parse(localStorage.getItem('userId'));
        const res = await axios.get('user/' + userId);
        dispatch(user(res.data.data));
    } 
}

export const getCategories = () => async dispatch => {
    const res = await axios.get('category');
    dispatch(categories(res.data.data.map(cat => cat.name)))
}