import React from 'react';
import styles from './FormController.module.css';

type FormControlPropsType = {
    meta: {
        touched: string
        error: string
    }
    children: any
}

export const FormControl: React.FC<FormControlPropsType> = ({meta:{touched, error}, children}) =>{
    const hasError = touched && error;
    return(
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea: React.FC<any> = (props) =>{
    const {input,meta,...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<any> = (props) =>{
    const {input,meta,...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}