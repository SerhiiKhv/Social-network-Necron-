import React from 'react';
import styles from './FormController.module.css';

export const FormControl = ({input,meta,child,...props}) =>{

    const hasError = meta.touched && meta.error;
    return(
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) =>{
    const {input,meta,child,...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) =>{
    const {input,meta,child,...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

/*export const createField = (placeholder, name, component, validate, props={}, text = "") => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               validate={validate}
               {...props}
        />{text}


        {createField("Email","email", Input,[required])}
        {createField("Password","password", Input,[required], {type: "password"})}
        {createField(null,"rememberMe", Input,[], {type: "password", text: "remember me"})}

    </div>
)*/