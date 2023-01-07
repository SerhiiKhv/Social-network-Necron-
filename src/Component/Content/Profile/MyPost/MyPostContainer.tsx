import {actions} from "../../../../Redux/profilePage-reducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import React from "react";

let mapStateToProps = (state: AppStateType) => {
    return {
        profilePage: state.profilePage
    }
}

// @ts-ignore
const MyPostContainer = connect(mapStateToProps, {actions})(MyPost);

export default MyPostContainer;