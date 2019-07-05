import * as actionTypes from '../action/actionTypes';
import {updateObject} from '../utility';
const authSignup=(state,action)=>{
    return updateObject(state,{
        First:action.payload.First,
        Last:action.payload.Last,
        Email:action.payload.Email,
        Id:action.payload._id,

    })
}
const authLogout=(state,action)=>{
    return updateObject(state,{
        First:'',
        Last:'',
        Email:'',
        Id:'',

    })
}
const initialState={
    First:'',
    Last:'',
    Email:'',
    Id:'',

}

const reducer=(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.AUTH_SIGNUP:return authSignup(state,action);
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action);

        default:
            return state;
    }

}

export default reducer;