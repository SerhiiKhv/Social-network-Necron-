import {ProfileAPI} from "../Api/Api";
import {PhotosType, ProfileType} from "./Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";
import {ResultsCodesEnum} from "./ResultsCodesEnumsTypes/ResultsCodesEnumsTypes";

let initialState = {
    profile: null as ProfileType | null,
    status: ""
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const profilePageReducer = (state = initialState, action: ActionsTypes):InitialState => {
    switch (action.type){
        case 'SET_USER_PROFILE':
            return {
                ...state, profile: action.profile,
            }
        case 'SET_PHOTOS_SUCCESS':
            return {
                ...state, profile: {...state.profile, photos: action.photos } as ProfileType
            }
        case 'GET_STATUS':
            return {
                ...state, status: action.status,
            }
        default:
            return state;
    }
}

export const actions = {
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    getStatus: (status: string) => ({type: 'GET_STATUS', status} as const),
    setPhotosSuccess: (photos: PhotosType) => ({type: 'SET_PHOTOS_SUCCESS', photos} as const)
}

export const getProfile = (userId: number | null):ThunkType => async (dispatch) => {
    let data = await ProfileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}
export const getStatusProfile = (userId: number):ThunkType => async (dispatch) => {
    let data = await ProfileAPI.getStatus(userId);
    dispatch(actions.getStatus(data));
}
export const putStatusProfile = (status: string):ThunkType => async (dispatch) => {
    let data = await ProfileAPI.putStatus(status)
    if (data.resultCode === ResultsCodesEnum.Success) {
        dispatch(actions.getStatus(status));
    }
}
export const putPhotosProfile = (photosFile: File):ThunkType => async (dispatch) => {
    let data = await ProfileAPI.putPhotos(photosFile)
    if (data.resultCode === ResultsCodesEnum.Success) {
        dispatch(actions.setPhotosSuccess(data.data.photos));
    }
}
export const putInfoContactProfile = (profile: ProfileType):ThunkType => async (dispatch, getState: () => AppStateType) => {
    const userId = getState().authMe.userId;
    let data = await ProfileAPI.putProfile(profile)
    if (data.resultCode === ResultsCodesEnum.Success) {
        await dispatch(getProfile(userId));
    }
}

