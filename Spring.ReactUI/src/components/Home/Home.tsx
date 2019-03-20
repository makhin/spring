import React from "react";
import ContractList from "../Contract/ContractList";
import Header from "../Header/Header";
import {Container, Row} from "reactstrap";

class Home extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Row>
                    <Header/>
                </Row>
                <Row>
                    <h2>Contracts</h2>
                    <ContractList/>
                </Row>
            </div>
        );
    }
}

export default Home;