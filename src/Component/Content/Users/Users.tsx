import React from 'react';
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../../Redux/Types/types";
import style from './Users.module.css'
import UserForm from "./UsersSearchFrom";
import {FilterType} from "../../../Redux/usersPage-reducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    followingInProgress: Array<number>

    onPageChanged: (PageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = ({
                                      totalUsersCount,
                                      followingInProgress,
                                      pageSize,
                                      currentPage,
                                      onPageChanged,
                                      users,
                                      ...props
                                  }) => {
    return <div>
        <div>
            <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                       currentPage={currentPage} onPageChanged={onPageChanged}/>
        </div>
        <div className={style.searchForm}>
            <UserForm onFilterChanged={props.onFilterChanged}/>
        </div>


        <div className={style.content}> {
            users.map(u => <User user={u}
                                 unfollow={props.unfollow}
                                 follow={props.follow}
                    //followingInProgress={followingInProgress}
                                 key={u.id}
                />
            )
        }
        </div>
    </div>
}


export default Users;