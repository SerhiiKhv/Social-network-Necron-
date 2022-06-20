import React, {Component} from 'react';
import './App.css';
import Nav from './Component/Nav/Nav'
import {Route, withRouter} from "react-router-dom";
import Music from "./Component/Content/Music/Music";
import Setting from "./Component/Content/Setting/Setting";
import MassegConteiner from "./Component/Content/Masseg/MassegConteiner";
import UsersConteiner from "./Component/Content/Users/UsersConteiner";
import ProfileConteiner from "./Component/Content/Profile/ProfileConteiner";
import HeaderConteiner from "./Component/Header/HeaderComponent";
import Login from "./Component/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./Redux/app-reducer";
import Preloader from "./Component/common/Preloader/Preloader";

class App extends Component {
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
                        <Route path='/login' render={() => <Login/>}/>
                    </div>

                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializedApp})
)(App)
