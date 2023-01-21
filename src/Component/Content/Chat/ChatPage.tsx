import React, {useEffect, useState} from "react";

const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    return (
        <div>
            <Messages/>
            <AddMessage/>
        </div>
    )
}

type ChatMessageType = {
    message: string
    photo: string
    userId: number,
    userName: string
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChanel.addEventListener('message', (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        })
    }, [])

    return (
        <div style={{height: '500px', overflow: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo} style={{height: '45px'}}/>
            <b> {message.message} </b>
            <b> {message.userName} </b>
            <hr/>
        </div>
    )
}


const AddMessage: React.FC = () => {
    const [messages, setMessages] = useState('')

    const sendMessages = () => {
        if (!messages) {
            return
        }
        wsChanel.send(messages)
        setMessages('')
    }

    return (
        <div>
            <textarea value={messages} onChange={(e) => setMessages(e.currentTarget.value)}></textarea>
            <button onClick={sendMessages}>Submit</button>
        </div>
    )
}


export default ChatPage