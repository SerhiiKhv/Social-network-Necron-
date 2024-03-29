import {authAPI, securityAPi} from "../Api/Api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {ResultsCodesCaptchaEnum, ResultsCodesEnum} from "./ResultsCodesEnumsTypes/ResultsCodesEnumsTypes";

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

type ActionsTypes = AuthMeDataActionType | CaptchaSuccessActionType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authMeReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

export const authMe = ():ThunkType => async (dispatch) => {
    let data = await authAPI.Me();
    if (data.resultCode === ResultsCodesEnum.Success) {
        let {id, email, login} = data.data;
        dispatch(authMeData(id, email, login, true));
    }
}


export const login = (email: string, password: string,
                      rememberMe: boolean, captchaUrl: string | null):ThunkType =>
    async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captchaUrl);
    if (data.resultCode === ResultsCodesEnum.Success) {
        await dispatch(authMe());
    }else if(data.resultCode === ResultsCodesCaptchaEnum.captchaIsRequired){
        await dispatch(getCaptchaUrl());
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await securityAPi.captcha();
    let captchaUrl = data.url;
        dispatch(captchaSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === ResultsCodesEnum.Success) {
        dispatch(authMeData(null, null, null, false));
    }
}