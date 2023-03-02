import React from 'react';
import s from './Masseg.module.scss'
import Dialogs from "./Dialogs/Dialogs";
import Dialog from "./Dialogs/Dialog/Dialog";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
const Message: React.FC = () => {

    let messagePage = useSelector((state: AppStateType) => state.messagePage)

    let dialogElement = messagePage.dialog.map(d => <Dialog text={d.text} key={d.id}
                                                                  ava={d.ava}/>);

    let dialogsElement = messagePage.dialogs.map(d => <Dialogs name={d.name}
                                                                     id={d.id}
                                                                     key={d.id}
                                                                     ava={d.ava}/>);
    return (
        <div className={s.message}>
            <div>
                {dialogsElement}
            </div>
            <div className={s.textDialog}>
                {dialogElement}
                <div className={s.poleForText}>
                <textarea className={s.textareaMessage}
                    /* onChange={messageChange}
                          ref={newMessage} */
                          value={'null'}/>
                    <button>----</button>
                </div>
            </div>
        </div>
    );
}

export default Message;