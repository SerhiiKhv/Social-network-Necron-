import React from 'react';
import s from './Header.module.scss'
import {NavLink} from "react-router-dom";
import LanguageSwitcher from "../../Language/components/LanguageSwitcher";
import {CheckLanguageType} from "../../Language/components/CheckLanguageType";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    const headerLanguage = CheckLanguageType()

    return (
        <header className={s.header}>
            <div>
                {props.isAuth ?
                    <button onClick={props.logout} className={s.myButton}>{props.login} - {headerLanguage.headerLanguage.logout}</button> :
                    <NavLink to={'login'} className={s.myButton}>{headerLanguage.headerLanguage.login}</NavLink>}
            </div>

            <div className={s.LanguageSwitcher}>
                <LanguageSwitcher/>
            </div>
        </header>
    );
}

export default Header;