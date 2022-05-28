import React from 'react';
import s from './Dialog.module.css'

const Dialog = (props) => {
    return (
        <div className={s.dialog}>
            <div><img src={props.ava}/> {props.text}</div>
        </div>
    );
}

export default Dialog;