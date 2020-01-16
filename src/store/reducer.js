import { types } from './actionTypes';
const initialState = {
    loading: false,
    message: null,
    errorMsg: null,
    user: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case types.loading:
            return {
                ...state,
                loading: action.payload
            }
        case types.message:
            return {
                ...state,
                message: action.payload
            }
        case types.errorMsg:
            return {
                ...state,
                errorMsg: action.payload
            }
        case types.user:
            return {
                ...state,
                user: action.payload
            }
        default : return state
    }    
}   

export default reducer;