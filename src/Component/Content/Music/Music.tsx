import React, {useContext} from 'react';
import {LanguageContext} from "../../../Language/components/LanguageContext";
import {musicLanguage as enMusicLanguage} from "../../../Language/LanguageType/en";
import {musicLanguage as ukMusicLanguage} from "../../../Language/LanguageType/uk";

const Music = () => {

    const { lang } = useContext(LanguageContext);
    const musicLanguage = lang === "en" ? enMusicLanguage : ukMusicLanguage;

    return (
        <div>
            {musicLanguage.music}
        </div>
    );
}

export default Music;