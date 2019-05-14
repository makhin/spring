import * as React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


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
            <Navbar fixed={"top"} expand={"lg"} bg={"dark"}>
                    <Navbar.Brand href="#home">
                        Весна
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.toggle} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/about">О Программе</Nav.Link>
                            <Nav.Link href="/contracts" >Контракты</Nav.Link>
                            <Nav.Link href="/reports">Отчеты</Nav.Link>
                            <NavDropdown title="Аптека" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Ввести накладную</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Список накладных</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>                                
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;