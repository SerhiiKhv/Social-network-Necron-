import React from 'react';
import s from './Users.module.css'
import userPhoto from '../../../Assets/ImgUsers/user.jpg';
import {NavLink} from "react-router-dom";
import style from './Users.module.css'

let User = ({user, unfollow, follow}) => {
    return <div className={style.users}>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userAva}/>
            </NavLink>
        </div>
        <div>
            <div>{user.name}</div>
            <div>{user.status}</div>
            <div>
                {user.followed ?
                    <button onClick={() => {
                        unfollow(user.id)
                    }}>Unfollow</button> :

                    <button onClick={() => {
                        follow(user.id);
                    }}>follow</button>}
            </div>
        </div>

    </div>
}

export default User;