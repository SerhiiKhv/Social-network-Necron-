import React from 'react';
import s from './Masseg.module.css'
import Dialogs from "./Dialogs/Dialogs";
import Dialog from "./Dialogs/Dialog/Dialog";

const Message = (props) => {

    let dialogElement = props.messagePage.dialog.map(d => <Dialog text={d.text} key={d.id}
                                                                  ava={d.ava}/>);

    let dialogsElement = props.messagePage.dialogs.map(d => <Dialogs name={d.name}
                                                                     id={d.id}
                                                                     key={d.id}
                                                                     ava={d.ava}/>);

    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.addMessageActiveCreator();
    }

    let messageChange = () => {
        props.updateNewMessageTextActiveCreator(newMessageElement.current.value);
    }

    return (
        <div className={s.message}>
            <div>
                {dialogsElement}
            </div>
            <div className={s.textDialog}>
                {dialogElement}
                <div className={s.poleForText}>
                <textarea className={s.textareaMessage} onChange={messageChange}
                          ref={newMessageElement}
                          value={props.newMessageText}/>
                    <button onClick={addMessage}>----</button>
                </div>
            </div>
        </div>
    );
}

export default Message;