import React, {useEffect, useState} from 'react';
import style from './AvaInfo.module.css'
import Preloader from "../../../common/Preloader/Preloader";

const AvaInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    if(!props.profile.photos.small){
        props.profile.photos.small = 'https://www.dissernet.org//picts/articles/Mrs3.jpg';
    }

    return (
        <div>
            <div>
                {props.profile.fullName}
            </div>
            <div className={style.Ava}>
                <img src={props.profile.photos.small}/>
            </div>
        </div>
    );
}

export default AvaInfo;