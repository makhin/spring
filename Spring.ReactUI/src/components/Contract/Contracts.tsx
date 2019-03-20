import React from "react";
import SpringBreadcrump from "../SpringBreadcrump/SpringBreadcrump";
import ContractList from "./ContractList";
import {Container, Row} from "reactstrap";

class Contracts extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1 className="mt-4 mb-3">Contracts
                </h1>
                <Row>
                    <SpringBreadcrump/>
                </Row>
                <Row>
                    <ContractList/>
                </Row>
            </div>
        );
    }
}

export default Contracts;