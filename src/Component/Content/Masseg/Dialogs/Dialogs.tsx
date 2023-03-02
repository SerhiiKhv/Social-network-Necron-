import React from 'react';
import s from './Dialogs.module.scss'
import {NavLink} from "react-router-dom";

type PropsType = {
    id: string
    ava: string
    name: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let path = "/message/" + props.id;

    return (
            <div className={s.dialogs}>
                <NavLink to={path}>
                   <img src={props.ava}/> {props.name}
                </NavLink>
            </div>
    );
}
export default Dialogs;