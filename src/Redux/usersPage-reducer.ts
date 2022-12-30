import {UsersAPI} from "../Api/Api";
import {updateObjectInArray} from "../utils/Object-Helper";
import {UsersType} from "./Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {ResultsCodesEnum} from "./ResultsCodesEnumsTypes/ResultsCodesEnumsTypes";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // it`s users id
}
type InitialState = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const usersPageReducer = (state = initialState, action: ActionsTypes):InitialState => {
    switch (action.type){
        case 'FOLLOW':
           return{
               ...state,
               users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
           }
        case 'UNFOLLOW':
            return{
        ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
        }

        case 'USERS':
            return{
                ...state, users: action.users
            }

        case 'SET_USERS_PAGE':
            return{
                ...state, currentPage: action.currentPage
            }

        case 'IS_FETCHING':
            return{
                ...state, isFetching: action.isFetching
            }

        case 'SET_TOTAL_USERS_COUNT':
            return{
                ...state, totalUsersCount: action.totalCount
            }

        case 'FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }

        default:
            return state;
    }
}

export const actions = {
    followSuccess: (userID: number) => ({type: 'FOLLOW', userID} as const),
    unfollowSuccess: (userID: number) => ({type: 'UNFOLLOW', userID} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_USERS_PAGE', currentPage} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
    setIsFetching: (isFetching: boolean) => ({type: 'IS_FETCHING', isFetching} as const),
    followingProgress: (isFetching: boolean, userID: number) => ({type: 'FOLLOWING_PROGRESS', isFetching , userID} as const)

}

export const reviewUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(actions.setIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await UsersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setIsFetching(false));
}
const followUnFollow = async (dispatch: DispatchType, userId: number, ApiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.followingProgress(true, userId));
    let response = await ApiMethod(userId);
    if (response.data.resultCode === ResultsCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.followingProgress(false, userId));
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await followUnFollow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI), actions.unfollowSuccess);
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    await followUnFollow(dispatch, userId, UsersAPI.follow.bind(UsersAPI), actions.followSuccess);
}


