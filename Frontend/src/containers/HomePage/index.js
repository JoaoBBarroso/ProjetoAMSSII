import React from 'react';
// import { userService } from '../../services/user.service';
import HomePageComponent from '../../components/Home';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }

    componentWillMount() {
        // this.setState({
        //     user: JSON.parse(localStorage.getItem('user')),
        //     users: { loading: true }
        // }, () => { console.log(this.state.user) });

        // userService.getAll().then(users => this.setState({ users }));

        let users = [{
            id: 1,
            username: 'test',
            password: 'test',
            firstName: 'Admin',
            lastName: 'User'
        }];

        this.setState({
            user: users[0],
            users: users
        })
    }

    render() {
        const { user, users } = this.state;
        console.log(user, users)
        return (
            <HomePageComponent
                user={user}
                users={users}
            />
        );
    }
}


export default HomePage;