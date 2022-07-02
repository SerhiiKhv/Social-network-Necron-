import {authAPI} from "../Api/Api";

const AUTH_ME_DATA = 'AUTH_ME_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authMeReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_ME_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export const authMeData = (userId, email, login, isAuth) => ({type: AUTH_ME_DATA, data: {email, login, userId, isAuth}})

export const authMe = () => async (dispatch) => {
    let response = await authAPI.Me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(authMeData(id, email, login, true));
    }
}


export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, true);
    if (response.data.resultCode === 0) {
        dispatch(authMe());
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(authMeData(null, null, null, false));
    }
}