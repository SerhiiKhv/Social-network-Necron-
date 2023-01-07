import {
    profilePageReducer
} from "../profilePage-reducer";
import {PostType, ProfileType} from "../Types/types";

let state = {
    posts: [
        {id: 1, text: 'Hi', like: 2},
        {id: 2, text: 'Hello', like: 3},
        {id: 3, text: 'Good', like: 5}
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: ""
}

test('add new post', () => {
   //let action = addPostActiveCreator("Hello");
   //let newState = profilePageReducer(state, action);
   //expect(newState.posts.length).toBe(4);
});

test('delete post', () => {
    //let action = deletePost(3);
    //let newState = profilePageReducer(state, action);
    //expect(newState.posts.length).toBe(2);
});

test('put status profile', () => {
    //let action = getStatus("Hello");
    //let newState = profilePageReducer(state, action);
    //expect(newState.status).toBe("Hello");
});


