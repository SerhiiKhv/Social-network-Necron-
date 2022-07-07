import React from 'react';
import {
    getProfile,
    getStatusProfile, putPhotosProfile,
    putStatusProfile,
    setUserProfile
} from "../../../Redux/profilePage-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../../Hoc/AuthRedirect";
import Setting from "./Setting";



class SettingContainer extends React.Component{

    componentDidMount() {
        let userID = this.props.authorizedUserId;
        this.props.getProfile(userID);
        this.props.getStatusProfile(userID);
    }

    render() {
        return (
            <Setting {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     putStatusProfile={this.props.putStatusProfile}
                     putPhotosProfile={this.props.putPhotosProfile}/>
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
    connect(mapStateToProps, {setUserProfile, getProfile, getStatusProfile,
        putStatusProfile, putPhotosProfile})
)(SettingContainer)

