import React from 'react';
import s from './Frends.module.css'

const Frends = (props) => {

    let frendPage = props.frendsPage.frend.map(f => <Frends ava={f.ava}/>);

    return (
        <div className={s.frend}>
            <img src={props.ava}/>

            Frends

            { frendPage }
        </div>
    );
}

export default Frends;