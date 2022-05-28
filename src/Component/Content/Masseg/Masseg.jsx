import React from 'react';
import s from './Masseg.module.css'
import Dialogs from "./Dialogs/Dialogs";
import Dialog from "./Dialogs/Dialog/Dialog";

const Masseg = (props) => {

    let dialogElement = props.messagePage.dialog.map(d => <Dialog text={d.text} ava={d.ava}/>);

    let dialogsElement = props.messagePage.dialogs.map(d => <Dialogs name={d.name}
                                                               id={d.id} ava={d.ava}/>);

    let newMassegElement = React.createRef();

    let addMasseg = () => {
        props.onAddMasseg();
    }

    let massegChange = () => {
        let newMasseg = newMassegElement.current.value;
        props.onMassegChange(newMasseg);
    }

    return (
        <div className={s.masseg}>
            <div>
                {dialogsElement}
            </div>
            <div className={s.textDialog}>
                {dialogElement}
                <div className={s.poleForText}>
                <textarea className={s.textareaMasseg} onChange={massegChange}
                          ref={newMassegElement}
                          value={props.newMassegText}/>
                    <button onClick={addMasseg}>--></button>
                </div>
            </div>
        </div>
    );
}

export default Masseg;