import { types } from './actionTypes';
const initialState = {
    user: null,
    categories: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case types.user:
            return {
                ...state,
                user: action.payload
            }
        case types.categories:
                return {
                    ...state,
                    categories: ['Barcha darslar', ...action.payload]
                }
        default : return state
    }    
}   

export default reducer;