import {profilePageReducer} from "./profilePage-reducer";
import {messagePageReducer} from "./messagePage-reducer";

let store = {
    _state: {

        profilePage: {
            post: [
                {id: 1, text: 'Hi', like: '2'},
                {id: 2, text: 'Hello', like: '3'},
                {id: 3, text: 'Good', like: '5'}
            ],
            newPostText: ''
        },

        messagePage: {
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

            newMassegText: ''
        },

        frendsPage: {
            frend: [
                {name: 'Anton', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
                {name: 'Tom', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
                {name: 'Job', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
            ]
        }

    },
    GetState() {
        return this._state;
    },

    _callSubscriber() {
        console.log('Good');
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profilePageReducer(this._state.profilePage, action);
        this._state.messagePage = messagePageReducer(this._state.messagePage, action);

        this._callSubscriber(this.state);

    }
}

export default store;