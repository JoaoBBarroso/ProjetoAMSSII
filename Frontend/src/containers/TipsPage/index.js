import React from 'react';
import Tips from '../../components/Tips';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Home page container of the application.
*/
class TipsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <Tips />
        );
    }
}

const mapPropsToState = (state) => {
}

export default withRouter(connect(mapPropsToState)(TipsPage));