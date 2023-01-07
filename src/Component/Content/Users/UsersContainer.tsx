import React from 'react';
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

class UsersAPIContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.reviewUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.reviewUsers(pageNumber, this.props.pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   onPageChanged={this.onPageChanged}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
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