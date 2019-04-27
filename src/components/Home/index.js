import React from 'react';
import { Link } from 'react-router-dom';
// import './styles.css';


export default class Home extends React.Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">

                    <h1>Hi {this.props.user.firstName}!</h1>
                    <p>You're logged in with React & Basic HTTP Authentication!!</p>
                    <h3>Users from secure api end point:</h3>
                    {(this.props.users.loading !== null ? this.props.users.loading : null) && <em>Loading users...</em>}
                    {this.props.users.length &&
                        <ul>
                            {this.props.users.map((user, index) =>
                                <li key={user.id}>
                                    {user.firstName + ' ' + user.lastName}
                                </li>
                            )}
                        </ul>
                    }
                    <p>
                        <Link to="/login">Logout</Link>
                    </p>

            </div>
        )
    }
}