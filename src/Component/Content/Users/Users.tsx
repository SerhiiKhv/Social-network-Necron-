import React from 'react';
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../../Redux/Types/types";
import style from './Users.module.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    followingInProgress: Array<number>

    onPageChanged: (PageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({totalUsersCount,followingInProgress, pageSize,currentPage,onPageChanged,users, ...props}) => {
    return <div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                   currentPage={currentPage} onPageChanged={onPageChanged}/>
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