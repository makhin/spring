import React from "react";
import {
    Collapse,
    Container, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar, NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import {Link} from "react-router-dom";


class Navigation extends React.Component<{}, { isOpen: boolean }> {

    constructor(props:any) {
        super(props);
        this.state = { isOpen: false };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar fixed={"top"} expand={"lg"} color={"dark"} dark >
                <Container>
                    <NavbarBrand tag={Link} to="/">
                        Весна
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar id="navbarResponsive">
                            <NavItem>
                                <NavLink href="/about">О Программе</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/contracts" >Контракты</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/reports">Отчеты</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Аптека
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Ввести накладную
                                    </DropdownItem>
                                    <DropdownItem>
                                        Список накладных
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Navigation;