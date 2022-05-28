import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    getUsers
} from '../../../Redux/usersPage-reducer';
import Preloader from "../../Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../../Hoc/AuthRedirect";

class UsersAPIConteiner extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage,this.props.pageSize);
    }

    onPageChanged = (pageNamber) => {
        this.props.getUsers(pageNamber,this.props.pageSize);
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
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching

    }
}

export default compose(
    connect(mapStateToProps,{
        follow,unfollow,setUsers,
        setCurrentPage,getUsers
    }),
    withAuthRedirect
)(UsersAPIConteiner)