import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

export default class Footer extends React.Component {
    render() {
        return (
                <div className="footer">
                    <span>{this.props.leftText}</span>
                    <span className="rightFooter" >{this.props.rightText}</span>
                </div>
        )
    }
}

Footer.propTypes = {
    leftText: PropTypes.string,
    rightText: PropTypes.string
}

Footer.defaultProps = {
    leftText: 'João Barroso',
    rightText: ''
}