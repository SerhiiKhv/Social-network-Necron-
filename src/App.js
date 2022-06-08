import React from 'react';
import './App.css';
import Nav from './Component/Nav/Nav'
import {BrowserRouter, Route} from "react-router-dom";
import Music from "./Component/Content/Music/Music";
import Setting from "./Component/Content/Setting/Setting";
import MassegConteiner from "./Component/Content/Masseg/MassegConteiner";
import UsersConteiner from "./Component/Content/Users/UsersConteiner";
import ProfileConteiner from "./Component/Content/Profile/ProfileConteiner";
import HeaderConteiner from "./Component/Header/HeaderComponent";
import Login from "./Login/Login";

const App = (props) => {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>

                <HeaderConteiner/>

                <Nav/>

                <div className='app-wrapper-content'>
                    <Route path='/profile/:userId?' render={() =><ProfileConteiner/>}/>
                    <Route path='/masseg' render={() =><MassegConteiner/>}/>
                    <Route path='/setting' component={Setting}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/users' render={() =><UsersConteiner/>}/>
                    <Route path='/login' render={() =><Login/>}/>
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;
