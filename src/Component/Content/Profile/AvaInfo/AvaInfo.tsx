import React from 'react';
import style from './AvaInfo.module.scss'
import Preloader from "../../../common/Preloader/Preloader";
import {ProfileType} from "../../../../Redux/Types/types";

type PropsType = {
    profile: ProfileType
    status: string
}

const AvaInfo: React.FC<PropsType> = (props) => {

    const createSocialNet = (str: string) => {
        return str === "" || str == null ? "------" : str;
    }

    if (!props.profile) {
        return <Preloader/>
    }

    if (!props.profile.photos.large) {
        props.profile.photos.large = 'https://www.dissernet.org//picts/articles/Mrs3.jpg';
    }

    return (
        <div>
            <div className={style.Ava}>
                <div>
                    {props.profile.fullName}
                </div>
                <div>
                    <img src={props.profile.photos.large}/>
                </div>

            </div>
            <div>
                {props.status}
            </div>
            <div>
                <b>gitHub</b>: {createSocialNet(props.profile.contacts.github)}
            </div>
            <div>
                <b>facebook</b>: {createSocialNet(props.profile.contacts.facebook)}
            </div>
            <div>
                <b>instagram</b>: {createSocialNet(props.profile.contacts.instagram)}
            </div>
            <div>
                <b>twitter</b>: {createSocialNet(props.profile.contacts.twitter)}
            </div>
        </div>
    );
}

export default AvaInfo;