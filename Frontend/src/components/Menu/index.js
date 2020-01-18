import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar className="navbar" light expand="md">
                    <NavbarBrand style={{ color: 'white' }} href="/">NUTRIEAT</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem key={1}><NavLink style={{ color: 'white' }} href={"/"}>Product Search</NavLink></NavItem>
                            <NavItem key={2}><NavLink style={{ color: 'white' }} href={"/healthy-tips"}>Tips!</NavLink></NavItem>
                            <NavItem key={3}><NavLink style={{ color: 'white' }} href={"About"}>About</NavLink></NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapPropsToState = (state) => {

}

export default withRouter(connect(mapPropsToState)(Menu));