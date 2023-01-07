import React from 'react';
import {
    getProfile,
    getStatusProfile, putInfoProfile, putPhotosProfile,
    putStatusProfile
} from "../../../Redux/profilePage-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import Setting from "./Setting";
import {ProfileType} from "../../../Redux/Types/types";
import {AppStateType} from "../../../Redux/redux-store";
import {withRouter} from "../../../Hoc/withRouter";

type PropsType = {
    authorizedUserId: number
    profile: ProfileType
    status: string

    getProfile: (userID: number) => void
    getStatusProfile: (userID: number) => void
    putStatusProfile: (status: string) => void
    putPhotosProfile: (photosFile: File) => void
    putInfoProfile: (profile: ProfileType) => void
}

class SettingContainer extends React.Component<PropsType>{

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
                     putPhotosProfile={this.props.putPhotosProfile}
                     putInfoProfile={this.props.putInfoProfile}/>
        );
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.authMe.userId,
        isAuth: state.authMe.isAuth
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {getProfile, getStatusProfile,
        putStatusProfile, putPhotosProfile, putInfoProfile})
)(SettingContainer)

