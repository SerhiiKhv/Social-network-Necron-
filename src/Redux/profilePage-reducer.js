import {ProfileAPI} from "../Api/Api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USERS_PROFILE';
const GET_STATUS = 'GET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
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
                posts: [...state.posts, newPost],
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
            case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId),
            }

        default:
            return state;
    }
}

export const addPostActiveCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const getStatus = (status) => ({type: GET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const getProfile = (userId) => async (dispatch) => {

    let response = await ProfileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatusProfile = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getStatus(userId);
    dispatch(getStatus(response.data));
}

export const putStatusProfile = (status) => async (dispatch) => {
    let response = await ProfileAPI.putStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatus(status));
    }
}