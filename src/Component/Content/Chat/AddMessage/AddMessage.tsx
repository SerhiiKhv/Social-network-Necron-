import React, {useContext, useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../../../Redux/chat-reducer";
import style from "./AddMessage.module.scss";
import {LanguageContext} from "../../../../Language/components/LanguageContext";
import {chatLanguage as enChatLanguage} from "../../../../Language/LanguageType/en";
import {chatLanguage as ukChatLanguage} from "../../../../Language/LanguageType/uk";

const AddMessage: React.FC = () => {
    const { lang } = useContext(LanguageContext);
    const chatLanguage = lang === "en" ? enChatLanguage : ukChatLanguage;


    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessages = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessages();
        }
    };

    return (
        <div>
            <input className={style.textarea} value={message}
                   onKeyDown={handleKeyDown}
                   onChange={(e) => setMessage(e.currentTarget.value)}></input>
            <button className={style.button} onClick={sendMessages}>{chatLanguage.submit}</button>
        </div>
    )
}

export default AddMessage