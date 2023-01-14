import {AppStateType} from "../redux-store";

export const getIsAuth = (state: AppStateType) => {
    return state.authMe.isAuth;
}

export const getCaptchaUrl = (state: AppStateType) => {
    return state.authMe.captchaUrl;
}
