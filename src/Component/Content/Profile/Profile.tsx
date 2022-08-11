import React from 'react';
import s from './Profile.module.css'
import AvaInfo from "./AvaInfo/AvaInfo";
import MyPostContainer from "./MyPost/MyPostContainer";
import {ProfileType} from "../../../Redux/Types/types";

type PropsType = {
    profile: ProfileType
    status: string
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div className={s.content}>
            <AvaInfo profile={props.profile}
                     status={props.status}/>

            <MyPostContainer/>
        </div>
    );
}

export default Profile;