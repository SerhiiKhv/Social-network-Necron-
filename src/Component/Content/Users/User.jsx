import React from 'react';
import s from './Users.module.css'
import userPhoto from '../../../Assets/ImgUsers/user.jpg';
import {NavLink} from "react-router-dom";
import style from './Users.module.css'
import styles from "../../common/Paginator/Paginator.module.css";

let User = ({user, unfollow, follow}) => {
    return <div className={style.users}>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userAva}/>
            </NavLink>
        </div>
        <div className={style.margin}>
            <div>{user.name.length < 15 ? user.name : user.name.slice(0,15) + "..." }</div>
            <div>{user.status == null ? "-------" : user.status.length < 15 ? user.status : user.status.slice(0,15) + "..." }</div>
            <div>
                {user.followed ?
                    <button className={styles.button} onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow</button> :

                    <button className={styles.button} onClick={() => {
                        follow(user.id);
                    }}>follow</button>}
            </div>
        </div>

    </div>
}

export default User;