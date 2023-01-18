import React, {useEffect} from 'react';
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import style from './Users.module.scss'
import UserForm from "./UsersSearchFrom";
import {FilterType, follow, reviewUsers, unfollow} from "../../../Redux/usersPage-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    followingProgress,
    getCurrentPage,
    getFilterUsers,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../../Redux/selector/users-selector";
import {useSearchParams} from "react-router-dom";

export const Users: React.FC = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const followingInProgress = useSelector(followingProgress)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getFilterUsers)
    const users = useSelector(getUsers)

    const dispatch = useDispatch();

    let [searchParams, setSearchParams] = useSearchParams();
    const termParamURL = searchParams.get('term') || ''
    const friendParamURL = searchParams.get('friend') || 'null'
    const currentPageParamURL = searchParams.get('currentPage') || '1'

    useEffect(() => {
        {
            let actualFriend;
            if(friendParamURL === "null"){
                actualFriend = null
            }else actualFriend = friendParamURL === "true";

            const actualFilter = {term: termParamURL, friend: actualFriend}
            dispatch(reviewUsers(Number(currentPageParamURL), pageSize, actualFilter));
        }
    }, [currentPageParamURL, pageSize])

    useEffect(() => {
        {
            const queryTerm = filter.term
            const queryFriend = String(filter.friend)
            const queryCurrentPage = String(currentPage)

            let params = {term: '', friend: '', currentPage: ''}

            if (queryTerm.length) params.term = filter.term
            if (queryFriend.length) params.friend = String(filter.friend)
            if (queryCurrentPage) params.currentPage = String(currentPage)

            setSearchParams(params)
        }
    }, [filter.term, filter.friend, currentPage])

    let onPageChanged = (pageNumber: number) => {
        dispatch(reviewUsers(pageNumber, pageSize, filter));
    }
    let onFilterChanged = (filter: FilterType) => {
        dispatch(reviewUsers(1, pageSize, filter));
    }
    let followUser = (userId: number) => {
        dispatch(follow(userId));
    }
    let unfollowUser = (userId: number) => {
        dispatch(unfollow(userId));
    }

    return <div>
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChanged={onPageChanged}/>
        </div>
        <div className={style.searchForm}>
            <UserForm onFilterChanged={onFilterChanged} term={termParamURL} friend={friendParamURL}/>
        </div>


        <div className={style.content}> {
            users.map(u => <User user={u}
                                 unfollow={unfollowUser}
                                 follow={followUser}
                    //followingInProgress={followingInProgress}
                                 key={u.id}
                />
            )
        }
        </div>
    </div>
}