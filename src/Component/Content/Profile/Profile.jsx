import React from 'react';
import s from './Profile.module.css'
import AvaInfo from "./AvaInfo/AvaInfo";
import MyPostConteiner from "./MyPost/MyPostConreiner";

const Profile = (props) => {
    return (

        <div className={s.content}>
            <AvaInfo profile={props.profile}/>
            <MyPostConteiner/>
        </div>
    );
}

export default Profile;