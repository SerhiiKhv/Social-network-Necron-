import {addMessageActiveCreator, updateNewMessageTextActiveCreator} from "../../../Redux/messagePage-reducer";
import Message from "./Message";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppStateType} from "../../../Redux/redux-store";
import React from "react";

let mapStateToProps = (state: AppStateType) => {
   return {
       messagePage: state.messagePage,
       newMessageText: state.messagePage.newMessageText
   }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {updateNewMessageTextActiveCreator, addMessageActiveCreator})
)(Message)