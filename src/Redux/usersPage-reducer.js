import {UsersAPI} from "../Api/Api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const USERS = 'USERS';
const SET_USERS_PAGE = 'SET_USERS_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOWNG_PROGRESS = 'FOLLOWNG_PROGRESS';



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
               users: state.users.map( u => {
                   if(u.id === action.userID){
                       return {...u , followed: true}
                   }
                   return u;
               })
           }

        case UNFOLLOW:
            return{
        ...state,
                users: state.users.map( u => {
                if(u.id === action.userID){
                    return {...u , followed: false}
                }
                return u;
            })
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

        case FOLLOWNG_PROGRESS:
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
export const followingProgress = (isFetching, userID) => ({type: FOLLOWNG_PROGRESS, isFetching , userID})

export const reviewUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        dispatch(setCurrentPage(currentPage));
        UsersAPI.getUsers(currentPage,pageSize).then(data => {
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            dispatch(setIsFetching(false));
        });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(followingProgress(true, userId));
        UsersAPI.unfollow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(followingProgress(false, userId));
        });
    };
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(followingProgress(true, userId));
        UsersAPI.follow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(followingProgress(false, userId));
        });
    };
}


