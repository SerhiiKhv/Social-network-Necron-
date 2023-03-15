import React, {useContext} from "react";
import {LanguageContext} from "./LanguageContext";
import UKFlag from "../img/UKFlag.jpg";
import ENFlag from "../img/ENFlag.png";
import style from "./LanguageSwitcher.module.scss"

const LanguageSwitcher: React.FC = () => {
    const {lang, setLang} = useContext(LanguageContext);
    const handleChangeLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLang(event.target.value);
    };

    return (
        <div>
            {lang == "uk"? <img src={UKFlag} className={style.imgFlag}/> :
                <img src={ENFlag} className={style.imgFlag}/>}
            <select value={lang} onChange={handleChangeLang} className={style.select}>
                    <option value="uk" className={style.option}> Українська</option>
                    <option value="en" className={style.option}> English</option>
            </select>
        </div>
    );
};
export default LanguageSwitcher;