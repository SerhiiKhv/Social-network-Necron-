import {UsersAPI} from "../Api/Api";
import {updateObjectInArray} from "../utils/Object-Helper";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const USERS = 'USERS';
const SET_USERS_PAGE = 'SET_USERS_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOWING_PROGRESS = 'FOLLOWING_PROGRESS';



let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export const usersPageReducer = (state = initialState, action) => {
    switch (action.type){
        case FOLLOW:
           return{
               ...state,
               users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
           }

        case UNFOLLOW:
            return{
        ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
        }

        case USERS:
            return{
                ...state, users: action.users
            }

        case SET_USERS_PAGE:
            return{
                ...state, currentPage: action.currentPage
            }

        case IS_FETCHING:
            return{
                ...state, isFetching: action.isFetching
            }

        case SET_TOTAL_USERS_COUNT:
            return{
                ...state, totalUsersCount: action.totalCount
            }

        case FOLLOWING_PROGRESS:
            return {
                ...state, isFetching: action.isFetching
            }

        default:
            return state;
    }
}

export const followSuccess = (userID) => ({type: FOLLOW, userID})
export const unfollowSuccess = (userID) => ({type: UNFOLLOW, userID})
export const setUsers = (users) => ({type: USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_USERS_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount: totalUsersCount})
export const setIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching})
export const followingProgress = (isFetching, userID) => ({type: FOLLOWING_PROGRESS, isFetching , userID})

export const reviewUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await UsersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setIsFetching(false));
}

const followUnFollow = async (dispatch, userId, ApiMethod, actionCreator) => {
    dispatch(followingProgress(true, userId));
    let response = await ApiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(followingProgress(false, userId));
}
export const unfollow = (userId) => async (dispatch) => {
    followUnFollow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI), unfollowSuccess);
}

export const follow = (userId) => async (dispatch) => {
    followUnFollow(dispatch, userId, UsersAPI.follow.bind(UsersAPI), followSuccess);
}


