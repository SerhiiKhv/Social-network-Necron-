import React from 'react';
import s from './AvaInfo.module.css'
import Preloader from "../../../Preloader/Preloader";

const AvaInfo = (props) => {

if(!props.profile){
    return <Preloader/>
}

    return(
        <div>
            <div>
                <img
                    src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'/>
            </div>
            <div>
                <img src={props.profile.photos.large}/>
            </div>
            <div>ava + info</div>
            <div>text</div>
            <div>coment</div>
        </div>
    );
}

export default AvaInfo;