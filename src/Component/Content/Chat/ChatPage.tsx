import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../../Redux/chat-reducer";
import Messages from "./Messages/Messages";
import AddMessage from "./AddMessage/AddMessage";

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
export default ChatPage
