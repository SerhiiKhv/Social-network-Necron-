import React from 'react';
import {Form, Field} from 'react-final-form'
import {connect} from "react-redux";
import {login, logout} from "../../Redux/authMe-reducer";
import {required} from "../../utils/validator/validator";
import {Input} from "../common/FormController/FormController";
import {AppStateType} from "../../Redux/redux-store";
import s from "./Login.module.scss"

type MapDispatchType = {
    login: (email: string, password: string,
            rememberMe: boolean, captchaUrl: string | null) => void
}

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const LoginForm: React.FC<MapDispatchType & MapStateType> = (props) => {
    const onSubmitFunction = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    return(
    <Form
        onSubmit = {onSubmitFunction}>
        {({handleSubmit}) => (
            <form onSubmit={handleSubmit} className={s.text}>
                <h1 className={s.text}>Login</h1>
                <div>
                    <Field placeholder={"Email"} name={"email"} component={Input}
                           validate={required} className={s.input}/>
                </div>
                <div>
                    <Field placeholder={"Password"} name={"password"} component={Input}
                           type={"password"} validate={required} className={s.input}/>
                </div>
                <div>
                    {props.captchaUrl && <img src={props.captchaUrl}/>}
                    {props.captchaUrl &&  <Field placeholder={"Captcha"} name={"captcha"} component={Input} validate={required} className={s.input}/>}

                </div>
                <div>
                    <button className={s.button}>Login</button>
                </div>
            </form>
        )}
    </Form>
    )
}

const Login: React.FC<any> = ({isAuth, login, captchaUrl}) => {
    return (
        <div>
           <LoginForm login={login} captchaUrl={captchaUrl} isAuth={isAuth}/>
        </div>
    );
}



type MapStateType = {
    isAuth: boolean
    captchaUrl: string | null
}

let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        isAuth: state.authMe.isAuth,
        captchaUrl: state.authMe.captchaUrl
    }
}

export default connect(mapStateToProps,{login, logout})(Login);