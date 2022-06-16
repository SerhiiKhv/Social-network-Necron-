import React from 'react';
import s from './MyPost.module.css'
import Post from "./Post/Post";
import {Form, Field} from 'react-final-form'
import {MaxLength, required} from "../../../../utils/validator/validator";

const PostForm = (props) => {

    const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return(
    <Form
        onSubmit={values => {
            props.onAddPost(values.newPostText);
        }}>
        {({handleSubmit, pristine, form, submitting}) => (
            <form onSubmit={handleSubmit}>
                    <Field name={"newPostText"} component={"textarea"}
                           validate={composeValidators(required, MaxLength(30))}/>
                <button>Add Post</button>
            </form>
        )}
    </Form>
    )
}


const MyPost = (props) => {

    let postElement = props.profilePage.post.map(p => <Post text={p.text} like={p.like}/>);

    return (
        <div className={s.post}>
            <PostForm onAddPost={props.onAddPost} />
            <div>
                {postElement}
            </div>
        </div>
    );
}

export default MyPost;