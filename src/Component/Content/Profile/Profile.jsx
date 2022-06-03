import React from 'react';
import s from './Profile.module.css'
import AvaInfo from "./AvaInfo/AvaInfo";
import MyPostConteiner from "./MyPost/MyPostConreiner";
import ProfileStatus from "./AvaInfo/ProfileStatus";

const Profile = (props) => {
    return (
        <div className={s.content}>
            <AvaInfo profile={props.profile}/>
            <ProfileStatus status={props.status} putStatusProfile={props.putStatusProfile}/>
            <MyPostConteiner/>
        </div>
    );
}

export default Profile;