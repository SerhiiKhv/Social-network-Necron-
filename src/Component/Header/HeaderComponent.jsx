import React from 'react';
import Header from "./Header";
import {logout} from "../../Redux/authMe-reducer";
import {connect} from "react-redux";

class HeaderConteiner extends React.Component {
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authMe.isAuth,
        login: state.authMe.login
    }
}


export default connect(mapStateToProps, {logout})(HeaderConteiner);