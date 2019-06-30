import React from 'react';
import HomePageComponent from '../../components/Home';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Home page container of the application.
*/
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            users: []
        };
    }

    componentWillMount() {

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
        const { searchHistory } = this.props;
        return (
            <HomePageComponent
                user={user}
                users={users}
                searchHistory={searchHistory}
            />
        );
    }
}

const mapPropsToState = (state) => {
    var {
        searchHistory,
        productData,
        isLoaded,
        isLoading,
        error, } = state.product;
    return {
        searchHistory,
        productData,
        isLoaded,
        isLoading,
        error

    }
}

export default withRouter(connect(mapPropsToState)(HomePage));