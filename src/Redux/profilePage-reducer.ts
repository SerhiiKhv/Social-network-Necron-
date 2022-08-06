import {ProfileAPI} from "../Api/Api";
import {PhotosType, PostType, ProfileType} from "./Types/types";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USERS_PROFILE';
const GET_STATUS = 'GET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTOS_SUCCESS = 'SET_PHOTOS_SUCCESS';

let initialState = {
    posts: [
        {id: 1, text: 'Hi', like: 2},
        {id: 2, text: 'Hello', like: 3},
        {id: 3, text: 'Good', like: 5}
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: ""
}

type InitialState = typeof initialState;

export const profilePageReducer = (state = initialState, action: any):InitialState => {

    switch (action.type){
        case ADD_POST:
            let newPost = {
                id: 4,
                text: action.newPostText,
                like: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile,
            }
        case SET_PHOTOS_SUCCESS:
            return {
                ...state, profile: {...state.profile, photos: action.photos } as ProfileType
            }
        case GET_STATUS:
            return {
                ...state, status: action.status,
            }
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId),
            }

        default:
            return state;
    }
}
type addPostActiveCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActiveCreator = (newPostText: string):addPostActiveCreatorActionType => ({type: ADD_POST, newPostText})
type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType):setUserProfileActionType => ({type: SET_USER_PROFILE, profile})
type getStatusActionType = {
    type: typeof GET_STATUS
    status: string
}
export const getStatus = (status: string): getStatusActionType => ({type: GET_STATUS, status})
type deletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): deletePostActionType => ({type: DELETE_POST, postId})
type setPhotosSuccessActionType = {
    type: typeof SET_PHOTOS_SUCCESS
    photos: PhotosType
}
export const setPhotosSuccess = (photos: PhotosType): setPhotosSuccessActionType => ({type: SET_PHOTOS_SUCCESS, photos})

export const getProfile = (userId: number) => async (dispatch: any) => {
    let response = await ProfileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatusProfile = (userId: number) => async (dispatch: any) => {
    let response = await ProfileAPI.getStatus(userId);
    dispatch(getStatus(response.data));
}

export const putStatusProfile = (status: string) => async (dispatch: any) => {
    let response = await ProfileAPI.putStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatus(status));
    }
}

export const putPhotosProfile = (photosFile: any) => async (dispatch: any) => {
    let response = await ProfileAPI.putPhotos(photosFile)
    if (response.data.resultCode === 0) {
        dispatch(setPhotosSuccess(response.data.data.photos));
    }
}

export const putInfoProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().authMe.userId;
    let response = await ProfileAPI.putProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId));
    }
}

