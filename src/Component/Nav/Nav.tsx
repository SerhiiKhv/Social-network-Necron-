import React from 'react';
import s from './Nav.module.scss';
import {NavLink} from "react-router-dom";
import {CheckLanguageType} from "../../Language/components/CheckLanguageType";

const Nav = () => {

    const navMenu = CheckLanguageType()

    return (
        <nav className={s.nav}>
            <div className={s.margin}>
                <NavLink to='/profile' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.navMenu.profile}</NavLink>
            </div>
            {/*{<div className={s.margin}>
                <NavLink to='/massage' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >Message</NavLink>
            </div>}*/}
            <div className={s.margin}>
                <NavLink to='/setting' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.navMenu.setting}</NavLink>
            </div>
            <div className={s.margin}>
                <NavLink to='/music' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.navMenu.music}</NavLink>
            </div>
            <div className={s.margin}>
                <NavLink to='/users' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.navMenu.users}</NavLink>
            </div>

            <div className={s.margin}>
                <NavLink to='/chat' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.navMenu.chat}</NavLink>
            </div>
        </nav>
    );
}
export default Nav;