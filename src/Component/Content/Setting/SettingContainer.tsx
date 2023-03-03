import React, {useEffect, useState} from 'react';
import {getProfile, getStatusProfile} from "../../../Redux/profilePage-reducer";
import {useDispatch, useSelector} from "react-redux";
import Setting from "./Setting";
import {getUserId} from "../../../Redux/selector/profile-selector";
const SettingContainer: React.FC = () =>{
    let authorizedUserId = useSelector(getUserId)
    const [userID] = useState(authorizedUserId)
    const dispatch = useDispatch()

    useEffect(() => {
        {
            let userID = authorizedUserId;
            dispatch(getProfile(userID));
            dispatch(getStatusProfile(userID as number));
        }
    }, [userID])

        return (
            <Setting/>
        );
}
export default SettingContainer

