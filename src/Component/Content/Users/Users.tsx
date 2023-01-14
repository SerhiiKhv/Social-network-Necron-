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

export const Users: React.FC = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const followingInProgress = useSelector(followingProgress)

    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getFilterUsers)
    const users = useSelector(getUsers)

    const dispatch = useDispatch();

    useEffect(() => {
        {
            dispatch(reviewUsers(currentPage, pageSize, filter));
        }
    }, [currentPage, pageSize])

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
            <UserForm onFilterChanged={onFilterChanged}/>
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