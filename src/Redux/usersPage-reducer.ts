import {UsersAPI} from "../Api/Api";
import {updateObjectInArray} from "../utils/Object-Helper";
import {UsersType} from "./Types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const USERS = 'USERS';
const SET_USERS_PAGE = 'SET_USERS_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOWING_PROGRESS = 'FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // it`s users id
}

type InitialState = typeof initialState;

export const usersPageReducer = (state = initialState, action: any):InitialState => {
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
                ...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }

        default:
            return state;
    }
}
type followSuccessActionType = {
    type: typeof FOLLOW
    userID: number
}
export const followSuccess = (userID: number): followSuccessActionType => ({type: FOLLOW, userID})
type unfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unfollowSuccess = (userID: number): unfollowSuccessActionType => ({type: UNFOLLOW, userID})
type setUsersActionType = {
    type: typeof USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): setUsersActionType => ({type: USERS, users})
type setCurrentPageActionType = {
    type: typeof SET_USERS_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_USERS_PAGE, currentPage})
type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount})
type setIsFetchingActionType = {
    type: typeof IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): setIsFetchingActionType => ({type: IS_FETCHING, isFetching})
type followingProgressActionType = {
    type: typeof FOLLOWING_PROGRESS
    isFetching: boolean
    userID: number
}
export const followingProgress = (isFetching: boolean, userID: number): followingProgressActionType => ({type: FOLLOWING_PROGRESS, isFetching , userID})

export const reviewUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await UsersAPI.getUsers(currentPage, pageSize);
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    dispatch(setIsFetching(false));
}

const followUnFollow = async (dispatch: any, userId: number, ApiMethod: any, actionCreator: any) => {
    dispatch(followingProgress(true, userId));
    let response = await ApiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(followingProgress(false, userId));
}
export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnFollow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI), unfollowSuccess);
}

export const follow = (userId: number) => async (dispatch: any) => {
    followUnFollow(dispatch, userId, UsersAPI.follow.bind(UsersAPI), followSuccess);
}


