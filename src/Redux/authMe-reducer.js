import {authAPI, securityAPi} from "../Api/Api";

const AUTH_ME_DATA = 'AUTH_ME_DATA';
const CAPTCHA_SUCCESS = 'CAPTCHA_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

export const authMeReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_ME_DATA:
            case CAPTCHA_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const authMeData = (userId, email, login, isAuth) => ({type: AUTH_ME_DATA, payload: {email, login, userId, isAuth}})
export const captchaSuccess = (captchaUrl) => ({type: CAPTCHA_SUCCESS, payload: {captchaUrl}})

export const authMe = () => async (dispatch) => {
    let response = await authAPI.Me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(authMeData(id, email, login, true));
    }
}


export const login = (email, password, rememberMe, captchaUrl) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captchaUrl);
    if (response.data.resultCode === 0) {
        dispatch(authMe());
    }else if(response.data.resultCode === 10){
        dispatch(getCaptchaUrl());
    }
}
export const getCaptchaUrl = () => async (dispatch) => {
    let response = await securityAPi.captcha();
    let captchaUrl = response.data.url;
        dispatch(captchaSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(authMeData(null, null, null, false));
    }
}