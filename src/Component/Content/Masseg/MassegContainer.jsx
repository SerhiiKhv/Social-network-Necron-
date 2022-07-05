import React from 'react';
import {addMessageActiveCreator, updateNewMessageTextActiveCreator} from "../../../Redux/messagePage-reducer";
import Message from "./Message";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../Hoc/AuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
   return {
       messagePage: state.messagePage,
       newMessageText: state.messagePage.newMassegText
   }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onAddMessage: () => {
            dispatch(addMessageActiveCreator());
            },
        onMessageChange: (newMessage) => {
            let action = updateNewMessageTextActiveCreator(newMessage)
            dispatch(action);
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Message)