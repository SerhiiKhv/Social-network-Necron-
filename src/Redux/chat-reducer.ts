import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {chatAPI, ChatMessageAPIType} from "../Api/Chat-api";
import {v1} from "uuid"

let initialState = {
    messages: [] as ChatMessageType[]
}

export const chatReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED':
            return {
                ...state, messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((m , index ,array) => index >= array.length - 100)
            }
        default:
            return state;
    }
}

export const actions = {
    massageReceived: (messages: ChatMessageType[]) => ({type: 'MESSAGES_RECEIVED', payload: {messages}} as const),
}

let _newMassageHandler: ((messages: ChatMessageType[]) => void) | null = null
let newMassageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMassageHandler === null) {
        _newMassageHandler = (messages) => {
            dispatch(actions.massageReceived(messages))
        }
    }
    return _newMassageHandler
}
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMassageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMassageHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async () => {
    chatAPI.sendMessage(message)
}

type ActionsTypes = InferActionsType<typeof actions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export type ChatMessageType = ChatMessageAPIType & {id?: string}