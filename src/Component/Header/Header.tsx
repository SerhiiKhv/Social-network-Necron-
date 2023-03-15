import React, {useContext} from 'react';
import s from './Header.module.scss'
import {NavLink} from "react-router-dom";
import LanguageSwitcher from "../../Language/components/LanguageSwitcher";
import {LanguageContext} from "../../Language/components/LanguageContext";
import {headerLanguage as enHeaderLanguage} from "../../Language/LanguageType/en";
import {headerLanguage as ukHeaderLanguage} from "../../Language/LanguageType/uk";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    const { lang } = useContext(LanguageContext);
    const headerLanguage = lang === "en" ? enHeaderLanguage : ukHeaderLanguage;

    return (
        <header className={s.header}>
            <div>
                {props.isAuth ?
                    <button onClick={props.logout} className={s.myButton}>{props.login} - {headerLanguage.logout}</button> :
                    <NavLink to={'login'} className={s.myButton}>{headerLanguage.login}</NavLink>}
            </div>

            <div className={s.LanguageSwitcher}>
                <LanguageSwitcher/>
            </div>
        </header>
    );
}

export default Header;