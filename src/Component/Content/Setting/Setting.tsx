import React from 'react';
import style from './Setting.module.scss'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import Preloader from "../../common/Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../../Redux/selector/profile-selector";
import {putPhotosProfile} from "../../../Redux/profilePage-reducer";
import {CheckLanguageType} from "../../../Language/components/CheckLanguageType";

const Setting: React.FC = () => {
    let profile = useSelector(getProfile)
    const dispatch = useDispatch()

    const settingLanguage = CheckLanguageType()

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
                <h1>{settingLanguage.settingLanguage.setting}</h1>
            </div>

            <div className={style.Ava}>
                <b>{settingLanguage.settingLanguage.avatar}</b>
                <div>
                    <label className="custom-file-upload">
                        <input type={"file"} onChange={onPutPhotosProfile}/>
                        <img src={profile.photos.large} alt={"Loading img...."}/>
                    </label>
                </div>
            </div>

            <div className={style.status}>
                <b>{settingLanguage.settingLanguage.status}</b>:
                <ProfileStatusWithHooks/>
            </div>

            {/*<SettingInfoProfileForm />*/}
        </div>
    );
}
/*

const SettingInfoProfileForm = () => {
    const submit = (values: ProfileType) => {
        const profile = {
            AboutMe: "123",
            lookingForAJob: true,
            lookingForAJobDescription: '123',
            fullName: "Alamay",
            contacts: {
                github: "github.com",
                facebook: "",
                instagram: "",
                twitter: "",
                youtube: "",
                mainLink: ""
            },

            userId: 19690,
            photos: {
                small: "",
                large: ""
            },
            status: "",
        }

        dispatch(putInfoContactProfile(profile))
    }

    let [gitHub, setGitHub] = useState("");
    let [facebook, setFacebook] = useState("");
    let [instagram, setInstagram] = useState("");
    let [twitter, setTwitter] = useState("");
    let [youtube, setYoutube] = useState("");
    let [mainLink, setMainLink] = useState("");

    const dispatch = useDispatch()
    const onYoutubeChange = (e: any) => {
        setYoutube(e.currentTarget.value);
    }
    const onMainLinkChange = (e: any) => {
        setMainLink(e.currentTarget.value);
    }
    const onGitHubChange = (e: any) => {
        setGitHub(e.currentTarget.value);
    }
    const onFacebookChange = (e: any) => {
        setFacebook(e.currentTarget.value);
    }
    const onInstagramChange = (e: any) => {
        setInstagram(e.currentTarget.value);
    }
    const onTwitterChange = (e: any) => {
        setTwitter(e.currentTarget.value);
    }

    const SettingFormValidate = () => {
        return {}
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{
                aboutMe: "",
                lookingForAJob: true,
                lookingForAJobDescription: '',
                fullName: "Alamay",
                contacts: {
                    github: "",
                    facebook: "",
                    instagram: "",
                    twitter: "",
                    youtube: "",
                    mainLink: ""
                },
                userId: 123,
                photos: {
                    small: "",
                    large: ""
                },
                status: "",
               }}
            validate={SettingFormValidate}
            onSubmit={submit}
        >
            {({
                  handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                    <Field value={gitHub} onChange={onGitHubChange}
                        type='text' name='gitHub'/>
                    <Field value={facebook} onChange={onFacebookChange}
                           type='text' name='facebook'/>
                    <Field value={instagram} onChange={onInstagramChange}
                           type='text' name='instagram'/>
                    <Field value={twitter} onChange={onTwitterChange}
                           type='text' name='twitter'/>
                    <Field value={youtube} onChange={onYoutubeChange}
                           type='text' name='youtube'/>
                    <Field value={mainLink} onChange={onMainLinkChange}
                           type='text' name='mainLink'/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
}
*/


export default Setting;