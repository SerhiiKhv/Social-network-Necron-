import React from 'react';
import {Form, Field} from 'react-final-form'
import {connect} from "react-redux";
import {login, logout} from "../../Redux/authMe-reducer";
import {Redirect} from "react-router-dom";


const LoginForm = (props) => {
    return(
    <Form
        onSubmit={formData => {
            props.login(formData.email,formData.password,formData.rememberMe);
        }}>
        {({ handleSubmit, pristine, form, submitting }) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field placeholder={"Email"} name={"email"} component={"input"}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"} component={"input"} type={"password"}/>
                </div>
                <div>
                    <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        )}
    </Form>
    )
}


const Login = (props) => {

    if(props.isAuth){
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>

            <LoginForm login={props.login}/>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authMe.isAuth
    }
}

export default connect(mapStateToProps,{login,logout})(Login);

