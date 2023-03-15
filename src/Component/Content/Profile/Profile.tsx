import React from 'react';
import Preloader from "../../common/Preloader/Preloader";
import style from "./Profile.module.scss";
import {useSelector} from "react-redux";
import {getProfile, getStatus} from "../../../Redux/selector/profile-selector";


const Profile: React.FC = () => {
    const profile = useSelector(getProfile)
    const status = useSelector(getStatus)

    const createSocialNet = (str: string) => {
        return str === "" || str == null ? "------" : str;
    }

    if (!profile) {
        return <Preloader/>
    }

    if (!profile.photos.large) {
        profile.photos.large = 'https://www.dissernet.org//picts/articles/Mrs3.jpg';
    }

    return (
        <div>
            <div className={style.Ava}>
                <div>
                    {profile.fullName}
                </div>
                <div>
                    <img src={profile.photos.large}/>
                </div>

            </div>
            <div>
                {status}
            </div>
            <div>
                <b>gitHub</b>: {createSocialNet(profile.contacts.github)}
            </div>
            <div>
                <b>facebook</b>: {createSocialNet(profile.contacts.facebook)}
            </div>
            <div>
                <b>instagram</b>: {createSocialNet(profile.contacts.instagram)}
            </div>
            <div>
                <b>twitter</b>: {createSocialNet(profile.contacts.twitter)}
            </div>
            <div>
                <b>youtube</b>: {createSocialNet(profile.contacts.youtube)}
            </div>
            <div>
                <b>mainLink</b>: {createSocialNet(profile.contacts.mainLink)}
            </div>
        </div>
    );
}

export default Profile;