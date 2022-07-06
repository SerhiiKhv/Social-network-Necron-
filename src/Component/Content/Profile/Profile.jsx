import React from 'react';
import s from './Profile.module.css'
import AvaInfo from "./AvaInfo/AvaInfo";
import MyPostContainer from "./MyPost/MyPostContainer";
import ProfileStatusWithHooks from "./AvaInfo/ProfileStatusWithHooks";

const Profile = (props) => {
    return (
        <div className={s.content}>
            <AvaInfo profile={props.profile}
                     putPhotosProfile={props.putPhotosProfile}
                     isOwner={props.isOwner}/>
            <ProfileStatusWithHooks
                status={props.status}
                putStatusProfile={props.putStatusProfile}/>
            <MyPostContainer/>
        </div>
    );
}

export default Profile;