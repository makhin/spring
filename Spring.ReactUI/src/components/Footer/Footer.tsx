import React from "react";
import {Container} from "reactstrap";

class Footer extends React.Component<any, any> {
    render() {
        return (
            <footer className="py-2 bg-dark">
                <Container>
                    <p className="m-0 text-center text-white">Copyright &copy;</p>
                </Container>
            </footer>
        );
    }
}

export default Footer;