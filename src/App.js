import React, {Component} from 'react';
import './App.css';
import Nav from './Component/Nav/Nav'
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Music from "./Component/Content/Music/Music";
import Setting from "./Component/Content/Setting/Setting";
import MassegConteiner from "./Component/Content/Masseg/MassegConteiner";
import UsersConteiner from "./Component/Content/Users/UsersConteiner";
import ProfileConteiner from "./Component/Content/Profile/ProfileConteiner";
import HeaderConteiner from "./Component/Header/HeaderComponent";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./Redux/app-reducer";
import Preloader from "./Component/common/Preloader/Preloader";
import store from "./Redux/redux-store";
import {withSuspense} from "./Hoc/withSuspense";

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

                    <HeaderConteiner/>

                    <Nav/>

                    <div className='app-wrapper-content'>
                        <Route path='/profile/:userId?' render={() => <ProfileConteiner/>}/>
                        <Route path='/masseg' render={() => <MassegConteiner/>}/>
                        <Route path='/setting' component={Setting}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/users' render={() => <UsersConteiner/>}/>
                        <Route path='/login' render={withSuspense(Login)}/>
                    </div>

                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppConteiner = compose(
    withRouter,
    connect(mapStateToProps, {initializedApp})
)(AppStart)

let App = (props) => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppConteiner/>
        </BrowserRouter>
    </Provider>
}

export default App;