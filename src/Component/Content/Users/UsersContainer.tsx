import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
    follow,
    unfollow,
    reviewUsers
} from '../../../Redux/usersPage-reducer';
import Preloader from "../../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    followingProgress
} from "../../../Redux/selector/users-selector";
import {AppStateType} from "../../../Redux/redux-store";
import {UsersType} from "../../../Redux/Types/types";

type TStateProps = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}
type TDispatchProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    reviewUsers: (currentPage: number, pageSize: number) => void
}
type TOwnProps = {}

type PropsType = TStateProps & TDispatchProps & TOwnProps
const UsersAPIContainer: React.FC<PropsType> = (props) => {

    const [currentPage] = useState(props.currentPage)
    const [pageSize] = useState(props.pageSize)

    useEffect(() => {
        {
            props.reviewUsers(currentPage, pageSize);
        }
    }, [currentPage, pageSize])

    let onPageChanged = (pageNumber: number) => {
        props.reviewUsers(pageNumber, props.pageSize);
    }

    return (<>
            {props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   users={props.users}
                   follow={props.follow}
                   unfollow={props.unfollow}
                   onPageChanged={onPageChanged}
                   followingInProgress={props.followingInProgress}
            />
        </>
    )
}

let mapStateToProps = (state: AppStateType): TStateProps => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: followingProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        reviewUsers
    })
)(UsersAPIContainer)