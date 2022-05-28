import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

let mapStateForPropsRedirect = (state) => ({
    isAuth: state.authMe.isAuth
});

export const withAuthRedirect = (Component) =>{

    class RedirectComponent extends React.Component{
        render() {
            if(!this.props.isAuth) return <Redirect to='/login' />

            return <Component {...this.props}/>
        }
    }

    let ConectedAuthRedirectComponent = connect(mapStateForPropsRedirect)(RedirectComponent);
    return ConectedAuthRedirectComponent;
}
