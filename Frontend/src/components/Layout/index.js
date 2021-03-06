import React from 'react';
import Proptypes from 'prop-types';

import { Container } from 'reactstrap'
import "./styles.css"

const HEADER_HEIGHT = 80 + 40;
const FOOTER_HEIGHT = 40;

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minHeight: window.innerHeight - (HEADER_HEIGHT + FOOTER_HEIGHT),
        }
    }

    updateDimensions() {
        this.setState({ minHeight: window.innerHeight - (HEADER_HEIGHT + FOOTER_HEIGHT) });
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        return (<Container className="appBackground">
                    {this.props.children}
                </Container>
        )
    }
}

Layout.propTypes = {
    title: Proptypes.string
}
Layout.defaultProps = {
    title: ''
}