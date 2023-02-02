import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ChatMessageType, sendMessage, startMessagesListening, stopMessagesListening} from "../../../Redux/chat-reducer";
import {AppStateType} from "../../../Redux/redux-store";
import style from "./Chat.module.scss"

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = React.memo(() => {

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
})


const Messages: React.FC = React.memo(() => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isAutoScroll, seiIsAutoScroll] = useState(true)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            !isAutoScroll && seiIsAutoScroll(true)
        } else {
            isAutoScroll && seiIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    console.log(messages)


    return (
        <div className={style.chat} onScroll={scrollHandler}>
            {messages.map((m) =>
                <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
})

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    let CheckPhotoMessage = (photo: string) => {
        return photo !== null ? photo : 'https://cdn1.vectorstock.com/i/1000x1000/15/25/approved-person-icon-male-add-user-person-avatar-vector-21201525.jpg'
    }
    console.log('<<<<Message')
    return (
        <div>
            <img src={CheckPhotoMessage(message.photo)} style={{height: '45px'}} alt={'Loading img'}/>
            <b> {message.message} </b>
            <b> {message.userName} </b>
            <hr/>
        </div>
    )
})

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
            <input className={style.textarea} value={message} onChange={(e) => setMessage(e.currentTarget.value)}></input>
            <button className={style.button} onClick={sendMessages}>Submit</button>
        </div>
    )
}

export default ChatPage
