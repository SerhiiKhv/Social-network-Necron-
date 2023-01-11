import React from 'react';
import s from './Header.module.scss'
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return (
        <header className={s.header}>
            <div className={s.positionLogin}>
                {props.isAuth ?
                    <button onClick={props.logout} className={s.myButton}>{props.login} - Log out</button> :
                    <NavLink to={'login'} className={s.myButton}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;