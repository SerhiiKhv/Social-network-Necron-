import React from 'react';
import Header from "./Header";
import {logout} from "../../Redux/authMe-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

class HeaderContainer extends React.Component<PropsType>{
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.authMe.isAuth,
        login: state.authMe.login
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer);