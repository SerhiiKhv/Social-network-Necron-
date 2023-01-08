import React from 'react';
import s from './MyPost.module.css'
import Post from "./Post/Post";
import {Form, Field} from 'react-final-form'
import {MaxLength, required} from "../../../../utils/validator/validator";
import {Textarea} from "../../../common/FormController/FormController";
import {ProfileType} from "../../../../Redux/Types/types";

type PropsTypePostForm = {
    addPostActiveCreator: (values: string) => void
}

const PostForm: React.FC<PropsTypePostForm> = (props) => {
    const composeValidators = (...validators: any[]) => (value: string) =>
        validators.reduce((error, validator) => error || validator(value), undefined)

    return(
    <Form
        onSubmit={ values => {
            props.addPostActiveCreator(values.newPostText);
        }}>
        {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
                    <Field className={s.textarea}
                        name={"newPostText"} component={Textarea}
                           placeholder={"Text for new post"}
                           validate={composeValidators(required, MaxLength(30))}/>
                <button className={s.button}>Add Post</button>
            </form>
        )}
    </Form>
    )
}


type PropsTypeMyPost= {
    addPostActiveCreator: () => void
    profilePage: ProfileType
}

const MyPost: React.FC<PropsTypeMyPost> = (props) => {
    let postElement = props.profilePage.posts.map(p => <Post text={p.text} like={p.like}/>);

    return (
        <div className={s.post}>
            <PostForm addPostActiveCreator={props.addPostActiveCreator} />
            <div>
                {postElement}
            </div>
        </div>
    );
}

export default MyPost;