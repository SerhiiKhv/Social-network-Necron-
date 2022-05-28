import {UsersAPI} from "../Api/Api";

const ADD_POST = 'add-Post';
const UPDATE_NEW_POST_TEXT = 'update-New-Post-Text';
const SET_USER_PROFILE = 'SET_USERS_PROFILE';

let initialState = {
    post: [
        {id: 1, text: 'Hi', like: '2'},
        {id: 2, text: 'Hello', like: '3'},
        {id: 3, text: 'Good', like: '5'}
    ],
    newPostText: '',
    profile: null
}

export const profilePageReducer = (state = initialState, action) => {

    switch (action.type){
        case ADD_POST:
            let newPost = {
                id: 4,
                text: state.newPostText,
                like: 0
            }
            return {
                ...state,
                post: [...state.post, newPost],
                newPostText: ''
            };

        case UPDATE_NEW_POST_TEXT:
            return{
                ...state,
                newPostText: action.newPost,
            }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile,
            }

        default:
            return state;
    }
}

export const addPostActiveCreator = () => ({type: ADD_POST})
export const updateNewPostTextActiveCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newPost: text})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const getProfile = (userId) => {
    return (dispatch) => {
        UsersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        });
    }
}