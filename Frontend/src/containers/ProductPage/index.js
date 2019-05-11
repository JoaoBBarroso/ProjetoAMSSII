import React from 'react';
import ProductSearch from '../../components/ProductSearch';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearch: '',
            submitted: '',
            loading: false,
            error: ''
        };
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ currentSearch: value });
    }

    handleSubmit = (e) => {
        console.log(this.state.currentSearch)
        this.setState({ loading: true, error: "your product doesn't exist" });
        // e.preventDefault();

        // this.setState({ submitted: true });
        // const { username, password, returnUrl } = this.state;

        // // stop here if form is invalid
        // if (!(username && password)) {
        //     return;
        // }

        // this.setState({ loading: true });
        // userService.login(username, password)
        //     .then(
        //         user => {
        //             const { from } = this.props.location.state || { from: { pathname: "/" } };
        //             this.props.history.push(from);
        //         },
        //         error => this.setState({ error, loading: false })
        //     );
    }

    render() {
        const { currentSearch, submitted, error } = this.state;
        return (
            <ProductSearch

                //state
                currentSearch={currentSearch}
                submitted={submitted}
                error={error}

                //functions
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

const mapPropsToState = (state) => {
    var user = state.user;
    return {
        user: user.user,
    }
}


export default withRouter(connect(mapPropsToState)(ProductPage));