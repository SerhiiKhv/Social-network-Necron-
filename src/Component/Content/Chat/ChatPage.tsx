import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../Redux/chat-reducer";
import {AppStateType} from "../../../Redux/redux-store";
import {ChatMessageType} from "../../../Api/Chat-api";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessage/>
        </div>
    )
}
const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    return (
        <div style={{height: '500px', overflow: 'auto'}}>
            {messages.map((m, index) =>
                <Message key={index} message={m}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    let CheckPhotoMessage = (photo: string) => {
        return photo !== null ? photo : 'https://cdn1.vectorstock.com/i/1000x1000/15/25/approved-person-icon-male-add-user-person-avatar-vector-21201525.jpg'
    }

    return (
        <div>
            <img src={CheckPhotoMessage(message.photo)} style={{height: '45px'}}/>
            <b> {message.message} </b>
            <b> {message.userName} </b>
            <hr/>
        </div>
    )
}


const AddMessage: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const sendMessages = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
            <button onClick={sendMessages}>Submit</button>
        </div>
    )
}

export default ChatPage
