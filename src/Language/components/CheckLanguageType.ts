import {useContext} from "react";
import {LanguageContext} from "./LanguageContext";
import {UkraineLanguage} from "../LanguageType/uk";
import {EnglishLanguage} from "../LanguageType/en";

export const CheckLanguageType = () => {
    const { lang } = useContext(LanguageContext);
    if(lang === "en"){
        return EnglishLanguage
    }else{
        return UkraineLanguage
    }
}
