import React from 'react';
import style from './Setting.module.scss'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../Redux/Types/types";

type PropsType = {
    profile: ProfileType
    status: string

    putPhotosProfile: (photosFile: any) => void
    putStatusProfile: (status: string) => void

    putInfoProfile: (profile: ProfileType) => void
}

const Setting: React.FC<PropsType> = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    const onPutPhotosProfile = (e: any) => {
        if (e.target.files.length) {
            props.putPhotosProfile(e.target.files[0]);
        }
    }

    if (!props.profile.photos.large) {
        props.profile.photos.large = 'https://www.dissernet.org//picts/articles/Mrs3.jpg';
    }

    return (
        <div className={style.setting}>
            <div className={style.title}>
                <h1>Setting</h1>
            </div>

            <div className={style.Ava}>
                <b>Your avatar</b>
                <div>
                    <img src={props.profile.photos.large}/>
                </div>

                <label className="custom-file-upload">
                    <input type={"file"} onChange={onPutPhotosProfile}/>
                    Select a photo to replace your avatar
                </label>

            </div>

            <div className={style.status}>
                <b>Your status</b>:
                <ProfileStatusWithHooks status={props.status}
                                        putStatusProfile={props.putStatusProfile}/>
            </div>

            {/*<SettingInfoProfileForm putInfoProfile={props.putInfoProfile}/>*/}

        </div>
    );
}

/*const SettingInfoProfileForm = (props) => {
    return(
        <Form
            onSubmit={formData => {
                console.log(formData);
                props.putInfoProfile(formData);
            }}>
            {({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field placeholder={"Full name"} name={"fullName"} component={Input}
                               validate={required}/>
                    </div>

                    <div>
                        <button>Save</button>
                    </div>
                </form>
            )}
        </Form>
    )
}*/


export default Setting;