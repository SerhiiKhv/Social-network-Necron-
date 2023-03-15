import React, {useContext} from 'react';
import {Field, Form} from 'react-final-form'
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../Redux/authMe-reducer";
import {required} from "../../utils/validator/validator";
import {Input} from "../common/FormController/FormController";
import s from "./Login.module.scss"
import {getCaptchaUrl} from "../../Redux/selector/login-selector";
import {LanguageContext} from "../../Language/components/LanguageContext";
import {loginLanguage as enLoginLanguage} from "../../Language/LanguageType/en";
import {loginLanguage as ukLoginLanguage} from "../../Language/LanguageType/uk";

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export const LoginPage: React.FC = () => {

    const { lang } = useContext(LanguageContext);
    const loginLanguage = lang === "en" ? enLoginLanguage : ukLoginLanguage;

    const captchaUrl = useSelector(getCaptchaUrl)
    const dispatch = useDispatch()

    const onSubmitFunction = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }

    return (
        <Form
            onSubmit={onSubmitFunction}>
            {({handleSubmit}) => (
                <form onSubmit={handleSubmit} className={s.text}>
                    <h1 className={s.text}>{loginLanguage.login}</h1>
                    <div>
                        <Field placeholder={"Email"} name={"email"} component={Input}
                               validate={required} className={s.input}/>
                    </div>
                    <div>
                        <Field placeholder={"Password"} name={"password"} component={Input}
                               type={"password"} validate={required} className={s.input}/>
                    </div>
                    <div>
                        {captchaUrl && <img src={captchaUrl} alt={""}/>}
                        {captchaUrl &&
                            <Field placeholder={"Captcha"} name={"captcha"} component={Input} validate={required}
                                   className={s.input}/>}

                    </div>
                    <div>
                        <button className={s.button}>{loginLanguage.loginButton}</button>
                    </div>
                </form>
            )}
        </Form>
    )
}