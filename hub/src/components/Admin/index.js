import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadig: false,
            users: [],
        };
    }


    componentDidMount() {
        this.setState({ loading: true});

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const userList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.porps.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div>
                <h1>Admin</h1>

                {loading && <div>Loading ...</div>}

                <UserList users={users} />
            </div>
    );
}
}
// *** This Admin API will be pretty much obsolete once we integrate the site with Azure AD
const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={useru.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>E-Mail:</strong> {user.email}
                </span>
                <span>
                    <strong>Username:</strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(AdminPage);