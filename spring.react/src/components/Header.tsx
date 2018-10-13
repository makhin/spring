import * as React from 'react';
import {Row, Col,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <Row>
            <Col>
                <Navbar color="light" light expand="lg">
                    <NavbarBrand tag={Link} to="/">reactstrap</NavbarBrand>
                    <NavbarToggler />
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink active tag={RRNavLink} to="/about/">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active tag={RRNavLink} to="/contracts">Contracts</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </Col>
        </Row>
    )};
