import React, {useEffect} from 'react';
import Profile from "./Profile";
import {
    getProfile,
    getStatusProfile, putPhotosProfile,
    putStatusProfile
} from "../../../Redux/profilePage-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "../../../Hoc/withRouter";
import {AppStateType} from "../../../Redux/redux-store";
import {useParams} from 'react-router-dom';

type MyPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getProfile: () => void
    getStatusProfile: () => void
}

const ProfileContainer: React.FC<MyPropsType & DispatchPropsType & any> = (props) => {

    let { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            userId = props.authorizedUserId;
            if (!userId) {
                props.history.push("/login");
            }
        }
        props.getProfile(userId);
        props.getStatusProfile(userId);
    }, [props.authorizedUserId]);


    return (
        <div>
            <Profile {...props}
                     profile={props.profile}
                     status={props.status}/>
        </div>
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
    connect(mapStateToProps, {
        getProfile, getStatusProfile,
        putStatusProfile, putPhotosProfile
    })
)(ProfileContainer)

