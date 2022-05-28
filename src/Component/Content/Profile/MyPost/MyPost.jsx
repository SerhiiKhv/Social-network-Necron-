import React from 'react';
import s from './MyPost.module.css'
import Post from "./Post/Post";

const MyPost = (props) => {

    let postElement = props.profilePage.post.map(p => <Post text={p.text} like={p.like}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.onAddPost();
    }

    let postChange = () => {
        let newPost = newPostElement.current.value;
        props.onPostChange(newPost);
    }

    return (
        <div className={s.post}>
            <textarea onChange={postChange}
                      ref={newPostElement}
                      value={props.profilePage.newPostText}/>
            <button onClick={addPost}>Add Post</button>

            {postElement}
        </div>
    );
}

export default MyPost;