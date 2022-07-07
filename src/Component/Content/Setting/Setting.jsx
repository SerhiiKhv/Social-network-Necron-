import React from 'react';
import style from './Setting.module.css'
import ProfileStatusWithHooks from "../Profile/AvaInfo/ProfileStatusWithHooks";
import Preloader from "../../common/Preloader/Preloader";

const Setting = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    const onPutPhotosProfile = (e) => {
        if(e.target.files.length){
            props.putPhotosProfile(e.target.files[0]);
        }
    }

    if(!props.profile.photos.large){
        props.profile.photos.large = 'https://www.dissernet.org//picts/articles/Mrs3.jpg';
    }

    return (
        <div>
            <div className={style.Title}>
                <h1>Setting</h1>
            </div>

            <div>
                Your avatar
            </div>
            <div className={style.divLine}>
                <div className={style.Ava}>
                    <img src={props.profile.photos.large}/>
                </div>
                <div>
                    {<input type={"file"} onChange={onPutPhotosProfile}/>}
                </div>
            </div>
            <div className={style.divLine}>
                Your status:
                <ProfileStatusWithHooks status={props.status}
                                        putStatusProfile={props.putStatusProfile}/>
            </div>

        </div>
    );
}

export default Setting;