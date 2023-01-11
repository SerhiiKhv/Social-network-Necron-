import React from "react";
import {FilterType} from "../../../Redux/usersPage-reducer";
import {Field, Formik} from "formik";
import style from './Users.module.css'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType ={
    term: '',
    friend: 'null' | 'true' | 'false'
}
const UsersSearchFormValidate = () => {
    return {}
}

const UserForm: React.FC<PropsType> = (props) => {

    const submit = (values: FormType, {setSubmitting}: {setSubmitting:(isSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true"
        }


        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            validate={UsersSearchFormValidate}
            onSubmit={submit}
        >
            {({
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                        <Field type='text' name='term' className={style.input}/>
                        <Field name="friend" as="select" className={style.inputSelector}>
                            <option className={style.inputSelector} value="null">All</option>
                            <option className={style.inputSelector} value="true">Only followed</option>
                            <option className={style.inputSelector} value="false">Only unfollowed</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting} className={style.button}>
                            Submit
                        </button>
                </form>
            )}
        </Formik>
    </div>
}

export default UserForm;