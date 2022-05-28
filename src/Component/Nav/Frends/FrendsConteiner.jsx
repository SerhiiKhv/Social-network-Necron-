import React from 'react';
import {connect} from "react-redux";
import Frends from "./Frends";


let mapStateToProps = (state) => {
    return {
        frendsPage: state.frendsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

    }
}

const FrendsConteiner = connect(mapStateToProps, mapDispatchToProps)(Frends);

export default FrendsConteiner;