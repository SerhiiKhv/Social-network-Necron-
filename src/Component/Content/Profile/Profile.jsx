import React from 'react';
import s from './Profile.module.css'
import AvaInfo from "./AvaInfo/AvaInfo";
import MyPostContainer from "./MyPost/MyPostContainer";

const Profile = (props) => {
    return (
        <div className={s.content}>
            <AvaInfo profile={props.profile}
                     putPhotosProfile={props.putPhotosProfile}
                     status={props.status}/>

            <MyPostContainer/>
        </div>
    );
}

export default Profile;