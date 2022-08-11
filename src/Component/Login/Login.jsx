import React from 'react';
import {Form, Field} from 'react-final-form'
import {connect} from "react-redux";
import {login, logout} from "../../Redux/authMe-reducer";
import {Redirect} from "react-router-dom";
import {required} from "../../utils/validator/validator";
import {Input} from "../common/FormController/FormController";

const LoginForm= (props) => {
    return(
    <Form
        onSubmit={formData => {
            props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        }}>
        {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field placeholder={"Email"} name={"email"} component={Input}
                           validate={required}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"} component={Input}
                           type={"password"} validate={required}/>
                </div>
                <div>
                    <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me
                </div>
                {props.captchaUrl && <img src={props.captchaUrl}/>}
                {props.captchaUrl &&  <Field placeholder={"Captcha"} name={"captcha"} component={Input} validate={required}/>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        )}
    </Form>
    )
}


const Login= ({isAuth, login, captchaUrl}) => {
    if(isAuth){
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm login={login} captchaUrl={captchaUrl} isAuth={isAuth}/>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.authMe.isAuth,
        captchaUrl: state.authMe.captchaUrl
    }
}

export default connect(mapStateToProps,{login,logout})(Login);

