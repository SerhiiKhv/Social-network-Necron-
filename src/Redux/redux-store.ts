import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profilePageReducer} from "./profilePage-reducer";
import {messagePageReducer} from "./messagePage-reducer";
import {friendsPageReducer} from "./friendsPage-reducer";
import {usersPageReducer} from "./usersPage-reducer";
import {authMeReducer} from "./authMe-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReduser} from "redux-form";
import {appReducer} from "./app-reducer";

let reducers = combineReducers({
    profilePage: profilePageReducer,
    messagePage: messagePageReducer,
    friendsPage: friendsPageReducer,
    usersPage: usersPageReducer,
    authMe: authMeReducer,
    form: formReduser,
    app: appReducer
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
       applyMiddleware(thunkMiddleware)
));

// @ts-ignore
window.__store__ = store;

export default store;