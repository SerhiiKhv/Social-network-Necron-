import React from 'react';
import Header from "./Header";
import {authMe, authMeData} from "../../Redux/authMe-reducer";
import {connect} from "react-redux";

class HeaderConteiner extends React.Component {

    componentDidMount() {
        this.props.authMe();
    }


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


export default connect(mapStateToProps, {authMeData,authMe})(HeaderConteiner);