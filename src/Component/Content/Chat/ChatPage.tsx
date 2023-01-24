import React, {useEffect, useState} from "react";

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {
    const [wsChanel, SetWsChanel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createChanel, 3000)
        }

        function createChanel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            SetWsChanel(ws)
        }

        createChanel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChanel={wsChanel}/>
            <AddMessage wsChanel={wsChanel}/>
        </div>
    )
}

type ChatMessageType = {
    message: string
    photo: string
    userId: number,
    userName: string
}

const Messages: React.FC<{wsChanel: WebSocket | null}> = ({wsChanel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {

        let messageHandler = (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessage])
        }

        wsChanel?.addEventListener('message', messageHandler)

        return () => {
            wsChanel?.addEventListener('message', messageHandler)
        }
    }, [wsChanel])

    return (
        <div style={{height: '500px', overflow: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    let CheckPhotoMessage = (photo: string) => {
        return photo !== null? photo : 'https://cdn1.vectorstock.com/i/1000x1000/15/25/approved-person-icon-male-add-user-person-avatar-vector-21201525.jpg'
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


const AddMessage: React.FC<{wsChanel: WebSocket | null}> = ({wsChanel}) => {
    const [messages, setMessages] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')


    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChanel?.addEventListener('open', openHandler)

        return () => {
            wsChanel?.addEventListener('open', openHandler)
        }
    },[wsChanel])

    const sendMessages = () => {
        if (!messages) {
            return
        }
        wsChanel?.send(messages)
        setMessages('')
    }

    return (
        <div>
            <textarea value={messages} onChange={(e) => setMessages(e.currentTarget.value)}></textarea>
            <button disabled={wsChanel === null || readyStatus !== 'ready'} onClick={sendMessages}>Submit</button>
        </div>
    )
}

export default ChatPage