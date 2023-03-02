import React, {useEffect} from 'react';
import './App.scss';
import Nav from './Component/Nav/Nav'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Music from "./Component/Content/Music/Music";
import ProfileContainer from "./Component/Content/Profile/ProfileContainer";
import HeaderContainer from "./Component/Header/HeaderComponent";
import {Provider, useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./Redux/app-reducer";
import Preloader from "./Component/common/Preloader/Preloader";
import store, {AppStateType} from "./Redux/redux-store";
import SettingContainer from "./Component/Content/Setting/SettingContainer";
import {withRouter} from "./Hoc/withRouter";
import {LoginPage} from "./Component/Login/Login";
import UsersPage from "./Component/Content/Users/UsersPage";
import {getIsAuth} from "./Redux/selector/login-selector";
import ChatPage from "./Component/Content/Chat/ChatPage";
import Message from "./Component/Content/Masseg/Message";

type DispatchTypeProps = {
    withSuspense: () => any
}

const AppStart: React.FC<DispatchTypeProps> = () => {

    const isAuth = useSelector(getIsAuth)
    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    const dispatch = useDispatch()


    useEffect(() => {
        {
            dispatch(initializedApp());
        }
    })

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className='app-wrapper'>

            <HeaderContainer/>

            <Nav/>


            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/profile/:userId?' element={isAuth ? (<ProfileContainer/>)
                        : (<Navigate replace to={"/login"}/>)}/>

                    {/*<Route path='/massage' element={isAuth ? (<Message/>)
                        : (<Navigate replace to={"/login"}/>)}/>*/}

                    <Route path='/setting' element={isAuth ? (<SettingContainer/>)
                        : (<Navigate replace to={"/login"}/>)}/>

                    <Route path='/music' element={isAuth ? (<Music/>)
                        : (<Navigate replace to={"/login"}/>)}/>

                    <Route path='/login' element={!isAuth ? (<LoginPage/>)
                        : (<Navigate replace to={"/profile"}/>)}/>

                    <Route path="/users" element={isAuth ? (<UsersPage/>)
                        : (<Navigate replace to={"/login"}/>)}/>

                    <Route path="/chat" element={isAuth ? (<ChatPage/>)
                        : (<Navigate replace to={"/login"}/>)}/>

                </Routes>
            </div>
        </div>
    );

}

let AppContainer = compose<React.ComponentType>(
    withRouter
)(AppStart)


let App = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default App;