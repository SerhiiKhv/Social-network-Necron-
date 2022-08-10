import React, {useEffect, useState} from 'react';

type PropsType = {
    status: string
    putStatusProfile: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activatedEditMode = () =>{
        setEditMode(true);
    }

    const doActivatedEditMode = () =>{
        setEditMode(false);
        props.putStatusProfile(status);
    }

    const onStatusChange = (e: any) => {
        setStatus(e.currentTarget.value);
    }

        return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activatedEditMode}>{status || "-------"}</span>
                    </div>
                }
                {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={doActivatedEditMode}
                           value={status}/>
                </div>
                }
            </div>

        )
}


export default ProfileStatusWithHooks;