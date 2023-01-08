import React, {useEffect, useState} from 'react';
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

const SettingContainer: React.FC<PropsType> = (props) =>{

    const [userID] = useState(props.authorizedUserId)

    useEffect(() => {
        {
            let userID = props.authorizedUserId;
            props.getProfile(userID);
            props.getStatusProfile(userID);
        }
    }, [userID])

        return (
            <Setting {...props}
                     profile={props.profile}
                     status={props.status}
                     putStatusProfile={props.putStatusProfile}
                     putPhotosProfile={props.putPhotosProfile}
                     putInfoProfile={props.putInfoProfile}/>
        );

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

