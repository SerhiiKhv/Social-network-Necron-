const ADD_MESSAGE = 'add-Message';
const UPDATE_NEW_MESSAGE_TEXT = 'update-New-Message-Text';

let initialState = {
    dialogs: [
        {
            name: 'Ana',
            id: '1',
            ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'
        },
        {
            name: 'Kira',
            id: '2',
            ava: 'https://i.pinimg.com/originals/2c/96/34/2c9634d88d12767eac1f54189af3194c.jpg'
        },
        {name: 'Tom', id: '3', ava: 'https://www.meme-arsenal.com/memes/24ea176ff61da30ee142f0dbca6dcc90.jpg'}
    ],
    dialog: [
        {text: 'Hi', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
        {text: 'Hello', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
        {text: 'Good', ava: 'https://www.meme-arsenal.com/memes/24ea176ff61da30ee142f0dbca6dcc90.jpg'}
    ],

    newMessageText: ''
}

export const messagePageReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                text: state.newMessageText,
                ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'
            }
            return {
                ...state,
                dialog: [...state.dialog, newMessage],
                newMassegText: ''
            }

        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMasseg
            };

        default:
            return state;
    }
}

export const addMessageActiveCreator = (text) => ({type: ADD_MESSAGE})

export const updateNewMessageTextActiveCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMasseg: text})