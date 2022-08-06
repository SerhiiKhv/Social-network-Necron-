import {authAPI, securityAPi} from "../Api/Api";

const AUTH_ME_DATA = 'AUTH_ME_DATA';
const CAPTCHA_SUCCESS = 'CAPTCHA_SUCCESS';

export type InitialStateType = typeof initialState;

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export const authMeReducer = (state = initialState, action: any): InitialStateType => {
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
type AuthMeDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}



type AuthMeDataActionType = {
    type: typeof AUTH_ME_DATA
    payload: AuthMeDataActionPayloadType
}
export const authMeData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): AuthMeDataActionType=> ({type: AUTH_ME_DATA, payload: {email, login, userId, isAuth}})
type CaptchaSuccessActionType = {
    type: typeof CAPTCHA_SUCCESS
    payload: {captchaUrl :string | null}
}
export const captchaSuccess = (captchaUrl: string | null): CaptchaSuccessActionType => ({type: CAPTCHA_SUCCESS, payload: {captchaUrl}})

export const authMe = () => async (dispatch: any) => {
    let response = await authAPI.Me();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(authMeData(id, email, login, true));
    }
}


export const login = (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captchaUrl);
    if (response.data.resultCode === 0) {
        dispatch(authMe());
    }else if(response.data.resultCode === 10){
        dispatch(getCaptchaUrl());
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPi.captcha();
    let captchaUrl = response.data.url;
        dispatch(captchaSuccess(captchaUrl));
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(authMeData(null, null, null, false));
    }
}