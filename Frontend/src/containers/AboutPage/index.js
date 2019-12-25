import React from 'react';
import About from '../../components/About';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Home page container of the application.
*/
class AboutPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <About />
        );
    }
}

const mapPropsToState = (state) => {
}

export default withRouter(connect(mapPropsToState)(AboutPage));