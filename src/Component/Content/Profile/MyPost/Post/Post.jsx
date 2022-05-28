import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.post}>
            <img src="https://www.meme-arsenal.com/memes/b83d2961a5e6759d700194d62acd1fc0.jpg"/>
            {props.text}
            <span> Like {props.like} </span>
        </div>
    );
}

export default Post;