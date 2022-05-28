import React from 'react';
import Profile from "./Profile";
import {getProfile, setUserProfile} from "../../../Redux/profilePage-reducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../../Hoc/AuthRedirect";
import {compose} from "redux";

class ProfileConteiner extends React.Component{

    componentDidMount() {
        this.props.getProfile(this.props.match.params.userId);
    }

    render() {
        return (
           <Profile {...this.props} profile={this.props.profile}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {setUserProfile, getProfile})
)(ProfileConteiner)

