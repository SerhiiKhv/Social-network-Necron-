import React from 'react';
import style from './Setting.module.scss'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import Preloader from "../../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../../Redux/selector/profile-selector";
import {putPhotosProfile} from "../../../Redux/profilePage-reducer";

const Setting: React.FC = () => {
    let profile = useSelector(getProfile)
    const dispatch = useDispatch()

    if (!profile) {
        return <Preloader/>
    }
    const onPutPhotosProfile = (e: any) => {
        if (e.target.files.length) {
            dispatch(putPhotosProfile(e.target.files[0]));
        }
    }
    if (!profile.photos.large) {
        profile.photos.large = 'https://www.dissernet.org//picts/articles/Mrs3.jpg';
    }

    return (
        <div className={style.setting}>
            <div className={style.title}>
                <h1>Setting</h1>
            </div>

            <div className={style.Ava}>
                <b>Your avatar</b>
                <div>
                    <label className="custom-file-upload">
                        <input type={"file"} onChange={onPutPhotosProfile}/>
                        <img src={profile.photos.large} alt={"Loading img...."}/>
                    </label>
                </div>
            </div>

            <div className={style.status}>
                <b>Your status</b>:
                <ProfileStatusWithHooks/>
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