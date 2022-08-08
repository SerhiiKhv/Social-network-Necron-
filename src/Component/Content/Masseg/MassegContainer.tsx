import {addMessageActiveCreator, updateNewMessageTextActiveCreator} from "../../../Redux/messagePage-reducer";
import Message from "./Message";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../Hoc/AuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../../Redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
   return {
       messagePage: state.messagePage,
       newMessageText: state.messagePage.newMessageText
   }
}

export default compose(
    connect(mapStateToProps, {updateNewMessageTextActiveCreator, addMessageActiveCreator}),
    withAuthRedirect
)(Message)