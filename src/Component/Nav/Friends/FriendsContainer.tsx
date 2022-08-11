import React from 'react';
import {connect} from "react-redux";
import Friends from "./Friends";
import {AppStateType} from "../../../Redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        friends: state.friendsPage.friends
    }
}

const FriendsContainer = connect(mapStateToProps, {})(Friends);

export default FriendsContainer;