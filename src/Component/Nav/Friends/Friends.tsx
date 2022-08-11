import React from 'react';
import s from './Friends.module.css'
import {FriendsType} from "../../../Redux/friendsPage-reducer";

type PropsType = {
    friends: Array<FriendsType>
    ava: string
}

type PropsType2 = {
    ava: string
}

const Friend: React.FC<PropsType2> = (props) => {
    return (
        <div className={s.friend}>
            <img src={props.ava}/>
        </div>
    );
}

const Friends: React.FC<PropsType> = (props) => {

    let friendPage = props.friends.map(f => <Friend ava={f.ava}/>);

    return (
        <div className={s.friend}>
            <img src={props.ava}/>

            Friends

            { friendPage }
        </div>
    );
}

export default Friends;