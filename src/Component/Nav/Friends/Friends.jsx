import React from 'react';
import s from './Friends.module.css'

const Friends = (props) => {

    let friendPage = props.friendsPage.friend.map(f => <Friends ava={f.ava}/>);

    return (
        <div className={s.friend}>
            <img src={props.ava}/>

            Friends

            { friendPage }
        </div>
    );
}

export default Friends;