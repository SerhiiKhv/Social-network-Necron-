export type FriendsType = {
    name: string
    ava: string
}

let initialState = {
    friends: [
        {name: 'Anton', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
        {name: 'Tom', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
        {name: 'Job', ava: 'https://i.pinimg.com/originals/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg'},
    ] as Array<FriendsType>
}

type InitialState = typeof initialState;

export const friendsPageReducer = (state = initialState, action: any): InitialState => {
    return state;
}