import React from 'react';
import s from './Dialogs.module.css'
import {BrowserRouter, NavLink} from "react-router-dom";

const Dialogs = (props) => {

    let path = "/masseg/" + props.id;

    return (
        <BrowserRouter>
            <div className={s.dialogs}>
                <img src={props.ava}/>
                <NavLink to={path}>{props.name}</NavLink>
            </div>

        </BrowserRouter>
    );
}

export default Dialogs;