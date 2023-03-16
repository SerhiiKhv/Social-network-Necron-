import React from 'react';
import {CheckLanguageType} from "../../../Language/components/CheckLanguageType";

const Music = () => {
    const musicLanguage = CheckLanguageType()

    return (
        <div>
            {musicLanguage.musicLanguage.music}
        </div>
    );
}

export default Music;