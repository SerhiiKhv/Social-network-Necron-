import React from 'react';
import {addPostActiveCreator} from "../../../../Redux/profilePage-reducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onAddPost: (newPostText) =>{
            dispatch(addPostActiveCreator(newPostText));
        }
    }
}

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);

export default MyPostContainer;