import React, {useState} from "react";
import {FilterType} from "../../../Redux/usersPage-reducer";
import {Field, Formik} from "formik";
import style from './Users.module.scss'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    term: string
    friend: string
}

type FormType = {
    term: string,
    friend: 'null' | 'true' | 'false'
}
const UsersSearchFormValidate = () => {
    return {}
}

const UserForm: React.FC<PropsType> = (props) => {
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: term,
            friend: friend === "null" ? null : friend === "true"
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }


    let [term, setTerm] = useState(props.term);
    let [friend, setFriend] = useState(props.friend);
    const onTermChange = (e: any) => {
        setTerm(e.currentTarget.value);
    }
    const onFriendChange = (e: any) => {
        setFriend(e.currentTarget.value);
    }


    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: '', friend: 'null'}}
            validate={UsersSearchFormValidate}
            onSubmit={submit}
        >
            {({
                  isSubmitting,
                  handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        value={term} onChange={onTermChange}
                        type='text' name='term' className={style.inputText}/>
                    <Field
                        value={friend} onChange={onFriendChange}
                        name="friend" as="select" className={style.inputSelector}>
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
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