import React from 'react';
import {addPostActiveCreator, updateNewPostTextActiveCreator} from "../../../../Redux/profilePage-reducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onAddPost: () =>{
            dispatch(addPostActiveCreator());
        },
        onPostChange: (newPost) =>{
            let action = updateNewPostTextActiveCreator(newPost);
            dispatch(action);
        }
    }
}

const MyPostConteiner = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default MyPostConteiner;