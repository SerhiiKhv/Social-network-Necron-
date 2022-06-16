import {ProfileAPI} from "../Api/Api";

const ADD_POST = 'add-Post';
const SET_USER_PROFILE = 'SET_USERS_PROFILE';
const GET_STATUS = 'GET_STATUS';

let initialState = {
    post: [
        {id: 1, text: 'Hi', like: '2'},
        {id: 2, text: 'Hello', like: '3'},
        {id: 3, text: 'Good', like: '5'}
    ],
    newPostText: '',
    profile: null,
    status: ""
}

export const profilePageReducer = (state = initialState, action) => {

    switch (action.type){
        case ADD_POST:
            let newPost = {
                id: 4,
                text: action.newPostText,
                like: 0
            }
            return {
                ...state,
                post: [...state.post, newPost],
                newPostText: ''
            };
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile,
            }
        case GET_STATUS:
            return {
                ...state, status: action.status,
            }
        default:
            return state;
    }
}

export const addPostActiveCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const getStatus = (status) => ({type: GET_STATUS, status})

export const getProfile = (userId) => {
    return (dispatch) => {
        ProfileAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        });
    }
}

export const getStatusProfile = (userId) => {
    return (dispatch) => {
        ProfileAPI.getStatus(userId).then(response => {
            dispatch(getStatus(response.data));
        });
    }
}

export const putStatusProfile = (status) => {
    return (dispatch) => {
        ProfileAPI.putStatus(status).then(response => {
            if(response.data.resultCode === 0){
                dispatch(getStatus(status));
            }
        });
    }
}