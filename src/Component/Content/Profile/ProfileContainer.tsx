import React, {useEffect} from 'react';
import Profile from "./Profile";
import {getProfile, getStatusProfile} from "../../../Redux/profilePage-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {getUserId} from "../../../Redux/selector/profile-selector";

const ProfileContainer: React.FC<any> = (props) => {
    let {userId} = useParams();

    const authorizedUserId = useSelector(getUserId)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userId) {
            userId = String(authorizedUserId);
            if (!userId) {
                props.history.push("/login");
            }
        }
        dispatch(getProfile(Number(userId)));
        dispatch(getStatusProfile(Number(userId)));
    }, [authorizedUserId]);

    return (
        <div>
            <Profile/>
        </div>
    );
}
export default ProfileContainer

