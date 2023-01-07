import React from 'react';
import {connect} from "react-redux";
import {redirect} from "react-router-dom";
import {AppStateType} from "../Redux/redux-store";

let mapStateForPropsRedirect = (state: AppStateType) => ({
    isAuth: state.authMe.isAuth
});

export const withAuthRedirect = (Component: any) =>{
    function RedirectComponent(props: any) {
        if (!props.isAuth) {
            return redirect("/login");
        }
        return <Component {...props}/>
    }

    // @ts-ignore
    return connect(mapStateForPropsRedirect)(RedirectComponent);
}
