import React from 'react';
import style from './Setting.module.css'
import ProfileStatusWithHooks from "../Profile/AvaInfo/ProfileStatusWithHooks";
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
                <b>Your avatar</b>
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