import React from "react";
import {ChatMessageType} from "../../../../../Redux/chat-reducer";
import {useSelector} from "react-redux";
import {getUserId} from "../../../../../Redux/selector/profile-selector";
import style from "./Message.module.scss";

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    let CheckPhotoMessage = (photo: string) => {
        return photo !== null ? photo : 'https://cdn1.vectorstock.com/i/1000x1000/15/25/approved-person-icon-male-add-user-person-avatar-vector-21201525.jpg'
    }
    //console.log('<<<<Message')
    const authorizedUserId = useSelector(getUserId)
    const checkIsMessageAuthorizedUser = () => {
        if (message.userId !== authorizedUserId) {
            return <div className={style.inlineFlex}>
                <div>
                    <img src={CheckPhotoMessage(message.photo)} className={style.userImgStyle} alt={'Loading img'}/>
                </div>
                <div className={style.message}>
                    <div className={style.messageHeader}>
                        <span className={style.messageSender}>{message.userName}</span>
                    </div>
                    <div className={style.messageContent}>
                        <p>{message.message}</p>
                    </div>
                </div>
            </div>
        }
        return <div className={style.messageAuthorizedUser}>
            <div className={style.message}>
                <div className={style.messageHeader}>
                    <span className={style.messageSender}>{message.userName}</span>
                </div>
                <div className={style.messageContent}>
                    <p>{message.message}</p>
                </div>
            </div>
            <div>
                <img src={CheckPhotoMessage(message.photo)} className={style.userImgStyle} alt={'Loading img'}/>
            </div>
        </div>
    }

    return (
        <div style={{marginTop: "10px"}}>
            {checkIsMessageAuthorizedUser()}
        </div>
    )
})
export default Message