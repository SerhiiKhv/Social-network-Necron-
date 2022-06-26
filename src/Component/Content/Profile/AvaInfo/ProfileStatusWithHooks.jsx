import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activetedEditMode = () =>{
        setEditMode(true);
    }

    const doActivetedEditMode = () =>{
        setEditMode(false);
        props.putStatusProfile(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

        return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activetedEditMode}>{status || "-------"}</span>
                    </div>
                }
                {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={doActivetedEditMode}
                           value={status}></input>
                </div>
                }
            </div>

        )
}


export default ProfileStatusWithHooks;