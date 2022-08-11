import {addPostActiveCreator} from "../../../../Redux/profilePage-reducer";
import MyPost from "./MyPost";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        profilePage: state.profilePage
    }
}

const MyPostContainer = connect(mapStateToProps, {addPostActiveCreator})(MyPost);

export default MyPostContainer;