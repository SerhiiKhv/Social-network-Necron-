import React from 'react';
import style from './AvaInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";
import {ProfileType} from "../../../../Redux/Types/types";

type PropsType = {
    profile: ProfileType
    status: string
}

const AvaInfo: React.FC<PropsType> = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    if(!props.profile.photos.large){
        props.profile.photos.large = 'https://www.dissernet.org//picts/articles/Mrs3.jpg';
    }

    return (
        <div>
            <div className={style.divAva}>
                <div className={style.Ava}>
                    <img src={props.profile.photos.large}/>
                </div>
                <div>
                    {props.profile.fullName}
                </div>
            </div>
            <div>
                {props.status}
            </div>
            <div>
                <b>gitHub</b>: {props.profile.contacts.github}
            </div>
            <div>
                <b>facebook</b>: {props.profile.contacts.facebook}
            </div>
            <div>
                <b>instagram</b>: {props.profile.contacts.instagram}
            </div>
            <div>
                <b>twitter</b>: {props.profile.contacts.twitter}
            </div>
        </div>
    );
}

export default AvaInfo;