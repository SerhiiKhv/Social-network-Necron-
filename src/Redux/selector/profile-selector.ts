import {AppStateType} from "../redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status;
}

export const getUserId= (state: AppStateType) => {
    return state.authMe.userId;
}


