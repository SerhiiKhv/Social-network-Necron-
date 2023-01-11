import React from 'react';
import s from './Nav.module.scss';
import {NavLink} from "react-router-dom";

const Nav = () => {

    return (
        <nav className={s.nav}>
            <div>
                <NavLink to='/profile' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/massage' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >Message</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/setting' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >Setting</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >Users</NavLink>
            </div>
        </nav>
    );
}

export default Nav;