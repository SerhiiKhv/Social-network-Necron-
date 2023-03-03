import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {putStatusProfile} from "../../../Redux/profilePage-reducer";
import {getStatus} from "../../../Redux/selector/profile-selector";

const ProfileStatusWithHooks: React.FC = () => {
    let status = useSelector(getStatus)
    let [editMode, setEditMode] = useState(false);
    let [newStatus, setNewStatus] = useState(status);
    const dispatch = useDispatch()

    useEffect(() => {
        setNewStatus(status);
    }, [status]);

    const activatedEditMode = () =>{
        setEditMode(true);
    }

    const doActivatedEditMode = () =>{
        setEditMode(false);
        dispatch(putStatusProfile(newStatus));
    }

    const onStatusChange = (e: any) => {
        setNewStatus(e.currentTarget.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            doActivatedEditMode();
        }
    };

        return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activatedEditMode}>{newStatus || "-------"}</span>
                    </div>
                }
                {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true}
                           onBlur={doActivatedEditMode}
                           value={newStatus}
                           onKeyDown={handleKeyDown}/>
                </div>
                }
            </div>

        )
}


export default ProfileStatusWithHooks;