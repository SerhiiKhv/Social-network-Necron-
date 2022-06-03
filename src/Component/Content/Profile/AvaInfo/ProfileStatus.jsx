import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activetedEditMode = () =>{
        this.setState({
            editMode: true
        })
    }

    doActivetedEditMode = () =>{
        this.setState({
            editMode: false
        })
        this.props.putStatusProfile(this.state.status);
    }
    onStatusChange = (e) =>{
        this.setState({
            status: e.currentTarget.value
        });
    }


    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activetedEditMode}>{this.props.status || "-------"}</span>
                    </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.doActivetedEditMode} value={this.state.status}></input>
                </div>
                }
            </div>

        )
    }
}


export default ProfileStatus;