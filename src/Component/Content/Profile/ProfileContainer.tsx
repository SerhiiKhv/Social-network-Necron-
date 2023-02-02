import React, {useEffect} from 'react';
import Profile from "./Profile";
import {getProfile, getStatusProfile} from "../../../Redux/profilePage-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {getUserId} from "../../../Redux/selector/profile-selector";

const ProfileContainer: React.FC = () => {
    let {userId} = useParams();

    const authorizedUserId = useSelector(getUserId)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userId) {
            userId = String(authorizedUserId);
        }
        dispatch(getProfile(Number(userId)));
        dispatch(getStatusProfile(Number(userId)));
    }, [authorizedUserId, userId]);

    return (
        <div>
            <Profile/>
        </div>
    );
}
export default ProfileContainer

