import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Glyphicon
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
        var routes = this.props.routes || [];
        var title;
        var { state } = this.props.location;
        if (state && state.title) {
            title = state.title;
        } else {
            routes.some(route => {
                if (route.to === this.props.location.pathname) {
                    title = route.title;
                    return true;
                }
                return false;
            })
        }
        return (
            <div>
                <Navbar className="navbar" light expand="md">
                    <NavbarBrand style={{ color: 'white'}} href="/">NUTRIIENTS</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {
                                routes.map((e, i) => {
                                    let link = e.to + "/";
                                    if (e.hide === undefined || e.hide === false)
                                        return <NavItem key={i}><NavLink style={{ color: 'white'}} href={link}>{e.label}</NavLink></NavItem>
                                    return false;
                                })
                            }
                            {/*  SE QUISERMOS DROPDOWN 
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    var user = state.user;
    return {
        user: user.user,
    }
}


export default withRouter(connect(mapPropsToState)(Menu));