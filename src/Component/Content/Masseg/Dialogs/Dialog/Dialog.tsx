import React from 'react';
import s from './Dialog.module.css'

type PropsType = {
    ava: string
    text: string
}

const Dialog: React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <div><img src={props.ava}/> {props.text}</div>
        </div>
    );
}

export default Dialog;