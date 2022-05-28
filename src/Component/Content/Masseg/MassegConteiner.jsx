import React from 'react';
import {addMassegActiveCreator, updateNewMassegTextActiveCreator} from "../../../Redux/messagePage-reducer";
import Masseg from "./Masseg";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../Hoc/AuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
   return {
       messagePage: state.messagePage,
       newMassegText: state.messagePage.newMassegText
   }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onAddMasseg: () => {
            dispatch(addMassegActiveCreator());
            },
        onMassegChange: (newMasseg) => {
            let action = updateNewMassegTextActiveCreator(newMasseg)
            dispatch(action);
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Masseg)