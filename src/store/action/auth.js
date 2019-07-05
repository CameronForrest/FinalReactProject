import * as actionTypes from './actionTypes';
export function signup(res) {
    return dispatch=>{
        dispatch({type:actionTypes.AUTH_SIGNUP,payload:res})

    }
}

export function logout() {
    localStorage.removeItem("user");
    return dispatch=>{
        dispatch({type:actionTypes.AUTH_LOGOUT})
    }

}