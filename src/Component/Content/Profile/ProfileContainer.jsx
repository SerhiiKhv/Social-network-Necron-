import React from 'react';
import Profile from "./Profile";
import {
    getProfile,
    getStatusProfile,
    putStatusProfile,
    setUserProfile
} from "../../../Redux/profilePage-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../../Hoc/AuthRedirect";



class ProfileContainer extends React.Component{

    componentDidMount() {
        let userID = this.props.match.params.userId
        if(!userID){
            userID = this.props.authorizedUserId;
            if(!userID){
                this.props.history.push("/login");
            }
        }
        this.props.getProfile(userID);
        this.props.getStatusProfile(userID);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     putStatusProfile={this.props.putStatusProfile}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.authMe.userId,
        isAuth: state.authMe.isAuth
    }
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {setUserProfile, getProfile, getStatusProfile, putStatusProfile})
)(ProfileContainer)

