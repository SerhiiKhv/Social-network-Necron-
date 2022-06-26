import React from 'react';
import s from './Profile.module.css'
import AvaInfo from "./AvaInfo/AvaInfo";
import MyPostConteiner from "./MyPost/MyPostConreiner";
import ProfileStatusWithHooks from "./AvaInfo/ProfileStatusWithHooks";

const Profile = (props) => {
    return (
        <div className={s.content}>
            <AvaInfo profile={props.profile}/>
            <ProfileStatusWithHooks status={props.status} putStatusProfile={props.putStatusProfile}/>
            <MyPostConteiner/>
        </div>
    );
}

export default Profile;