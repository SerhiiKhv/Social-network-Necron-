import React, {Component} from 'react';
import './App.css';
import Nav from './Component/Nav/Nav'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Music from "./Component/Content/Music/Music";
import MassageContainer from "./Component/Content/Masseg/MassegContainer";
import UsersContainer from "./Component/Content/Users/UsersContainer";
import ProfileContainer from "./Component/Content/Profile/ProfileContainer";
import HeaderContainer from "./Component/Header/HeaderComponent";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./Redux/app-reducer";
import Preloader from "./Component/common/Preloader/Preloader";
import store, {AppStateType} from "./Redux/redux-store";
import SettingContainer from "./Component/Content/Setting/SettingContainer";
import {withRouter} from "./Hoc/withRouter";
import Login from "./Component/Login/Login";

type MapTypeProps = {
    initialized: boolean
    isAuth: boolean
}
type DispatchTypeProps = {
    initializedApp: () => void
    withSuspense: () => any
}

class AppStart extends Component<MapTypeProps & DispatchTypeProps> {
    componentDidMount() {
        this.props.initializedApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>

                <HeaderContainer/>

                <Nav/>

                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/profile/:userId?' element={this.props.isAuth ? (<ProfileContainer />)
                            : (<Navigate replace to={"/login"} />)}/>

                        <Route path='/massage' element={this.props.isAuth ? (<MassageContainer />)
                            : (<Navigate replace to={"/login"} />)}/>

                        <Route path='/setting' element={this.props.isAuth ? (<SettingContainer />)
                            : (<Navigate replace to={"/login"} />)}/>

                        <Route path='/music' element={this.props.isAuth ? (<Music />)
                            : (<Navigate replace to={"/login"} />)}/>

                        <Route path='/login' element={!this.props.isAuth ? (<Login />)
                            : (<Navigate replace to={"/profile"} />)}/>

                        <Route path="/users" element={this.props.isAuth ? (<UsersContainer />)
                            : (<Navigate replace to={"/login"} />)}/>

                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    isAuth: state.authMe.isAuth
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializedApp})
)(AppStart)


let App = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default App;