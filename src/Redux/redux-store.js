import {applyMiddleware, combineReducers, createStore} from "redux";
import {profilePageReducer} from "./profilePage-reducer";
import {messagePageReducer} from "./messagePage-reducer";
import {frendsPageReducer} from "./frendsPage-reducer";
import {usersPageReducer} from "./usersPage-reducer";
import {authMeReducer} from "./authMe-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    profilePage: profilePageReducer,
    messagePage: messagePageReducer,
    frendsPage: frendsPageReducer,
    usersPage: usersPageReducer,
    authMe: authMeReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;