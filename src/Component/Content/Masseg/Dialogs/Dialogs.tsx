import React from 'react';
import s from './Dialogs.module.scss'
import {BrowserRouter, NavLink} from "react-router-dom";

type PropsType = {
    id: number
    ava: string
    name: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let path = "/message/" + props.id;

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