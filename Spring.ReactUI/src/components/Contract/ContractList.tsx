import React from "react";
import {CardColumns} from "reactstrap";
import ContractCard from "./ContractCard";

class ContractList extends React.Component<any, any> {
    render() {
        return (
            <CardColumns>
                <ContractCard/>
                <ContractCard/>
                <ContractCard/>
                <ContractCard/>
                <ContractCard/>
                <ContractCard/>
                <ContractCard/>
                <ContractCard/>
                <ContractCard/>
            </CardColumns>
        );
    }
}

export default ContractList;