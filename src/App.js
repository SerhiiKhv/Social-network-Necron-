import React, {Component} from 'react';
import './App.css';
import Nav from './Component/Nav/Nav'
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Music from "./Component/Content/Music/Music";
import MassageContainer from "./Component/Content/Masseg/MassegContainer";
import UsersContainer from "./Component/Content/Users/UsersContainer";
import ProfileContainer from "./Component/Content/Profile/ProfileContainer";
import HeaderContainer from "./Component/Header/HeaderComponent";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./Redux/app-reducer";
import Preloader from "./Component/common/Preloader/Preloader";
import store from "./Redux/redux-store";
import {withSuspense} from "./Hoc/withSuspense";
import SettingContainer from "./Component/Content/Setting/SettingContainer";

const Login = React.lazy(() => import('./Component/Login/Login'));

class AppStart extends Component {
    componentDidMount() {
        this.props.initializedApp();
    }

    render() {
        if(!this.props.initialized){
           return <Preloader/>
        }
        return (
                <div className='app-wrapper'>

                    <HeaderContainer/>

                    <Nav/>

                    <div className='app-wrapper-content'>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/message' render={() => <MassageContainer/>}/>
                        <Route path='/setting' component={SettingContainer}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={withSuspense(Login)}/>
                    </div>

                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializedApp})
)(AppStart)

let App = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}

export default App;