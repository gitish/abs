import React, { Component } from 'react';

const UserListFun = () => {
    return (
        <div>
            <h1>This is the example of functional component.</h1>      
        </div>
    );
}
// export default UserListFun;

export default class UserList extends Component {
    constructor(props) { // state - component state / props - Application state
        super(props);        
    }

    render() {
        return (
            <div>
                <h1>User List</h1>
                <UserListFun />  
            </div>
        );
    }
}