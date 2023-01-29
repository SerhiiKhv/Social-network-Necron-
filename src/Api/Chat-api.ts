let subscribers = [] as SubscribersType[]
let ws: WebSocket | null = null
const closeHandler = () => {
    console.log('CLOSE WS')
    setTimeout(createChanel, 3000)
}
let messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data)
    subscribers.forEach((s) => s(newMessage))
}
function createChanel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}
export const chatAPI = {
    start(){
        createChanel()
    },
    stop(){
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscribersType){
        subscribers.push(callback)
    },
    unsubscribe(callback: SubscribersType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}
type SubscribersType = (messages: ChatMessageAPIType[]) => void
export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number,
    userName: string
}