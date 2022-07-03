import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profilePageReducer} from "./profilePage-reducer";
import {messagePageReducer} from "./messagePage-reducer";
import {frendsPageReducer} from "./frendsPage-reducer";
import {usersPageReducer} from "./usersPage-reducer";
import {authMeReducer} from "./authMe-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReduser} from "redux-form";
import {appReducer} from "./app-reducer";

let reducers = combineReducers({
    profilePage: profilePageReducer,
    messagePage: messagePageReducer,
    frendsPage: frendsPageReducer,
    usersPage: usersPageReducer,
    authMe: authMeReducer,
    form: formReduser,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
       applyMiddleware(thunkMiddleware)
));

window.__store__ = store;

export default store;