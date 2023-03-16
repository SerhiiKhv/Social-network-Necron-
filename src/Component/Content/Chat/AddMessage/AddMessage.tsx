import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../../../Redux/chat-reducer";
import style from "./AddMessage.module.scss";
import {CheckLanguageType} from "../../../../Language/components/CheckLanguageType";

const AddMessage: React.FC = () => {
    const chatLanguage = CheckLanguageType()

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
            <button className={style.button} onClick={sendMessages}>{chatLanguage.chatLanguage.submit}</button>
        </div>
    )
}

export default AddMessage