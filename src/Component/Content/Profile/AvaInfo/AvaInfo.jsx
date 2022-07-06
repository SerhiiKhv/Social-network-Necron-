import React from 'react';
import style from './AvaInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";

const AvaInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    if(!props.profile.photos.large){
        props.profile.photos.large = 'https://www.dissernet.org//picts/articles/Mrs3.jpg';
    }

    const onPutPhotosProfile = (e) => {
        if(e.target.files.length){
            props.putPhotosProfile(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={style}>
                <div className={style.Ava}>
                    <img src={props.profile.photos.large}/>
                </div>
                <div className={style.FullName}>
                    {props.profile.fullName}
                </div>
            </div>

            <div>
                {!props.isOwner && <input type={"file"} onChange={onPutPhotosProfile}/>}
            </div>

            <div>

            </div>
        </div>
    );
}

export default AvaInfo;