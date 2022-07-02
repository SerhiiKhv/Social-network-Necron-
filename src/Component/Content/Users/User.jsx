import React from 'react';
import s from './Users.module.css'
import userPhoto from '../../../Assets/ImgUsers/user.jpg';
import {NavLink} from "react-router-dom";

let User = ({user, unfollow, follow}) => {
    return <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.userAva}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            <button onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</button> :

                            <button onClick={() => {
                                follow(user.id);
                            }}>follow</button>}
                    </div>
                </span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
            </div>
}

export default User;