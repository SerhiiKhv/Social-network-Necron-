import React from 'react';
import Paginator from "../../common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {
    return <div>
        <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        <div> {
            props.users.map(u => <User user={u}
                                       followingProgress={props.followingProgress}
                                       unfollow={props.unfollow}
                                       follow={props.follow}
                                       key={u.id}/>
            )
        }
        </div>
    </div>
}

export default Users;