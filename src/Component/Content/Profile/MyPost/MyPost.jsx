import React from 'react';
import s from './MyPost.module.css'
import Post from "./Post/Post";
import {Form, Field} from 'react-final-form'
import {MaxLength, required} from "../../../../utils/validator/validator";
import {Textarea} from "../../../common/FormController/FormController";

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
                    <Field name={"newPostText"} component={Textarea}
                           placeholder={"Text for new post"}
                           validate={composeValidators(required, MaxLength(30))}/>
                <button>Add Post</button>
            </form>
        )}
    </Form>
    )
}


const MyPost =  React.memo(props => {
    console.log("Hi");
    let postElement = props.profilePage.posts.map(p => <Post text={p.text} like={p.like}/>);

    return (
        <div className={s.post}>
            <PostForm onAddPost={props.onAddPost} />
            <div>
                {postElement}
            </div>
        </div>
    );
})

export default MyPost;