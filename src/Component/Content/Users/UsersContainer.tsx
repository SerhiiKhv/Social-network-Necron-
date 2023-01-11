import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
    follow,
    unfollow,
    reviewUsers, FilterType
} from '../../../Redux/usersPage-reducer';
import Preloader from "../../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    followingProgress, getFilterUsers
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
    filter: FilterType
}
type TDispatchProps = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    reviewUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
}
type TOwnProps = {}

type PropsType = TStateProps & TDispatchProps & TOwnProps
const UsersAPIContainer: React.FC<PropsType> = (props) => {

    const [currentPage] = useState(props.currentPage)
    const [pageSize] = useState(props.pageSize)
    const [filter] = useState(props.filter)

    useEffect(() => {
        {
            props.reviewUsers(currentPage, pageSize, filter);
        }
    }, [currentPage, pageSize])

    let onPageChanged = (pageNumber: number) => {
        const {filter} = props
        props.reviewUsers(pageNumber, props.pageSize, filter);
    }

    let onFilterChanged = (filter: FilterType) => {
        props.reviewUsers(1, props.pageSize, filter);
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
                   onFilterChanged={onFilterChanged}
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
        followingInProgress: followingProgress(state),
        filter: getFilterUsers(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        reviewUsers
    })
)(UsersAPIContainer)