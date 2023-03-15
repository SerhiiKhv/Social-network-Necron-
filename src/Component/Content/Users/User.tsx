import React, {useContext} from 'react';
import s from './Users.module.scss'
import userPhoto from '../../../Assets/ImgUsers/user.jpg';
import {NavLink} from "react-router-dom";
import styles from './Users.module.scss'
import {UsersType} from "../../../Redux/Types/types";
import {LanguageContext} from "../../../Language/components/LanguageContext";
import {usersSearchLanguage as enUsersSearchLanguage} from "../../../Language/LanguageType/en";
import {usersSearchLanguage as ukUsersSearchLanguage} from "../../../Language/LanguageType/uk";

type MapPropsType = {
    user: UsersType
}

type DispatchPropsType = {
    unfollow: (id: number) => void
    follow: (id: number) => void
}

let User: React.FC<MapPropsType & DispatchPropsType> = ({user, unfollow, follow}) => {

    const { lang } = useContext(LanguageContext);
    const usersSearchLanguage = lang === "en" ? enUsersSearchLanguage : ukUsersSearchLanguage;

    return <div className={styles.users}>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userAva}/>
            </NavLink>
        </div>
        <div className={styles.margin}>
            <div>{user.name.length < 15 ? user.name : user.name.slice(0,15) + "..." }</div>
            <div>{user.status == null ? "-------" : user.status.length < 15 ? user.status : user.status.slice(0,15) + "..." }</div>
            <div>
                {user.followed ?
                    <button className={styles.button} onClick={() => {
                        unfollow(user.id)
                    }}>{usersSearchLanguage.follow}</button> :

                    <button className={styles.button} onClick={() => {
                        follow(user.id);
                    }}>{usersSearchLanguage.unFollow}</button>}
            </div>
        </div>

    </div>
}

export default User;