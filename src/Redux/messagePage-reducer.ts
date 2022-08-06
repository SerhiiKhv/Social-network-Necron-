const ADD_MESSAGE = 'add-Message';
const UPDATE_NEW_MESSAGE_TEXT = 'update-New-Message-Text';

type DialogsType = {
    name: string
    id: number
    ava: string
}
type DialogType = {
    text: string
    ava: string
}

let initialState = {
    dialogs: [
        {
            name: 'Ana',
            id: 1,
            ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'
        },
        {
            name: 'Kira',
            id: 2,
            ava: 'https://i.pinimg.com/originals/2c/96/34/2c9634d88d12767eac1f54189af3194c.jpg'
        },
        {
            name: 'Tom',
            id: 3,
            ava: 'https://www.meme-arsenal.com/memes/24ea176ff61da30ee142f0dbca6dcc90.jpg'
        }
    ] as Array<DialogsType>,
    dialog: [
        {text: 'Hi', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
        {text: 'Hello', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
        {text: 'Good', ava: 'https://www.meme-arsenal.com/memes/24ea176ff61da30ee142f0dbca6dcc90.jpg'}
    ]as Array<DialogType>,

    newMessageText: ''
}

type InitialState = typeof initialState;

export const messagePageReducer = (state = initialState, action: any):InitialState => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                text: state.newMessageText,
                ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'
            }
            return {
                ...state,
                dialog: [...state.dialog, newMessage],
                newMessageText: ''
            }

        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessage
            };

        default:
            return state;
    }
}
type addMessageActiveCreatorActionType = {
    type: typeof ADD_MESSAGE
}
export const addMessageActiveCreator = ():addMessageActiveCreatorActionType => ({type: ADD_MESSAGE})
type updateNewMessageTextActiveCreatorActionType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT
    newMessage: string
}
export const updateNewMessageTextActiveCreator = (newMessage: string):updateNewMessageTextActiveCreatorActionType => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage})