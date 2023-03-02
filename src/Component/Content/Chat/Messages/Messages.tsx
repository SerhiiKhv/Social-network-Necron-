import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import style from "./Messages.module.scss";
import Message from "./Message/Message";

const Messages: React.FC = React.memo(() => {
    let messages = useSelector((state: AppStateType) => state.chat.messages)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 100) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    //console.log(messages)

    return (
        <div className={style.chat} onScroll={scrollHandler}>
            {messages.map((m) =>
                <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
})

export default Messages