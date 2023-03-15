import React, {useContext} from 'react';
import s from './Nav.module.scss';
import {NavLink} from "react-router-dom";
import {LanguageContext} from "../../Language/components/LanguageContext";
import {navMenu as enNavMenu} from "../../Language/LanguageType/en";
import {navMenu as ukNavMenu} from "../../Language/LanguageType/uk";

const Nav = () => {

    const { lang } = useContext(LanguageContext);
    const navMenu = lang === "en" ? enNavMenu : ukNavMenu;

    return (
        <nav className={s.nav}>
            <div className={s.margin}>
                <NavLink to='/profile' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.profile}</NavLink>
            </div>
            {/*{<div className={s.margin}>
                <NavLink to='/massage' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >Message</NavLink>
            </div>}*/}
            <div className={s.margin}>
                <NavLink to='/setting' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.setting}</NavLink>
            </div>
            <div className={s.margin}>
                <NavLink to='/music' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.music}</NavLink>
            </div>
            <div className={s.margin}>
                <NavLink to='/users' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.users}</NavLink>
            </div>

            <div className={s.margin}>
                <NavLink to='/chat' className={({isActive} ) =>
                    isActive  ? s.activeLink : s.noActiveLink} >{navMenu.chat}</NavLink>
            </div>
        </nav>
    );
}
export default Nav;